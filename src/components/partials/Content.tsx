import { Route, Routes, useLocation } from 'react-router-dom'
import LocaleLayout from './LocaleLayout'
import LocalizedPage from './LocalizedPage'
import RootRedirect from './RootRedirect'
import Inicio from '../pages/Inicio'
import NotFound from '../pages/NotFound'
import { parsePath } from '../../i18n/routes'

const Content = () => {
  const { pathname } = useLocation()
  const isHome = parsePath(pathname)?.pageId === 'home'

  return (
    <div
      className={
        isHome ? 'w-full grow flex flex-col' : 'w-full max-w-5xl mx-auto px-4 grow flex flex-col'
      }
    >
      <Routes>
        <Route path='/' element={<RootRedirect />} />
        <Route path='/:locale' element={<LocaleLayout />}>
          <Route index element={<Inicio />} />
          <Route path='*' element={<LocalizedPage />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default Content
