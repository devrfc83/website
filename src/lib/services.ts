import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faChartLine,
  faCode,
  faDatabase,
  faDiagramProject,
  faComments,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons'

export const SERVICE_KEYS = ['dataScience', 'software', 'databases', 'pm', 'consulting', 'training'] as const

export type ServiceKey = (typeof SERVICE_KEYS)[number]

export const SERVICE_ICONS: Record<ServiceKey, IconDefinition> = {
  dataScience: faChartLine,
  software: faCode,
  databases: faDatabase,
  pm: faDiagramProject,
  consulting: faComments,
  training: faGraduationCap,
}
