import { Country } from 'country-state-city'

// Get all countries from the library - sorted alphabetically
export const COUNTRIES = Country.getAllCountries()
  .map(country => country.name)
  .sort()

// Exhaustive list of topics for CFP filtering and submission
export const TOPICS = [
  // Programming Languages
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin',
  'Scala', 'R', 'Dart', 'Elixir', 'Haskell', 'Clojure', 'F#', 'Objective-C', 'Perl', 'Lua', 'Julia',

  // Frontend Frameworks & Libraries
  'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Remix', 'Astro', 'Solid.js', 'Qwik',
  'Alpine.js', 'Lit', 'Preact', 'Ember.js', 'Backbone.js', 'jQuery',

  // Backend & API
  'Node.js', 'Express.js', 'NestJS', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'ASP.NET', 'Laravel',
  'Ruby on Rails', 'GraphQL', 'REST API', 'gRPC', 'WebSockets', 'Microservices', 'Serverless',

  // Mobile Development
  'iOS Development', 'Android Development', 'React Native', 'Flutter', 'Xamarin', 'Ionic', 'Mobile Development',
  'SwiftUI', 'Jetpack Compose', 'Progressive Web Apps', 'PWA',

  // Data & AI/ML
  'Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'AI', 'ML', 'Data Science', 'Big Data',
  'Natural Language Processing', 'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch', 'scikit-learn',
  'Keras', 'Data Engineering', 'Data Analytics', 'Business Intelligence', 'Data Visualization',

  // Cloud & Infrastructure
  'AWS', 'Azure', 'Google Cloud', 'GCP', 'Cloud Computing', 'Kubernetes', 'Docker', 'DevOps', 'CI/CD',
  'Infrastructure as Code', 'Terraform', 'Ansible', 'Jenkins', 'GitLab CI', 'GitHub Actions',

  // Databases
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Cassandra', 'DynamoDB', 'SQLite',
  'Oracle', 'SQL Server', 'Neo4j', 'Firebase', 'Supabase', 'Database Design', 'Database Optimization',

  // Security & Privacy
  'Cybersecurity', 'Security', 'Application Security', 'Network Security', 'Cloud Security', 'Privacy',
  'Authentication', 'Authorization', 'OAuth', 'Zero Trust', 'Penetration Testing', 'Ethical Hacking',
  'GDPR', 'Compliance', 'Cryptography',

  // Architecture & Design
  'Software Architecture', 'System Design', 'Design Patterns', 'Domain-Driven Design', 'DDD',
  'Event-Driven Architecture', 'CQRS', 'Event Sourcing', 'Clean Architecture', 'Hexagonal Architecture',
  'Monolithic Architecture', 'Service-Oriented Architecture', 'SOA',

  // Testing & Quality
  'Testing', 'Unit Testing', 'Integration Testing', 'E2E Testing', 'Test-Driven Development', 'TDD',
  'Behavior-Driven Development', 'BDD', 'Quality Assurance', 'QA', 'Test Automation', 'Performance Testing',
  'Load Testing', 'Security Testing',

  // Web Technologies
  'HTML', 'CSS', 'Sass', 'Tailwind CSS', 'Bootstrap', 'Web Components', 'Web Assembly', 'WebGL',
  'WebRTC', 'Service Workers', 'Web Performance', 'Web Accessibility', 'a11y', 'SEO',

  // Development Practices
  'Agile', 'Scrum', 'Kanban', 'XP', 'Lean', 'Clean Code', 'Code Review', 'Pair Programming',
  'Continuous Integration', 'Continuous Deployment', 'Version Control', 'Git', 'Code Quality',

  // Blockchain & Web3
  'Blockchain', 'Web3', 'Cryptocurrency', 'Smart Contracts', 'Ethereum', 'Solidity', 'DeFi',
  'NFT', 'Decentralized Applications', 'dApps',

  // IoT & Edge
  'Internet of Things', 'IoT', 'Edge Computing', 'Embedded Systems', 'Arduino', 'Raspberry Pi',

  // Gaming
  'Game Development', 'Unity', 'Unreal Engine', 'Game Design', 'AR', 'VR', 'Augmented Reality',
  'Virtual Reality', 'Mixed Reality',

  // Other Technologies
  'Quantum Computing', 'Blockchain', 'Open Source', 'API Design', 'Monitoring', 'Observability',
  'Logging', 'Distributed Systems', 'Real-time Systems', 'Streaming', 'Apache Kafka', 'RabbitMQ',
  'Message Queues', 'Reactive Programming', 'Functional Programming', 'Object-Oriented Programming',
  'OOP', 'Low Code', 'No Code', 'Automation', 'Robotics', 'DevSecOps', 'SRE',
  'Site Reliability Engineering', 'Platform Engineering', 'FinTech', 'HealthTech', 'EdTech',
  'E-commerce', 'CMS', 'Content Management', 'WordPress', 'Headless CMS', 'JAMstack',
  'Static Site Generators', 'Developer Tools', 'Developer Experience', 'DX', 'UI/UX Design',
  'User Experience', 'User Interface', 'Product Management', 'Technical Leadership',
  'Engineering Management', 'Career Development', 'Remote Work', 'Collaboration Tools',
  'Documentation', 'Technical Writing', 'Community Building', 'Developer Advocacy',
  'Open Source Contribution', 'Sustainability', 'Green Software', 'Accessibility', 'Internationalization',
  'i18n', 'Localization', 'l10n', 'Performance Optimization', 'Scalability', 'Reliability'
].sort()
