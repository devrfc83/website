import { Fragment, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import Pagina from '../partials/Pagina'
import LocalizedLink from '../partials/LocalizedLink'
import ProfileAvatar from '../partials/ProfileAvatar'
import { useLocale } from '../../i18n/LocaleContext'
import { cvUrl } from '../../lib/cvUrl'

const interestLinkClass = 'link link-motion link-hover'
const QRZ_PROFILE_URL = 'https://www.qrz.com/db/CA4NFS'
const RADIO_CLUB_URL = 'https://www.ce4ly.cl/'
const BRUTAL_STRIKER_URL = 'https://www.brutalstrikertalca.cl/'
const SEA_DRAGON_URL = 'https://www.seadragon.cl'

const INTEREST_IDS = [
  'motorcycling',
  'piano',
  'languages',
  'radio',
  'travel',
  'chess',
  'basketball',
  'photography',
  'gymnastics',
  'calisthenics',
  'cycling',
  'running',
  'electronics',
  'gaming',
  'guitar',
  'kickboxing',
  'swimming',
  'coffee',
] as const

type InterestId = (typeof INTEREST_IDS)[number]

function interestSortLabel(id: InterestId, t: TFunction): string {
  switch (id) {
    case 'chess':
      return t('chess.title')
    case 'coffee':
      return t('coffee.title')
    case 'kickboxing':
      return t('about.kickboxingSortLabel')
    case 'radio':
      return t('about.radioSortLabel')
    default:
      return t(`about.interests.${id}`).replace(/\.$/, '')
  }
}

const Acerca = () => {
  const { t } = useTranslation()
  const locale = useLocale()

  const sortedInterestIds = useMemo(
    () =>
      [...INTEREST_IDS].sort((a, b) =>
        interestSortLabel(a, t).localeCompare(interestSortLabel(b, t), locale, {
          sensitivity: 'base',
        }),
      ),
    [t, locale],
  )

  const renderInterest = (id: InterestId) => {
    switch (id) {
      case 'chess':
        return (
          <li key={id}>
            <LocalizedLink page='chess' className={interestLinkClass}>
              {t('chess.title')}
            </LocalizedLink>{' '}
            <Trans
              i18nKey='about.interestChessNote'
              components={{
                analysisLink: (
                  <LocalizedLink page='chessAnalysis' className={interestLinkClass} />
                ),
              }}
            />
          </li>
        )
      case 'kickboxing':
        return (
          <li key={id}>
            <Trans
              i18nKey='about.kickboxingNote'
              components={{
                brutalStrikerLink: (
                  <a
                    href={BRUTAL_STRIKER_URL}
                    className={interestLinkClass}
                    target='_blank'
                    rel='noopener noreferrer'
                  />
                ),
              }}
            />
          </li>
        )
      case 'radio':
        return (
          <li key={id}>
            <Trans
              i18nKey='about.radioClubNote'
              components={{
                radioLink: (
                  <a
                    href={QRZ_PROFILE_URL}
                    className={interestLinkClass}
                    target='_blank'
                    rel='noopener noreferrer'
                  />
                ),
                radioClubLink: (
                  <a
                    href={RADIO_CLUB_URL}
                    className={interestLinkClass}
                    target='_blank'
                    rel='noopener noreferrer'
                  />
                ),
              }}
            />
          </li>
        )
      case 'coffee':
        return (
          <li key={id}>
            <LocalizedLink page='coffee' className={interestLinkClass}>
              {t('coffee.title')}
            </LocalizedLink>
            .
          </li>
        )
      default:
        return <li key={id}>{t(`about.interests.${id}`)}</li>
    }
  }

  return (
    <Pagina className='animate-page-in flex flex-col gap-8'>
      <header className='flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left'>
        <ProfileAvatar alt={t('common.profileAltShort')} size='md' className='shrink-0' />
        <div>
          <h1 className='text-3xl font-bold'>{t('meta.siteName')}</h1>
          <p className='text-base-content/70 mt-2'>{t('about.subtitle')}</p>
        </div>
      </header>

      <section>
        <h2 className='text-xl font-semibold mb-3'>{t('about.historyTitle')}</h2>
        <p className='text-base-content/80 leading-relaxed'>
          <Trans i18nKey='about.history' components={{ em: <span className='italic' /> }} />
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-3'>{t('about.experienceTitle')}</h2>
        <p className='text-base-content/80 leading-relaxed'>
          <Trans
            i18nKey='about.experience'
            components={{
              seaDragonLink: (
                <a
                  href={SEA_DRAGON_URL}
                  className={interestLinkClass}
                  target='_blank'
                  rel='noopener noreferrer'
                />
              ),
            }}
          />
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-3'>{t('about.cvTitle')}</h2>
        <p className='text-base-content/80 leading-relaxed'>
          {t('about.cvIntro')}{' '}
          <a
            href={cvUrl(locale)}
            className={interestLinkClass}
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('about.cvDownload')}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-3'>{t('about.interestsTitle')}</h2>
        <p className='text-base-content/80 leading-relaxed mb-3'>{t('about.interestsIntro')}</p>
        <ul className='list-disc list-inside text-base-content/80 leading-relaxed space-y-2 mb-3'>
          {sortedInterestIds.map((id) => (
            <Fragment key={id}>{renderInterest(id)}</Fragment>
          ))}
        </ul>
      </section>
    </Pagina>
  )
}

export default Acerca
