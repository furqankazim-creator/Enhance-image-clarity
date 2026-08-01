export type Product = {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  category: string[]
  price: number
  salePrice?: number
  images: [string, string] // [main, hover]
  stock: number
  inStock: boolean
  careLevel: 'Easy' | 'Medium' | 'Advanced'
  lightRequirement: 'Low' | 'Medium' | 'Bright Indirect'
  petSafe: boolean
  potIncluded: boolean
  rating: number
  reviewCount: number
  isFeatured: boolean
  isBestSeller: boolean
  tags: string[]
}

const IMG = (id: string, w = 600, h = 720) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

export const products: Product[] = [
  {
    id: '1',
    slug: 'snake-plant',
    name: 'Snake Plant',
    shortDescription: 'The ultimate low-maintenance office companion. Thrives on neglect.',
    description:
      'Sansevieria Trifasciata — the Snake Plant — is the most forgiving plant in the world. It tolerates low light, infrequent watering, and fluctuating temperatures with effortless grace. Its upright, architectural form adds a sculptural quality to any desk or shelf. Known for air-purifying properties, it converts CO₂ to oxygen even at night.',
    category: ['Office Plants', 'Low-Light', 'Air Purifying'],
    price: 28,
    images: [IMG('1638824096986-5c5ed96d118a'), IMG('1615389709015-c025520f97fc')],
    stock: 24,
    inStock: true,
    careLevel: 'Easy',
    lightRequirement: 'Low',
    petSafe: false,
    potIncluded: true,
    rating: 4.9,
    reviewCount: 142,
    isFeatured: true,
    isBestSeller: true,
    tags: ['air-purifying', 'low-light', 'architectural'],
  },
  {
    id: '2',
    slug: 'golden-pothos',
    name: 'Golden Pothos',
    shortDescription: 'Cascading vines that bring life to shelves, ledges, and corners.',
    description:
      'Epipremnum aureum — the Golden Pothos — is beloved for its trailing, heart-shaped leaves marbled in gold and deep green. Incredibly resilient, it roots in water, thrives in soil, and tolerates irregular watering. Perfect cascading from a high shelf or climbing a small trellis. One of the best natural air purifiers available.',
    category: ['Office Plants', 'Air Purifying'],
    price: 22,
    salePrice: 18,
    images: [IMG('1537039557108-4a42c334fd5e'), IMG('1740062450747-988899d29f75')],
    stock: 18,
    inStock: true,
    careLevel: 'Easy',
    lightRequirement: 'Low',
    petSafe: false,
    potIncluded: false,
    rating: 4.8,
    reviewCount: 98,
    isFeatured: true,
    isBestSeller: true,
    tags: ['trailing', 'air-purifying', 'fast-growing'],
  },
  {
    id: '3',
    slug: 'zz-plant',
    name: 'ZZ Plant',
    shortDescription: 'Glossy, architectural, and virtually indestructible.',
    description:
      'Zamioculcas zamiifolia — the ZZ Plant — features thick, waxy, deep-green leaves that stay glossy year-round. It stores water in its rhizomes, making it drought-tolerant and perfect for forgetful plant parents. Its upright stems and architectural form add sophistication to any workspace without demanding attention.',
    category: ['Office Plants', 'Low-Light'],
    price: 34,
    images: [IMG('1632207691143-643e2a9a9361'), IMG('1614594895304-fe7116ac3b58')],
    stock: 15,
    inStock: true,
    careLevel: 'Easy',
    lightRequirement: 'Low',
    petSafe: false,
    potIncluded: true,
    rating: 4.7,
    reviewCount: 76,
    isFeatured: true,
    isBestSeller: false,
    tags: ['drought-tolerant', 'architectural', 'glossy'],
  },
  {
    id: '4',
    slug: 'aloe-vera',
    name: 'Aloe Vera',
    shortDescription: 'Sunlit and useful — your desk-side first aid kit.',
    description:
      'Aloe barbadensis miller — the most useful plant on any desk. Its gel soothes minor burns and skin irritation on contact. With thick, sculptural rosettes in cool grey-green, it adds a graphic quality to bright windowsills. Water once every 2–3 weeks and let it bask in indirect sunlight.',
    category: ['Office Plants', 'Succulents'],
    price: 19,
    images: [IMG('1509423350716-97f9360b4e09'), IMG('1448697138198-9aa6d0d84bf4')],
    stock: 30,
    inStock: true,
    careLevel: 'Easy',
    lightRequirement: 'Bright Indirect',
    petSafe: false,
    potIncluded: false,
    rating: 4.6,
    reviewCount: 115,
    isFeatured: false,
    isBestSeller: true,
    tags: ['succulent', 'healing', 'drought-tolerant'],
  },
  {
    id: '5',
    slug: 'pilea-peperomioides',
    name: 'Pilea Peperomioides',
    shortDescription: 'The UFO plant — perfectly round leaves on elegant stems.',
    description:
      "Pilea peperomioides — nicknamed the UFO Plant or Chinese Money Plant — is a design darling. Its perfectly circular, coin-shaped leaves on slender, erect stems feel almost architectural. It produces offshoots freely that you can pot up as gifts. Pet-safe, fast-growing, and endlessly charming on a bright desk.",
    category: ['Office Plants', 'Pet-Safe'],
    price: 26,
    salePrice: 22,
    images: [IMG('1783727934578-f9fc51334757'), IMG('1769162195205-3aea3fc4e786')],
    stock: 12,
    inStock: true,
    careLevel: 'Medium',
    lightRequirement: 'Medium',
    petSafe: true,
    potIncluded: true,
    rating: 4.8,
    reviewCount: 63,
    isFeatured: true,
    isBestSeller: false,
    tags: ['pet-safe', 'propagating', 'trendy'],
  },
  {
    id: '6',
    slug: 'succulents-trio',
    name: "Succulent Trio",
    shortDescription: 'Three miniature sculptural forms in one striking arrangement.',
    description:
      'A curated trio of three complementary succulents — Echeveria, Haworthia, and Sedum — potted together in a single terracotta bowl. Each brings a different texture and rosette form. Require bright indirect light and watering only once every 2 weeks. Perfect for south-facing windowsills.',
    category: ['Succulents', 'Office Plants'],
    price: 38,
    images: [IMG('1485955900006-10f4d324d411'), IMG('1509423350716-97f9360b4e09')],
    stock: 8,
    inStock: true,
    careLevel: 'Easy',
    lightRequirement: 'Bright Indirect',
    petSafe: false,
    potIncluded: true,
    rating: 4.5,
    reviewCount: 44,
    isFeatured: false,
    isBestSeller: false,
    tags: ['succulent', 'arrangement', 'gift'],
  },
  {
    id: '7',
    slug: 'money-plant',
    name: 'Money Plant',
    shortDescription: 'Variegated beauty believed to bring prosperity and good fortune.',
    description:
      'Epipremnum aureum "Marble Queen" — the variegated Money Plant — features cream and green marbled leaves with an almost painterly quality. Believed in Feng Shui to attract wealth and positive energy. Equally happy trailing from a shelf or climbing a moss pole. Tolerates moderate low light.',
    category: ['Office Plants', 'Air Purifying'],
    price: 24,
    images: [IMG('1766243062910-bda898a2470c'), IMG('1769162195205-3aea3fc4e786')],
    stock: 20,
    inStock: true,
    careLevel: 'Easy',
    lightRequirement: 'Medium',
    petSafe: false,
    potIncluded: false,
    rating: 4.7,
    reviewCount: 89,
    isFeatured: false,
    isBestSeller: true,
    tags: ['variegated', 'trailing', 'feng-shui'],
  },
  {
    id: '8',
    slug: 'peace-lily',
    name: 'Peace Lily',
    shortDescription: "White blooms, dark foliage — pure elegance that tolerates shade.",
    description:
      'Spathiphyllum — the Peace Lily — is exceptional for its tolerance of low light and its graceful white blooms that appear several times a year. The contrast between its deep, glossy foliage and luminous white spathes creates a striking visual effect. One of the best plants for improving air quality indoors.',
    category: ['Office Plants', 'Low-Light', 'Air Purifying'],
    price: 32,
    images: [IMG('1680676960765-f18115aa7390'), IMG('1680676960765-f18115aa7390')],
    stock: 0,
    inStock: false,
    careLevel: 'Medium',
    lightRequirement: 'Low',
    petSafe: false,
    potIncluded: true,
    rating: 4.6,
    reviewCount: 57,
    isFeatured: false,
    isBestSeller: false,
    tags: ['flowering', 'air-purifying', 'low-light'],
  },
]

export const categories = [
  {
    id: 'low-light',
    name: 'Low-Light',
    description: 'Thrives away from windows. Perfect for interior desks.',
    image: IMG('1638824096986-5c5ed96d118a', 400, 500),
    count: 4,
  },
  {
    id: 'air-purifying',
    name: 'Air Purifying',
    description: "Filters toxins and oxygenates your workspace naturally.",
    image: IMG('1537039557108-4a42c334fd5e', 400, 500),
    count: 5,
  },
  {
    id: 'pet-safe',
    name: 'Pet-Safe',
    description: 'Non-toxic varieties safe for cats, dogs, and curious companions.',
    image: IMG('1783727934578-f9fc51334757', 400, 500),
    count: 2,
  },
  {
    id: 'succulents',
    name: 'Succulents',
    description: 'Drought-tolerant sculptural forms for bright windowsills.',
    image: IMG('1509423350716-97f9360b4e09', 400, 500),
    count: 3,
  },
]

export const reviews = [
  {
    id: '1',
    name: 'Sarah M.',
    rating: 5,
    date: 'Dec 2024',
    comment:
      'The Snake Plant arrived in perfect condition, beautifully packaged with a handwritten care card. Three months on and it looks even better than when it arrived. This shop really knows their plants.',
    avatar: 'SM',
    product: 'Snake Plant',
  },
  {
    id: '2',
    name: 'James K.',
    rating: 5,
    date: 'Jan 2025',
    comment:
      "Ordered the Pothos for my home office and it's transformed the space entirely. Fast shipping, great packaging. Already ordered two more plants as gifts for colleagues.",
    avatar: 'JK',
    product: 'Golden Pothos',
  },
  {
    id: '3',
    name: 'Priya N.',
    rating: 4,
    date: 'Feb 2025',
    comment:
      'Beautiful ZZ Plant — exactly as pictured. Only minor issue was the pot had a small chip but Nabat Green sent a replacement pot immediately. Outstanding customer service.',
    avatar: 'PN',
    product: 'ZZ Plant',
  },
  {
    id: '4',
    name: 'Tom W.',
    rating: 5,
    date: 'Mar 2025',
    comment:
      'Bought the Pilea for my daughter who was starting university. She loves it and has already propagated 4 babies. The care guide that came with it was incredibly detailed.',
    avatar: 'TW',
    product: 'Pilea Peperomioides',
  },
  {
    id: '5',
    name: 'Elena R.',
    rating: 5,
    date: 'Apr 2025',
    comment:
      'My fifth order from Nabat Green and every time the quality is impeccable. The plants are always healthy, well-established, and the packaging is beautifully minimal. Highly recommend.',
    avatar: 'ER',
    product: 'Succulent Trio',
  },
]
