import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'
import ProfileAvatar from '../partials/ProfileAvatar'
import StarField from './StarField'

const redes = [
  { nombre: 'Instagram', url: 'https://www.instagram.com/devrfc83', icono: faInstagram },
  { nombre: 'GitHub', url: 'https://www.github.com/devrfc83', icono: faGithub },
]

const HERO_BACKGROUND = [
  'radial-gradient(circle closest-side at 18% 20%, color-mix(in oklch, var(--color-primary) 20%, transparent), transparent 65%)',
  'radial-gradient(circle closest-side at 82% 85%, color-mix(in oklch, var(--color-primary) 16%, transparent), transparent 65%)',
].join(', ')

const Hero = () => {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      className='relative flex w-full flex-col items-center justify-center px-4 pt-14 pb-16 text-center sm:pt-20 sm:pb-20'
      style={{ backgroundImage: HERO_BACKGROUND }}
    >
      <StarField />

      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        className='relative z-10 flex flex-col items-center gap-8'
      >
        <ProfileAvatar alt={t('common.profileAlt')} size='lg' />

        <div>
          <h1 className='text-4xl font-bold tracking-tight lg:text-5xl'>{t('meta.siteName')}</h1>
          <p className='text-base-content/70 mx-auto mt-4 max-w-2xl text-lg leading-relaxed'>
            {t('home.bio')}
          </p>
        </div>

        <nav
          className='flex flex-wrap items-center justify-center gap-6'
          aria-label={t('common.socialNav')}
        >
          {redes.map((red) => (
            <a
              key={red.nombre}
              href={red.url}
              target='_blank'
              rel='noopener noreferrer'
              className='card card-motion bg-base-200 flex w-40 flex-col items-center justify-center gap-3 py-10 sm:w-48'
            >
              <FontAwesomeIcon icon={red.icono} className='text-primary text-5xl' />
              <span className='text-lg font-semibold'>{red.nombre}</span>
            </a>
          ))}
        </nav>
      </motion.div>
    </section>
  )
}

export default Hero
