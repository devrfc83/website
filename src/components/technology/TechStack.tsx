import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TECH_STACK_LAYERS } from '../../lib/techStack'

const itemLinkClass =
  'inline-flex items-center gap-1.5 link link-motion link-hover font-medium'

const TechStack = () => {
  const { t } = useTranslation()

  return (
    <div className='mx-auto flex w-full max-w-2xl flex-col items-center'>
      {TECH_STACK_LAYERS.map((layer, layerIndex) => (
        <Fragment key={layer.id}>
          <div className='card card-motion w-full bg-base-200 shadow-sm'>
            <div className='card-body items-center gap-2 px-4 py-4 sm:px-6'>
              <div className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2'>
                {layer.items.map((item, itemIndex) => (
                  <Fragment key={item.name}>
                    {itemIndex > 0 && (
                      <span className='text-base-content/30 select-none' aria-hidden='true'>
                        —
                      </span>
                    )}
                    <a
                      href={item.url}
                      className={itemLinkClass}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FontAwesomeIcon icon={item.icon} className='text-primary text-base' />
                      {item.name}
                    </a>
                  </Fragment>
                ))}
              </div>
              <p className='text-[0.65rem] leading-snug text-base-content/45 text-center sm:text-xs'>
                {t(`technology.layers.${layer.id}`)}
              </p>
            </div>
          </div>

          {layerIndex < TECH_STACK_LAYERS.length - 1 && (
            <div className='flex flex-col items-center py-1.5' aria-hidden='true'>
              <span className='bg-base-content/15 block h-4 w-px' />
              <span className='text-base-content/25 text-[0.6rem] leading-none'>▼</span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default TechStack
