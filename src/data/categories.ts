export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    description: 'Latest news and insights about AI and machine learning',
  },
  {
    id: '2',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Modern web technologies and frameworks',
  },
  {
    id: '3',
    name: 'Mobile Tech',
    slug: 'mobile-tech',
    description: 'Smartphones, apps, and mobile innovations',
  },
  {
    id: '4',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Security news, threats, and protection strategies',
  },
  {
    id: '5',
    name: 'Cloud Computing',
    slug: 'cloud-computing',
    description: 'Cloud platforms, services, and infrastructure',
  },
  {
    id: '6',
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Cryptocurrency, NFTs, and blockchain technology',
  },
];
