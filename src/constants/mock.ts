export const ADDRESS = 'Rua Mandaguari, 198';

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  rating: number;
  delivery: {
    type: 'free' | 'paid';
    price?: number;
  };
  location: string;
  categories?: string[];
  isOpen: boolean;
}

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Matsuri Concept',
    logo: '/restaurants/matsuri.png',
    rating: 4.7,
    delivery: {
      type: 'free',
    },
    location: 'Centro',
    categories: ['Japanese', 'Sushi'],
    isOpen: true,
  },
  {
    id: '2',
    name: 'Subway - Avenida center',
    logo: '/restaurants/subway.png',
    rating: 4.7,
    delivery: {
      type: 'paid',
      price: 6.0,
    },
    location: 'Avenida center',
    categories: ['Sandwiches', 'Fast Food'],
    isOpen: true,
  },
  {
    id: '3',
    name: 'Burger King - Colombo',
    logo: '/restaurants/burgerking.png',
    rating: 4.7,
    delivery: {
      type: 'paid',
      price: 6.0,
    },
    location: 'Colombo',
    categories: ['Burger', 'Fast Food'],
    isOpen: true,
  },
  {
    id: '4',
    name: "McDonald's - Novo Centro",
    logo: '/restaurants/mcdonalds.png',
    rating: 4.7,
    delivery: {
      type: 'free',
    },
    location: 'Novo Centro',
    categories: ['Burger', 'Fast Food'],
    isOpen: true,
  },
  {
    id: '5',
    name: 'Matsuri Concept',
    logo: '/restaurants/matsuri.png',
    rating: 4.7,
    delivery: {
      type: 'free',
    },
    location: 'Centro',
    categories: ['Japanese', 'Sushi'],
    isOpen: false,
  },
  {
    id: '6',
    name: 'Subway - Avenida center',
    logo: '/restaurants/subway.png',
    rating: 4.7,
    delivery: {
      type: 'paid',
      price: 6.0,
    },
    location: 'Avenida center',
    categories: ['Sandwiches', 'Fast Food'],
    isOpen: false,
  },
  {
    id: '7',
    name: 'Burger King - Colombo',
    logo: '/restaurants/burgerking.png',
    rating: 4.7,
    delivery: {
      type: 'paid',
      price: 6.0,
    },
    location: 'Colombo',
    categories: ['Burger', 'Fast Food'],
    isOpen: false,
  },
  {
    id: '8',
    name: "McDonald's - Novo Centro",
    logo: '/restaurants/mcdonalds.png',
    rating: 4.7,
    delivery: {
      type: 'free',
    },
    location: 'Novo Centro',
    categories: ['Burger', 'Fast Food'],
    isOpen: false,
  },
];
