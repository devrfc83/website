import { useTranslation } from 'react-i18next'
import Pagina from '../partials/Pagina'
import TechStack from '../technology/TechStack'

const Tecnologia = () => {
  const { t } = useTranslation()

  return (
    <Pagina className='animate-page-in'>
      <header className='mb-8 w-full'>
        <h1 className='text-3xl font-bold'>{t('technology.title')}</h1>
        <p className='text-base-content/70 mt-2 w-full leading-relaxed'>{t('technology.description')}</p>
      </header>

      <TechStack />
    </Pagina>
  )
}

export default Tecnologia
