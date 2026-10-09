import DOMPurify from 'dompurify'

/**
 * Checks if HTML is effectively empty (e.g., `<p></p>`, `<p><br></p>` or whitespace only).
 */
export function isHtmlEmpty(html: string): boolean {
  if (!html) return true
  const textContent = html.replace(/<[^>]*>/g, '').trim()
  if (textContent === '' && !html.includes('<img')) {
    return true
  }
  return false
}

/**
 * Normalizes HTML string, returning empty string if HTML is empty.
 */
export function normalizeBiographyHtml(html: string): string {
  return isHtmlEmpty(html) ? '' : html
}

/**
 * Sanitizes HTML string using DOMPurify to prevent XSS attacks.
 */
export function sanitizeHtml(dirtyHtml: string): string {
  if (!dirtyHtml) return ''

  const clean = DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: [
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'strong',
      'b',
      'em',
      'i',
      'u',
      's',
      'strike',
      'ul',
      'ol',
      'li',
      'blockquote',
      'a',
      'br',
      'span',
      'sub',
      'sup',
      'code',
      'pre',
      'hr',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style', 'title'],
    ADD_ATTR: ['target']
  })

  return normalizeBiographyHtml(clean)
}
