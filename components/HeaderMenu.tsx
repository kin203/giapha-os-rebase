'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpCircle,
  BarChart2,
  ChevronDown,
  Database,
  GitMerge,
  Info,
  LogIn,
  Network,
  UserCircle,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { useI18n } from '@/lib/i18n/I18nProvider'

import LogoutButton from './LogoutButton'
import { useUser } from './UserProvider'

export default function HeaderMenu() {
  const { user, isAdmin } = useUser()
  const { t } = useI18n()
  const userEmail = user?.email
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) {
    return (
      <Link
        href='/login'
        className='inline-flex items-center gap-2 rounded-xl border border-stone-800 bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-stone-800 hover:-translate-y-0.5 active:translate-y-0 shadow-xs'>
        <LogIn className='size-4 text-amber-400' />
        <span>{t('login')}</span>
      </Link>
    )
  }

  const links = [
    {
      href: '/dashboard',
      icon: Network,
      label: t('dashboard'),
      hover: 'hover:bg-amber-50 hover:text-amber-700'
    },
    {
      href: '/dashboard/members',
      icon: Network,
      label: t('familyTree'),
      hover: 'hover:bg-amber-50 hover:text-amber-700'
    },
    {
      href: '/dashboard/kinship',
      icon: GitMerge,
      label: t('kinship'),
      hover: 'hover:bg-blue-50 hover:text-blue-700'
    },
    {
      href: '/dashboard/stats',
      icon: BarChart2,
      label: t('statistics'),
      hover: 'hover:bg-purple-50 hover:text-purple-700'
    }
  ]

  const adminLinks = [
    {
      href: '/dashboard/users',
      icon: Users,
      label: t('manageUsers'),
      hover: 'hover:bg-rose-50 hover:text-rose-700'
    },
    {
      href: '/dashboard/lineage',
      icon: Network,
      label: t('lineageOrder'),
      hover: 'hover:bg-indigo-50 hover:text-indigo-700'
    },
    {
      href: '/dashboard/data',
      icon: Database,
      label: t('backupRestore'),
      hover: 'hover:bg-teal-50 hover:text-teal-700'
    },
    {
      href: '/dashboard/upgrade',
      icon: ArrowUpCircle,
      label: t('upgrade'),
      hover: 'hover:bg-amber-50 hover:text-amber-700'
    }
  ]

  return (
    <div className='relative' ref={menuRef}>
      <button
        type='button'
        aria-expanded={isOpen}
        aria-label={t('account')}
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 rounded-full border border-transparent py-1.5 pr-4 pl-2 transition-all duration-200 hover:border-stone-200 hover:bg-stone-100'>
        <div className='flex size-8 items-center justify-center rounded-full bg-linear-to-br from-amber-200 to-amber-100 font-medium text-amber-800 shadow-sm ring-1 ring-amber-300/50'>
          {userEmail ? (
            userEmail.charAt(0).toUpperCase()
          ) : (
            <UserCircle className='size-5' />
          )}
        </div>
        <ChevronDown
          className={`size-4 text-stone-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className='absolute right-0 z-50 mt-2 flex max-h-[calc(100vh-80px)] w-64 flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white/95 shadow-xl backdrop-blur-xl'>
            {/* Account Header */}
            <div className='shrink-0 border-b border-stone-100 bg-stone-50/70 px-4 py-3'>
              <p className='text-xs font-semibold uppercase tracking-wider text-stone-400'>
                {t('account')}
              </p>
              <p className='mt-0.5 truncate text-sm font-semibold text-stone-900'>
                {userEmail}
              </p>
            </div>

            {/* Scrollable Items Area */}
            <div className='custom-scrollbar flex-1 overflow-y-auto p-1.5 space-y-0.5'>
              {links.map(({ href, icon: Icon, label, hover }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-stone-700 transition-all ${hover}`}>
                  <Icon className='size-4 shrink-0 text-stone-500' />
                  <span className='truncate'>{label}</span>
                </Link>
              ))}

              {isAdmin && (
                <>
                  <div className='my-1 border-t border-stone-100 px-3 pt-2 pb-1'>
                    <p className='text-xs font-semibold uppercase tracking-wider text-rose-500'>
                      {t('admin')}
                    </p>
                  </div>
                  {adminLinks.map(({ href, icon: Icon, label, hover }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-stone-700 transition-all ${hover}`}>
                      <Icon className='size-4 shrink-0 text-stone-500' />
                      <span className='truncate'>{label}</span>
                    </Link>
                  ))}
                </>
              )}

              <div className='my-1 border-t border-stone-100 pt-1'>
                <Link
                  href='/about'
                  onClick={() => setIsOpen(false)}
                  className='flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-stone-700 transition-all hover:bg-stone-100 hover:text-stone-900'>
                  <Info className='size-4 shrink-0 text-stone-500' />
                  <span className='truncate'>{t('about')}</span>
                </Link>
              </div>
            </div>

            {/* Fixed Logout Button at Bottom */}
            <div className='shrink-0 border-t border-stone-100 bg-stone-50/50 p-1.5'>
              <LogoutButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
