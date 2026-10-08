'use client'

import LinkExtension from '@tiptap/extension-link'
import UnderlineExtension from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
  Underline
} from 'lucide-react'
import { useCallback, useEffect } from 'react'

interface BiographyEditorProps {
  initialContent?: string
  onChange?: (html: string) => void
  readOnly?: boolean
}

const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2]
    }
  }),
  UnderlineExtension,
  LinkExtension.configure({
    openOnClick: false,
    HTMLAttributes: {
      class:
        'text-amber-700 underline decoration-amber-400 hover:text-amber-900'
    }
  })
]

export default function BiographyEditor({
  initialContent = '',
  onChange,
  readOnly = false
}: BiographyEditorProps) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: initialContent,
    editable: !readOnly,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML())
      }
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-stone max-w-none min-h-[220px] p-4 focus:outline-none text-sm text-stone-800 leading-relaxed font-sans'
      }
    }
  })


  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent)
    }
  }, [initialContent, editor])

  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly)
    }
  }, [readOnly, editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL link:', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return (
      <div className='flex h-[280px] w-full items-center justify-center rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-400'>
        Đang tải trình soạn thảo...
      </div>
    )
  }

  return (
    <div className='w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xs transition-all focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400'>
      {!readOnly && (
        <div className='flex flex-wrap items-center gap-1 border-b border-stone-200 bg-stone-50/80 p-2'>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 ${
              editor.isActive('bold') ? 'bg-stone-200 text-stone-900 font-semibold' : ''
            }`}
            title='In đậm'>
            <Bold className='size-4' />
          </button>

          <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 ${
              editor.isActive('italic') ? 'bg-stone-200 text-stone-900 font-semibold' : ''
            }`}
            title='In nghiêng'>
            <Italic className='size-4' />
          </button>

          <button
            type='button'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 ${
              editor.isActive('underline') ? 'bg-stone-200 text-stone-900 font-semibold' : ''
            }`}
            title='Gạch chân'>
            <Underline className='size-4' />
          </button>

          <div className='mx-1 h-5 w-px bg-stone-200' />

          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 ${
              editor.isActive('heading', { level: 1 }) ? 'bg-stone-200 text-stone-900 font-semibold' : ''
            }`}
            title='Tiêu đề lớn'>
            <Heading1 className='size-4' />
          </button>

          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 ${
              editor.isActive('heading', { level: 2 }) ? 'bg-stone-200 text-stone-900 font-semibold' : ''
            }`}
            title='Tiêu đề vừa'>
            <Heading2 className='size-4' />
          </button>

          <div className='mx-1 h-5 w-px bg-stone-200' />

          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 ${
              editor.isActive('bulletList') ? 'bg-stone-200 text-stone-900 font-semibold' : ''
            }`}
            title='Danh sách chấm'>
            <List className='size-4' />
          </button>

          <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 ${
              editor.isActive('orderedList') ? 'bg-stone-200 text-stone-900 font-semibold' : ''
            }`}
            title='Danh sách số'>
            <ListOrdered className='size-4' />
          </button>

          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 ${
              editor.isActive('blockquote') ? 'bg-stone-200 text-stone-900 font-semibold' : ''
            }`}
            title='Trích dẫn'>
            <Quote className='size-4' />
          </button>

          <button
            type='button'
            onClick={setLink}
            className={`rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 ${
              editor.isActive('link') ? 'bg-stone-200 text-stone-900 font-semibold' : ''
            }`}
            title='Chèn đường dẫn'>
            <LinkIcon className='size-4' />
          </button>

          <div className='mx-1 h-5 w-px bg-stone-200' />

          <button
            type='button'
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className='rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 disabled:opacity-40'
            title='Hoàn tác'>
            <Undo className='size-4' />
          </button>

          <button
            type='button'
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className='rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 disabled:opacity-40'
            title='Làm lại'>
            <Redo className='size-4' />
          </button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  )
}
