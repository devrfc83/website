import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DEFAULT_LOCALE,
  hreflangLinks,
  isLocale,
  parsePath,
  type PageId,
} from '../../i18n/routes'
import { useLocale } from '../../i18n/LocaleContext'
import Hreflang from './Hreflang'

const PAGE_TITLE_KEYS: Record<PageId, string> = {
  home: 'meta.defaultTitle',
  about: 'common.nav.about',
  products: 'products.title',
  services: 'services.title',
  projects: 'projects.title',
  technology: 'technology.title',
  quality: 'quality.title',
  coffee: 'coffee.title',
  blog: 'common.nav.home',
  contact: 'contact.title',
  terms: 'terms.title',
  privacy: 'privacy.title',
  chess: 'chess.title',
  chessAnalysis: 'chess.analysis.title',
}

const LocaleLayout = () => {
  const { locale: localeParam } = useParams<{ locale: string }>()
  const location = useLocation()
  const locale = useLocale()
  const { i18n, t } = useTranslation()
  const isValidLocale = !!localeParam && isLocale(localeParam)

  useEffect(() => {
    if (!isValidLocale) return
    const parsed = parsePath(location.pathname)
    const pageId: PageId = parsed?.pageId ?? 'home'
    const key = PAGE_TITLE_KEYS[pageId]
    const pageTitle = t(key)
    document.title =
      pageId === 'home' ? pageTitle : `${pageTitle} — @devrfc83`
  }, [isValidLocale, location.pathname, locale, i18n.language, t])

  if (!isValidLocale) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />
  }

  const parsed = parsePath(location.pathname)
  const pageId: PageId = parsed?.pageId ?? 'home'

  return (
    <>
      <Hreflang links={hreflangLinks(pageId)} />
      <Outlet />
    </>
  )
}

export default LocaleLayout
