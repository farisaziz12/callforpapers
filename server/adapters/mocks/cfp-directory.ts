import type { ICfpDirectory } from '../interfaces/cfp-directory'
import type { CfpCardDTO, CfpDetailDTO, ModerationItemDTO, SearchParams } from '../../../packages/schemas/dto'

let cfps: CfpDetailDTO[] = []
let moderationQueue: ModerationItemDTO[] = []
let nextId = 1

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function seedData() {
  const now = new Date()
  const futureDate = (days: number) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString()

  cfps = [
    {
      id: '1',
      slug: 'react-conf-2025',
      title: 'React Conf 2025',
      city: 'San Francisco',
      country: 'United States',
      topics: ['React', 'JavaScript', 'Frontend'],
      closesAt: futureDate(30),
      format: 'conference',
      perks: { travel: true, hotel: true, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://conf.reactjs.org',
      cfpUrl: 'https://conf.reactjs.org/cfp',
      timeline: { closesAt: futureDate(30) },
      platform: 'In-person'
    },
    {
      id: '2',
      slug: 'vue-amsterdam-2025',
      title: 'Vue.js Amsterdam 2025',
      city: 'Amsterdam',
      country: 'Netherlands',
      topics: ['Vue.js', 'JavaScript', 'Frontend'],
      closesAt: futureDate(45),
      format: 'conference',
      perks: { travel: true, hotel: false, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://vuejs.amsterdam',
      cfpUrl: 'https://vuejs.amsterdam/call-for-papers',
      timeline: { closesAt: futureDate(45) },
      platform: 'In-person'
    },
    {
      id: '3',
      slug: 'jsconf-eu-2025',
      title: 'JSConf EU 2025',
      city: 'Berlin',
      country: 'Germany',
      topics: ['JavaScript', 'Web Development', 'Node.js'],
      closesAt: futureDate(60),
      format: 'conference',
      perks: { travel: true, hotel: true, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://jsconf.eu',
      cfpUrl: 'https://jsconf.eu/call-for-speakers',
      timeline: { closesAt: futureDate(60) },
      platform: 'In-person'
    },
    {
      id: '4',
      slug: 'pycon-us-2025',
      title: 'PyCon US 2025',
      city: 'Pittsburgh',
      country: 'United States',
      topics: ['Python', 'Data Science', 'AI/ML'],
      closesAt: futureDate(15),
      format: 'conference',
      perks: { travel: false, hotel: false, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://us.pycon.org',
      cfpUrl: 'https://us.pycon.org/2025/speaking',
      timeline: { closesAt: futureDate(15) },
      platform: 'In-person'
    },
    {
      id: '5',
      slug: 'go-conference-london',
      title: 'Go Conference London',
      city: 'London',
      country: 'United Kingdom',
      topics: ['Go', 'Backend', 'Cloud'],
      closesAt: futureDate(25),
      format: 'conference',
      perks: { travel: true, hotel: true, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://goconference.london',
      cfpUrl: 'https://goconference.london/cfp',
      timeline: { closesAt: futureDate(25) },
      platform: 'In-person'
    },
    {
      id: '6',
      slug: 'rust-workshop-tokyo',
      title: 'Rust Workshop Tokyo',
      city: 'Tokyo',
      country: 'Japan',
      topics: ['Rust', 'Systems Programming'],
      closesAt: futureDate(40),
      format: 'workshop',
      perks: { travel: false, hotel: false, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://rustworkshop.tokyo',
      cfpUrl: 'https://rustworkshop.tokyo/submit',
      timeline: { closesAt: futureDate(40) },
      platform: 'In-person'
    },
    {
      id: '7',
      slug: 'devops-days-barcelona',
      title: 'DevOps Days Barcelona',
      city: 'Barcelona',
      country: 'Spain',
      topics: ['DevOps', 'Cloud', 'Infrastructure'],
      closesAt: futureDate(35),
      format: 'conference',
      perks: { travel: false, hotel: true, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://devopsdays.org/events/2025-barcelona',
      cfpUrl: 'https://devopsdays.org/events/2025-barcelona/propose',
      timeline: { closesAt: futureDate(35) },
      platform: 'In-person'
    },
    {
      id: '8',
      slug: 'ai-summit-singapore',
      title: 'AI Summit Singapore',
      city: 'Singapore',
      country: 'Singapore',
      topics: ['AI/ML', 'Data Science', 'Deep Learning'],
      closesAt: futureDate(50),
      format: 'conference',
      perks: { travel: true, hotel: true, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://aisummit.sg',
      cfpUrl: 'https://aisummit.sg/speakers',
      timeline: { closesAt: futureDate(50) },
      platform: 'In-person'
    },
    {
      id: '9',
      slug: 'react-native-meetup-online',
      title: 'React Native Meetup',
      city: 'Online',
      country: 'Global',
      topics: ['React Native', 'Mobile Development'],
      closesAt: futureDate(20),
      format: 'online',
      perks: { travel: false, hotel: false, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://reactnativemeetup.com',
      cfpUrl: 'https://reactnativemeetup.com/cfp',
      timeline: { closesAt: futureDate(20) },
      platform: 'Online'
    },
    {
      id: '10',
      slug: 'kubernetes-conference-toronto',
      title: 'KubeCon + CloudNativeCon Toronto',
      city: 'Toronto',
      country: 'Canada',
      topics: ['Kubernetes', 'Cloud Native', 'DevOps'],
      closesAt: futureDate(55),
      format: 'conference',
      perks: { travel: true, hotel: false, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://events.linuxfoundation.org/kubecon',
      cfpUrl: 'https://events.linuxfoundation.org/kubecon/program/cfp',
      timeline: { closesAt: futureDate(55) },
      platform: 'In-person'
    },
    {
      id: '11',
      slug: 'web-security-workshop-sydney',
      title: 'Web Security Workshop Sydney',
      city: 'Sydney',
      country: 'Australia',
      topics: ['Security', 'Web Development'],
      closesAt: futureDate(10),
      format: 'workshop',
      perks: { travel: false, hotel: false, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://websecurity.sydney',
      cfpUrl: 'https://websecurity.sydney/speak',
      timeline: { closesAt: futureDate(10) },
      platform: 'In-person'
    },
    {
      id: '12',
      slug: 'flutter-meetup-bangalore',
      title: 'Flutter Meetup Bangalore',
      city: 'Bangalore',
      country: 'India',
      topics: ['Flutter', 'Mobile Development', 'Dart'],
      closesAt: futureDate(70),
      format: 'meetup',
      perks: { travel: false, hotel: false, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://flutterbangalore.dev',
      cfpUrl: 'https://flutterbangalore.dev/cfp',
      timeline: { closesAt: futureDate(70) },
      platform: 'In-person'
    },
    {
      id: '13',
      slug: 'typescript-workshop-paris',
      title: 'TypeScript Workshop Paris',
      city: 'Paris',
      country: 'France',
      topics: ['TypeScript', 'JavaScript', 'Frontend'],
      closesAt: futureDate(18),
      format: 'workshop',
      perks: { travel: true, hotel: true, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://tsworkshop.paris',
      cfpUrl: 'https://tsworkshop.paris/cfp',
      timeline: { closesAt: futureDate(18) },
      platform: 'In-person'
    },
    {
      id: '14',
      slug: 'graphql-conference-online',
      title: 'GraphQL Summit Online',
      city: 'Online',
      country: 'Global',
      topics: ['GraphQL', 'APIs', 'Backend'],
      closesAt: futureDate(5),
      format: 'online',
      perks: { travel: false, hotel: false, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://summit.graphql.com',
      cfpUrl: 'https://summit.graphql.com/cfp',
      timeline: { closesAt: futureDate(5) },
      platform: 'Online'
    },
    {
      id: '15',
      slug: 'machine-learning-symposium-seoul',
      title: 'Machine Learning Symposium Seoul',
      city: 'Seoul',
      country: 'South Korea',
      topics: ['Machine Learning', 'AI/ML', 'Data Science'],
      closesAt: futureDate(42),
      format: 'conference',
      perks: { travel: true, hotel: true, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://mlseoul.org',
      cfpUrl: 'https://mlseoul.org/cfp',
      timeline: { closesAt: futureDate(42) },
      platform: 'In-person'
    },
    {
      id: '16',
      slug: 'docker-meetup-dublin',
      title: 'Docker Meetup Dublin',
      city: 'Dublin',
      country: 'Ireland',
      topics: ['Docker', 'DevOps', 'Containers'],
      closesAt: futureDate(8),
      format: 'meetup',
      perks: { travel: false, hotel: false, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://dockerdublin.com',
      cfpUrl: 'https://dockerdublin.com/speak',
      timeline: { closesAt: futureDate(8) },
      platform: 'In-person'
    },
    {
      id: '17',
      slug: 'web-performance-summit-austin',
      title: 'Web Performance Summit Austin',
      city: 'Austin',
      country: 'United States',
      topics: ['Performance', 'Web Development', 'Frontend'],
      closesAt: futureDate(28),
      format: 'conference',
      perks: { travel: true, hotel: false, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://webperfsummit.com',
      cfpUrl: 'https://webperfsummit.com/cfp',
      timeline: { closesAt: futureDate(28) },
      platform: 'In-person'
    },
    {
      id: '18',
      slug: 'serverless-days-stockholm',
      title: 'ServerlessDays Stockholm',
      city: 'Stockholm',
      country: 'Sweden',
      topics: ['Serverless', 'Cloud', 'AWS'],
      closesAt: futureDate(33),
      format: 'conference',
      perks: { travel: false, hotel: true, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://stockholm.serverlessdays.io',
      cfpUrl: 'https://stockholm.serverlessdays.io/cfp',
      timeline: { closesAt: futureDate(33) },
      platform: 'In-person'
    },
    {
      id: '19',
      slug: 'ux-design-workshop-melbourne',
      title: 'UX Design Workshop Melbourne',
      city: 'Melbourne',
      country: 'Australia',
      topics: ['UX Design', 'UI Design', 'Design Systems'],
      closesAt: futureDate(22),
      format: 'workshop',
      perks: { travel: true, hotel: false, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://uxmelbourne.com',
      cfpUrl: 'https://uxmelbourne.com/speak',
      timeline: { closesAt: futureDate(22) },
      platform: 'In-person'
    },
    {
      id: '20',
      slug: 'blockchain-summit-zurich',
      title: 'Blockchain Summit Zürich',
      city: 'Zürich',
      country: 'Switzerland',
      topics: ['Blockchain', 'Web3', 'Cryptocurrency'],
      closesAt: futureDate(48),
      format: 'conference',
      perks: { travel: true, hotel: true, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://blockchainsummit.ch',
      cfpUrl: 'https://blockchainsummit.ch/cfp',
      timeline: { closesAt: futureDate(48) },
      platform: 'In-person'
    },
    {
      id: '21',
      slug: 'angular-meetup-warsaw',
      title: 'Angular Meetup Warsaw',
      city: 'Warsaw',
      country: 'Poland',
      topics: ['Angular', 'TypeScript', 'Frontend'],
      closesAt: futureDate(12),
      format: 'meetup',
      perks: { travel: false, hotel: false, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://angularwarsaw.com',
      cfpUrl: 'https://angularwarsaw.com/cfp',
      timeline: { closesAt: futureDate(12) },
      platform: 'In-person'
    },
    {
      id: '22',
      slug: 'data-engineering-online',
      title: 'Data Engineering Summit Online',
      city: 'Online',
      country: 'Global',
      topics: ['Data Engineering', 'Big Data', 'Analytics'],
      closesAt: futureDate(38),
      format: 'online',
      perks: { travel: false, hotel: false, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://dataengineering.summit',
      cfpUrl: 'https://dataengineering.summit/cfp',
      timeline: { closesAt: futureDate(38) },
      platform: 'Online'
    },
    {
      id: '23',
      slug: 'ios-dev-conference-lisbon',
      title: 'iOS Dev Conference Lisbon',
      city: 'Lisbon',
      country: 'Portugal',
      topics: ['iOS', 'Swift', 'Mobile Development'],
      closesAt: futureDate(52),
      format: 'conference',
      perks: { travel: true, hotel: true, honorarium: false },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://iosdevlisbon.com',
      cfpUrl: 'https://iosdevlisbon.com/cfp',
      timeline: { closesAt: futureDate(52) },
      platform: 'In-person'
    },
    {
      id: '24',
      slug: 'cybersecurity-workshop-copenhagen',
      title: 'Cybersecurity Workshop Copenhagen',
      city: 'Copenhagen',
      country: 'Denmark',
      topics: ['Security', 'Cybersecurity', 'DevSecOps'],
      closesAt: futureDate(6),
      format: 'workshop',
      perks: { travel: false, hotel: false, honorarium: true },
      lastUpdatedAt: now.toISOString(),
      websiteUrl: 'https://securitycph.dk',
      cfpUrl: 'https://securitycph.dk/cfp',
      timeline: { closesAt: futureDate(6) },
      platform: 'In-person'
    }
  ]
}

export class MockCfpDirectory implements ICfpDirectory {
  constructor() {
    if (cfps.length === 0) {
      seedData()
    }
  }

  async list(params: SearchParams): Promise<{ items: CfpCardDTO[]; total: number }> {
    let filtered = [...cfps]

    if (params.q) {
      const query = params.q.toLowerCase()
      filtered = filtered.filter(cfp =>
        cfp.title.toLowerCase().includes(query) ||
        cfp.topics.some(topic => topic.toLowerCase().includes(query)) ||
        cfp.city.toLowerCase().includes(query) ||
        cfp.country.toLowerCase().includes(query)
      )
    }

    if (params.country) {
      filtered = filtered.filter(cfp => cfp.country === params.country)
    }

    if (params.topic) {
      filtered = filtered.filter(cfp => cfp.topics.includes(params.topic))
    }

    if (params.format) {
      filtered = filtered.filter(cfp => cfp.format === params.format)
    }

    if (params.closesBefore) {
      filtered = filtered.filter(cfp => cfp.closesAt <= params.closesBefore!)
    }

    const page = params.page || 1
    const pageSize = params.pageSize || 12
    const start = (page - 1) * pageSize
    const items = filtered.slice(start, start + pageSize)

    return { items, total: filtered.length }
  }

  async getBySlug(slug: string): Promise<CfpDetailDTO | null> {
    return cfps.find(cfp => cfp.slug === slug) || null
  }

  async approveModeration(id: string): Promise<void> {
    const item = moderationQueue.find(m => m.id === id)
    if (!item) throw new Error('Moderation item not found')

    const newCfp: CfpDetailDTO = {
      id: String(nextId++),
      slug: generateSlug(item.payload.cfp.title),
      title: item.payload.cfp.title,
      city: item.payload.conference.city,
      country: item.payload.conference.country,
      topics: item.payload.cfp.topics,
      closesAt: item.payload.cfp.closesAt,
      format: item.payload.cfp.format,
      perks: item.payload.cfp.perks,
      lastUpdatedAt: new Date().toISOString(),
      websiteUrl: item.payload.conference.websiteUrl,
      cfpUrl: item.payload.cfp.cfpUrl,
      timeline: {
        opensAt: item.payload.cfp.opensAt,
        closesAt: item.payload.cfp.closesAt
      },
      platform: item.payload.conference.platform,
      notes: item.payload.cfp.notes
    }

    cfps.push(newCfp)
    moderationQueue = moderationQueue.filter(m => m.id !== id)
  }

  async createModeration(payload: any): Promise<{ id: string }> {
    const id = String(Date.now())
    const item: ModerationItemDTO = {
      id,
      submittedAt: new Date().toISOString(),
      payload
    }
    moderationQueue.push(item)
    return { id }
  }

  async listModeration(): Promise<ModerationItemDTO[]> {
    return [...moderationQueue]
  }

  async refresh(): Promise<void> {
    seedData()
  }
}