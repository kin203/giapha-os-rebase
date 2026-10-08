import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPersonBiography } from '@/app/actions/biography'
import BiographyClientView from './BiographyClientView'
import { getProfile, getSupabase } from '@/utils/supabase/queries'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function MemberBiographyPage({ params }: PageProps) {
  const { id } = await params

  const profile = await getProfile()
  const canEdit =
    profile?.is_active === true &&
    (profile.role === 'admin' || profile.role === 'editor')

  const supabase = await getSupabase()

  // Fetch Person basic details
  const { data: person, error } = await supabase
    .from('persons')
    .select('id, full_name, gender, avatar_url')
    .eq('id', id)
    .single()

  if (error || !person) {
    notFound()
  }

  // Fetch 1:1 Biography from person_biographies table
  const biography = await getPersonBiography(id)

  return (
    <div className='relative flex w-full flex-1 flex-col pb-8'>
      <div className='relative z-20 mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8'>
        <div className='flex items-center gap-3'>
          <Link
            href={`/dashboard/members/${id}`}
            className='-ml-2 rounded-full p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600'
            title='Quay lại chi tiết thành viên'>
            <ArrowLeft className='size-5' />
          </Link>
          <div>
            <h1 className='font-serif text-2xl font-semibold text-stone-900 sm:text-3xl'>
              Tiểu sử thành viên
            </h1>
            <p className='text-sm font-medium text-stone-500'>
              {person.full_name}
            </p>
          </div>
        </div>
      </div>

      <main className='relative z-10 mx-auto w-full max-w-4xl flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
        <div className='overflow-hidden rounded-2xl border border-stone-200/60 bg-white p-6 shadow-2xs sm:p-8'>
          <BiographyClientView
            personId={id}
            personName={person.full_name}
            initialContentHtml={biography?.content_html || ''}
            canEdit={canEdit}
          />
        </div>
      </main>
    </div>
  )
}
