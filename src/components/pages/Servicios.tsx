import { Trans, useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pagina from '../partials/Pagina'
import LocalizedLink from '../partials/LocalizedLink'
import { SERVICE_KEYS, SERVICE_ICONS } from '../../lib/services'

const Servicios = () => {
  const { t } = useTranslation()

  return (
    <Pagina className='animate-page-in'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold'>{t('services.title')}</h1>
        <p className='text-base-content/70 mt-2 leading-relaxed'>
          <Trans
            i18nKey='services.intro'
            components={{
              contactLink: <LocalizedLink page='contact' className='link link-motion link-primary' />,
            }}
          />
        </p>
      </header>

      <div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {SERVICE_KEYS.map((key) => (
          <div key={key} className='card card-motion bg-base-200 shadow-sm'>
            <div className='card-body'>
              <h2 className='card-title text-lg gap-3'>
                <FontAwesomeIcon icon={SERVICE_ICONS[key]} className='text-primary shrink-0' />
                {t(`services.items.${key}.name`)}
              </h2>
              <p className='text-base-content/80'>{t(`services.items.${key}.description`)}</p>
            </div>
          </div>
        ))}
      </div>
    </Pagina>
  )
}

export default Servicios
