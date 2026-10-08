'use server'

import { revalidatePath } from 'next/cache'

import { sanitizeHtml } from '@/lib/sanitizer'
import { PersonBiography } from '@/types'
import { getSupabase } from '@/utils/supabase/queries'

export async function getPersonBiography(
  personId: string
): Promise<PersonBiography | null> {
  if (!personId) return null

  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('person_biographies')
    .select('*')
    .eq('person_id', personId)
    .maybeSingle()

  if (error) {
    if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
      return null
    }
    console.error('Error fetching person biography:', error)
    return null
  }

  return data as PersonBiography | null
}


export async function savePersonBiography(
  personId: string,
  contentHtml: string
): Promise<{ success: boolean; error?: string; biography?: PersonBiography | null }> {
  if (!personId) {
    return { success: false, error: 'Person ID is required' }
  }

  const cleanHtml = sanitizeHtml(contentHtml)
  const supabase = await getSupabase()

  // If HTML is empty after sanitization, remove biography
  if (!cleanHtml) {
    const { error } = await supabase
      .from('person_biographies')
      .delete()
      .eq('person_id', personId)

    if (error) {
      console.error('Error deleting empty biography:', error)
      return { success: false, error: error.message }
    }

    revalidatePath(`/dashboard/members/${personId}`)
    revalidatePath(`/dashboard/members/${personId}/biography`)

    return { success: true, biography: null }
  }

  const { data, error } = await supabase
    .from('person_biographies')
    .upsert(
      {
        person_id: personId,
        content_html: cleanHtml,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'person_id' }
    )
    .select('*')
    .single()

  if (error) {
    console.error('Error saving person biography:', error)
    return { success: false, error: error.message }
  }

  revalidatePath(`/dashboard/members/${personId}`)
  revalidatePath(`/dashboard/members/${personId}/biography`)

  return { success: true, biography: data as PersonBiography }
}

export async function deletePersonBiography(
  personId: string
): Promise<{ success: boolean; error?: string }> {
  if (!personId) {
    return { success: false, error: 'Person ID is required' }
  }

  const supabase = await getSupabase()
  const { error } = await supabase
    .from('person_biographies')
    .delete()
    .eq('person_id', personId)

  if (error) {
    console.error('Error deleting biography:', error)
    return { success: false, error: error.message }
  }

  revalidatePath(`/dashboard/members/${personId}`)
  revalidatePath(`/dashboard/members/${personId}/biography`)

  return { success: true }
}
