'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useI18n } from '@/lib/i18n/I18nProvider'
import { createClient } from '@/utils/supabase/client'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()
  const { t } = useI18n()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh() // Refresh to clear any cached Server Component data
    } catch (error) {
      console.error('Lỗi đăng xuất:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className='flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 transition-all hover:bg-rose-100/80 hover:text-rose-700 active:scale-[0.98]'>
      <LogOut className='size-4 shrink-0' />
      {isLoggingOut ? t('processing') : t('logout')}
    </button>
  )
}
