import type { Locale } from '../i18n/routes'

const CV_FILES: Record<Locale, string> = {
  es: 'cv-spanish.pdf',
  en: 'cv-english.pdf',
  de: 'cv-german.pdf',
  fr: 'cv-french.pdf',
  it: 'cv-italian.pdf',
  nl: 'cv-dutch.pdf',
  pt: 'cv-portuguese.pdf',
  ca: 'cv-catalan.pdf',
}

const CV_BASE =
  'https://raw.githubusercontent.com/devrfc83/devrfc83/main/cv'

export function cvUrl(locale: Locale): string {
  return `${CV_BASE}/${CV_FILES[locale]}`
}
