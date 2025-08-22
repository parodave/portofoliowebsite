export interface Project {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string[];
    en: string[];
  };
  image: string;
  tags: string[];
  url?: string;
  externalUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'kr',
    title: { fr: 'KR Global Solutions', en: 'KR Global Solutions' },
    description: {
      fr: [
        'Co-fondateur de KR Global Solutions LTD, société tech spécialisée dans le développement SaaS, l’e-commerce et l’IA. En freelance à l’international, je conçois des outils web, j’automatise des processus métiers et accompagne la transformation digitale. Je développe aussi mes propres marques et produits sous le nom KR Global.',
        'Développement SaaS personnalisé',
        'Création de boutiques e-commerce (Shopify, WooCommerce)',
        'Intégration d’IA (chatbots, copilotes, automatisations)',
        'Automatisation via API, no-code/low-code',
        'Développement full-stack (HTML, CSS, JS)',
        'UX/UI design & optimisation de l’expérience',
        'Lancement de produits & gestion de projets freelance',
        'Stratégie digitale, hébergement, infrastructure',
        'Marketing digital & ventes en ligne',
        'Travail à distance & collaboration internationale',
      ],
      en: [
        'Co-founder of KR Global Solutions LTD, a tech company focused on SaaS, e-commerce, and AI. As a global freelancer, I build smart web tools, automate business processes, and support digital transformation. I also develop my own brands and SaaS products under the KR Global name.',
        'Custom SaaS solutions',
        'E-commerce development (Shopify, WooCommerce)',
        'AI integration (chatbots, copilots, automation)',
        'API, no-code/low-code automation',
        'Full-stack web development (HTML, CSS, JS)',
        'UX/UI design & user experience optimization',
        'Freelance product & project management',
        'Digital strategy, hosting, infrastructure',
        'Online marketing & digital sales',
        'Remote work & international collaboration',
      ],
    },
    image: 'https://images.pexels.com/photos/6693638/pexels-photo-6693638.jpeg',
    tags: ['SaaS', 'E-commerce', 'Automation', 'IT'],
    externalUrl: 'https://www.krglobalsolutionsltd.com/',
  },
  {
    id: 'felizbella',
    title: { fr: 'FelizBella', en: 'FelizBella' },
    description: {
      fr: [
        'Co-fondateur de FelizBella, marque de cosmétiques naturels vendue en ligne. J’ai contribué au branding, au développement de la boutique et à la stratégie marketing.',
        'Création de marque (naming, design, storytelling)',
        'Développement e-commerce (Shopify, WooCommerce)',
        'Marketing digital (SEO, réseaux sociaux, pubs)',
        'Vente B2C (checkout, paiements, expéditions)',
        'Suivi de performance (trafic, conversions)',
        'Gestion client, retours & logistique',
      ],
      en: [
        'Co-founder of FelizBella, a natural cosmetics brand launched online. I contributed to branding, e-commerce development, and digital marketing strategy.',
        'Brand creation (naming, design, storytelling)',
        'Online store setup (Shopify, WooCommerce)',
        'Digital marketing (SEO, social media, paid ads)',
        'B2C sales management (checkout, shipping, payments)',
        'Performance tracking (traffic, conversions)',
        'Customer service & operations management',
      ],
    },
    image: 'https://images.pexels.com/photos/2622187/pexels-photo-2622187.jpeg',
    tags: ['Cosmetics', 'Shopify', 'Branding', 'Marketing'],
  },
  {
    id: 'khh',
    title: { fr: 'KHH Global Projects', en: 'KHH Global Projects' },
    description: {
      fr: [
        "Co-fondateur d'une société de locations Airbnb au Maroc. Je gère deux biens à distance via des outils automatisés pour maximiser la rentabilité, tout en développant un portefeuille immobilier durable et conforme aux normes locales.",
      ],
      en: [
        'Co-founder of a property rental company in Morocco. I remotely manage two Airbnb units using automation tools to improve profitability and grow a compliant and sustainable real estate portfolio.',
      ],
    },
    image: 'https://images.pexels.com/photos/21273694/pexels-photo-21273694.jpeg',
    tags: ['Real Estate', 'Airbnb', 'Automation', 'Invest'],
    externalUrl: 'https://khh-global-projects.vercel.app/',
  },
  {
    id: 'domaine',
    title: { fr: 'Domaine Harrach', en: 'Domaine Harrach' },
    description: {
      fr: [
        'Co-fondateur d’un domaine agricole bio au Maroc. Je contribue à la culture de fruits durables, au choix des cultures, à la vente locale, à l’optimisation des terres et à la vision à long terme du projet.',
      ],
      en: [
        'Co-founder of an organic agricultural estate in Morocco. I support fruit production using sustainable practices, project planning, local sales, and long-term development strategy.',
      ],
    },
    image: 'https://images.pexels.com/photos/5529519/pexels-photo-5529519.jpeg',
    tags: ['Agriculture', 'Organic', 'Morocco', 'Eco'],
  },
  {
    id: 'fastfood',
    title: { fr: "0'240", en: "0'240" },
    description: {
      fr: [
        'Associé dans un restaurant rapide local, avec un rôle actif dans la gestion, l’optimisation des coûts, le branding et le marketing de proximité.',
      ],
      en: [
        'Partner in a local fast-food restaurant, actively involved in management, cost optimization, branding, and local marketing.',
      ],
    },
    image: 'https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg',
    tags: ['Food', 'Local Business', 'Branding'],
  },
  {
    id: 'turfu',
    title: { fr: 'Turfu Driving', en: 'Turfu Driving' },
    description: {
      fr: [
        'Fondateur d’une société de location de véhicules 100 % digitale. Développement stratégique, gestion de flotte, automatisation CRM, partenariats commerciaux et optimisation des opérations par la tech.',
      ],
      en: [
        'Founder of a fully digital car rental company. Led strategic development, fleet management, CRM automation, business partnerships, and process optimization via tech.',
      ],
    },
    image: 'https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg',
    tags: ['Rental', 'Digital', 'CRM', 'Startup'],
  },
  {
    id: 'tlfh',
    title: { fr: 'TLFH', en: 'TLFH' },
    description: {
      fr: [
        'Responsable des opérations dans une société de transport. Gestion de la flotte, planification, supervision des conducteurs, relation B2B, veille réglementaire et réduction des coûts logistiques.',
      ],
      en: [
        'Operations manager in a freight transport company. Managed fleet planning, driver supervision, B2B client relations, regulatory monitoring, and cost optimization.',
      ],
    },
    image: 'https://images.pexels.com/photos/6169661/pexels-photo-6169661.jpeg',
    tags: ['Logistics', 'Transport', 'B2B', 'Ops'],
  },
  {
    id: 'wash',
    title: { fr: 'Wash Center', en: 'Wash Center' },
    description: {
      fr: [
        'Co-fondateur d’un service de lavage auto. Je pilote la stratégie, les opérations, le marketing local, les stocks, la rentabilité, et la relation client.',
      ],
      en: [
        'Co-founder of a car wash service. I oversee strategy, operations, local marketing, inventory, profitability, and customer relations.',
      ],
    },
    image: 'https://images.pexels.com/photos/6872572/pexels-photo-6872572.jpeg',
    tags: ['Car wash', 'Service', 'Process', 'Local'],
  },
  {
    id: 'thehand',
    title: { fr: 'The Hand', en: 'The Hand' },
    description: {
      fr: [
        'Projet DAO entrepreneurial rassemblant cinq entreprises. Chaque ‘doigt’ représente une entité, toutes connectées à un trésor central chargé de redistribuer les revenus mensuels.',
      ],
      en: [
        'Entrepreneurial DAO project bringing together five companies. Each ‘finger’ represents an entity, all connected to a central treasury responsible for redistributing monthly revenues.',
      ],
    },
    image: 'https://images.pexels.com/photos/4659806/pexels-photo-4659806.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['DAO', 'Blockchain', 'Business', 'Community'],
    externalUrl: 'https://dao-the-hand.vercel.app/',
  },
];
