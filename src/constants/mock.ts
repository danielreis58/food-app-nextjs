export const ADDRESS = 'Rua Mandaguari, 198';
import { v4 as uuidv4 } from 'uuid';

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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
