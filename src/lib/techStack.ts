import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faDocker,
  faGolang,
  faLaravel,
  faLinux,
  faNodeJs,
  faPhp,
  faPostgresql,
  faPython,
  faTailwindCss,
  faTypescript,
} from '@fortawesome/free-brands-svg-icons'
import {
  faBolt,
  faChartLine,
  faCube,
  faCubesStacked,
  faDatabase,
  faFileLines,
  faMemory,
} from '@fortawesome/free-solid-svg-icons'

export type StackLayerId =
  | 'ui'
  | 'business'
  | 'backend'
  | 'data'
  | 'services'
  | 'architecture'
  | 'os'

export type StackItem = {
  name: string
  url: string
  icon: IconDefinition
}

export type StackLayer = {
  id: StackLayerId
  items: StackItem[]
}

export const TECH_STACK_LAYERS: StackLayer[] = [
  {
    id: 'ui',
    items: [
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com', icon: faTailwindCss },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org', icon: faTypescript },
    ],
  },
  {
    id: 'business',
    items: [{ name: 'Laravel', url: 'https://laravel.com', icon: faLaravel }],
  },
  {
    id: 'backend',
    items: [
      { name: 'PHP', url: 'https://www.php.net', icon: faPhp },
      { name: 'Node.js', url: 'https://nodejs.org', icon: faNodeJs },
      { name: 'Python', url: 'https://www.python.org', icon: faPython },
      { name: 'Go', url: 'https://go.dev', icon: faGolang },
    ],
  },
  {
    id: 'data',
    items: [
      { name: 'PostgreSQL', url: 'https://www.postgresql.org', icon: faPostgresql },
      { name: 'MongoDB', url: 'https://www.mongodb.com', icon: faDatabase },
    ],
  },
  {
    id: 'services',
    items: [
      { name: 'Valkey', url: 'https://valkey.io', icon: faBolt },
      { name: 'Memcached', url: 'https://memcached.org', icon: faMemory },
      { name: 'Syslog', url: 'https://www.rsyslog.com/', icon: faFileLines },
      { name: 'Grafana', url: 'https://grafana.com', icon: faChartLine },
    ],
  },
  {
    id: 'architecture',
    items: [
      { name: 'Docker', url: 'https://www.docker.com', icon: faDocker },
      { name: 'Swarm', url: 'https://docs.docker.com/engine/swarm/', icon: faCubesStacked },
      { name: 'Podman', url: 'https://podman.io', icon: faCube },
    ],
  },
  {
    id: 'os',
    items: [{ name: 'Linux', url: 'https://www.kernel.org', icon: faLinux }],
  },
]
