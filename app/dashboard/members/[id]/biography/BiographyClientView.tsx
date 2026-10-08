'use client'

import { BookOpen, Edit3, Save, Trash2, X } from 'lucide-react'
import { useState } from 'react'

import { deletePersonBiography, savePersonBiography } from '@/app/actions/biography'
import BiographyEditor from '@/components/BiographyEditor'
import { sanitizeHtml } from '@/lib/sanitizer'

interface BiographyClientViewProps {
  personId: string
  personName: string
  initialContentHtml: string
  canEdit: boolean
}

export default function BiographyClientView({
  personId,
  personName,
  initialContentHtml,
  canEdit
}: BiographyClientViewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [contentHtml, setContentHtml] = useState(initialContentHtml)
  const [savedHtml, setSavedHtml] = useState(initialContentHtml)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await savePersonBiography(personId, contentHtml)
      if (res.success) {
        const clean = sanitizeHtml(contentHtml)
        setSavedHtml(clean)
        setContentHtml(clean)
        setIsEditing(false)
        setSuccess('Lưu tiểu sử thành công.')
      } else {
        setError(res.error || 'Không thể lưu tiểu sử.')
      }
    } catch (err) {
      console.error(err)
      setError('Đã xảy ra lỗi không mong muốn khi lưu.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tiểu sử của ${personName}?`)) {
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await deletePersonBiography(personId)
      if (res.success) {
        setSavedHtml('')
        setContentHtml('')
        setIsEditing(false)
        setSuccess('Đã xóa tiểu sử.')
      } else {
        setError(res.error || 'Không thể xóa tiểu sử.')
      }
    } catch (err) {
      console.error(err)
      setError('Đã xảy ra lỗi khi xóa tiểu sử.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setContentHtml(savedHtml)
    setIsEditing(false)
    setError(null)
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/80 pb-4'>
        <div className='flex items-center gap-2'>
          <BookOpen className='size-5 text-amber-600' />
          <h2 className='font-serif text-xl font-semibold text-stone-900'>
            {isEditing ? 'Chỉnh sửa tiểu sử' : 'Chi tiết tiểu sử'}
          </h2>
        </div>

        {canEdit && (
          <div className='flex items-center gap-2'>
            {isEditing ? (
              <>
                <button
                  type='button'
                  onClick={handleCancel}
                  disabled={loading}
                  className='inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50 disabled:opacity-50'>
                  <X className='size-4' />
                  Hủy
                </button>
                {savedHtml && (
                  <button
                    type='button'
                    onClick={handleDelete}
                    disabled={loading}
                    className='inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50'>
                    <Trash2 className='size-4' />
                    Xóa
                  </button>
                )}
                <button
                  type='button'
                  onClick={handleSave}
                  disabled={loading}
                  className='inline-flex items-center gap-1.5 rounded-xl border border-stone-800 bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-50'>
                  <Save className='size-4' />
                  {loading ? 'Đang lưu...' : 'Lưu tiểu sử'}
                </button>
              </>
            ) : (
              <button
                type='button'
                onClick={() => setIsEditing(true)}
                className='inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100'>
                <Edit3 className='size-4' />
                Chỉnh sửa
              </button>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700'>
          {error}
        </div>
      )}

      {success && (
        <div className='rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm font-medium text-teal-700'>
          {success}
        </div>
      )}

      {isEditing ? (
        <div className='space-y-4'>
          <BiographyEditor
            initialContent={contentHtml}
            onChange={(html) => setContentHtml(html)}
          />
        </div>
      ) : savedHtml ? (
        <div
          className='prose prose-stone max-w-none text-sm text-stone-800 leading-relaxed font-sans'
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(savedHtml) }}
        />
      ) : (
        <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-200 p-12 text-center'>
          <BookOpen className='mb-3 size-10 text-stone-300' />
          <p className='text-sm font-medium text-stone-500'>
            Chưa có thông tin tiểu sử cho {personName}.
          </p>
          {canEdit && (
            <button
              type='button'
              onClick={() => setIsEditing(true)}
              className='mt-4 inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100'>
              <Edit3 className='size-4' />
              Soạn thảo tiểu sử ngay
            </button>
          )}
        </div>
      )}
    </div>
  )
}
