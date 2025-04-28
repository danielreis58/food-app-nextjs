export const ADDRESS = 'Rua Mandaguari, 198';
import { v4 as uuidv4 } from 'uuid';

export type ProductTag = 'spicy' | 'vegetarian';
export interface ProductSize {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  isDefault?: boolean;
}

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  available: boolean;
}

export interface ProductOption {
  id: string;
  name: string;
  price: number;
  discountPrice: 0;
  available: boolean;
}

export interface ProductCutlery {
  id: string;
  name: string;
  price: number;
  discountPrice: 0;
  available: boolean;
}

export interface ProductExtra {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  tags: ProductTag[];
  available: boolean;
}

// Interface para produtos
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  tags: ProductTag[];
  category: string;
  image?: string;
  sizes?: ProductSize[];
  addons?: ProductAddon[];
  options?: ProductOption[];
  cutlery?: ProductCutlery[];
  extras?: ProductExtra[];
}

// Interface para categorias de produtos no restaurante
export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  products: Product[];
}

// Interface principal de restaurante com informações adicionais
export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  rating: number;
  delivery: {
    type: 'free' | 'paid';
    price?: number;
    freeDeliveryOver?: number;
    time: string;
    distance: string;
  };
  location: string;
  categories?: string[];
  isOpen: boolean;
  openHours?: string;
  minimumOrder: number;
  productCategories: ProductCategory[];
}

export const restaurants: Restaurant[] = [
  {
    id: uuidv4(),
    name: 'Matsuri Concept',
    logo: '/restaurants/matsuri.png',
    rating: 4.5,
    delivery: {
      type: 'paid',
      price: 4.99,
      freeDeliveryOver: 35.0,
      time: '30-40 min',
      distance: '5.2km',
    },
    location: 'Centro',
    categories: ['Japanese', 'Sushi'],
    isOpen: true,
    openHours: 'fecha às 20:00',
    minimumOrder: 15.0,
    productCategories: [
      {
        id: uuidv4(),
        name: 'Niguiris',
        products: [
          {
            id: uuidv4(),
            name: 'Niguiri Tradicional',
            description: 'Arroz com peixe fresco por cima',
            price: 10.99,
            discountPrice: 0,
            tags: [],
            category: 'Niguiris',
          },
          {
            id: uuidv4(),
            name: 'Niguiri Especial',
            description: 'Arroz com salmão maçaricado e molho especial',
            price: 12.99,
            discountPrice: 0,
            tags: [],
            category: 'Niguiris',
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Ceviches',
        description:
          'um prato super refrescante de peixe fatiado e marinado com limão',
        products: [
          {
            id: uuidv4(),
            name: 'Ceviche de Salmão',
            description: 'salmão temperado com limão, cebola e pimenta',
            price: 22.9,
            discountPrice: 19.9,
            tags: [],
            category: 'Ceviches',
            image: '/products/ceviche-salmon.png',
            sizes: [
              {
                id: uuidv4(),
                name: 'médio',
                price: 22.9,
                discountPrice: 19.9,
                isDefault: true,
              },
              {
                id: uuidv4(),
                name: 'grande',
                price: 28.9,
                discountPrice: 0,
              },
            ],
            addons: [
              {
                id: uuidv4(),
                name: 'shoyu',
                price: 0,
                discountPrice: 0,
                available: true,
              },
              {
                id: uuidv4(),
                name: 'gengibre',
                price: 0,
                discountPrice: 0,
                available: true,
              },
              {
                id: uuidv4(),
                name: 'wasabi',
                price: 0,
                discountPrice: 0,
                available: true,
              },
              {
                id: uuidv4(),
                name: 'sem acompanhamentos',
                price: 0,
                discountPrice: 0,
                available: true,
              },
            ],
            cutlery: [
              {
                id: uuidv4(),
                name: 'hashi',
                price: 0,
                discountPrice: 0,
                available: true,
              },
              {
                id: uuidv4(),
                name: 'garfo e faca descartável',
                price: 1.0,
                discountPrice: 0,
                available: true,
              },
            ],
            extras: [
              {
                id: uuidv4(),
                name: 'biscoito da sorte',
                price: 2.0,
                discountPrice: 0,
                tags: [],
                available: true,
              },
              {
                id: uuidv4(),
                name: 'rolinho primavera',
                price: 8.0,
                discountPrice: 0,
                tags: [],
                available: true,
              },
              {
                id: uuidv4(),
                name: 'guioza',
                price: 6.0,
                discountPrice: 0,
                tags: [],
                available: true,
              },
            ],
          },
          {
            id: uuidv4(),
            name: 'Ceviche de Peixe Branco',
            description:
              'peixe branco marinado em suco de limão com pimenta e cebola roxa',
            price: 17.9,
            discountPrice: 0,
            tags: [],
            category: 'Ceviches',
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Temakis',
        description: 'sushi em forma de cone com salmão e cream cheese',
        products: [
          {
            id: uuidv4(),
            name: 'Califórnia',
            description: 'Kani, pepino e maçã ou manga',
            price: 17.0,
            discountPrice: 13.99,
            tags: ['vegetarian'],
            category: 'Temakis',
          },
          {
            id: uuidv4(),
            name: 'Filadélfia',
            description: 'Arroz, salmão fresco, cream cheese e cebolinha',
            price: 13.99,
            discountPrice: 0,
            tags: [],
            category: 'Temakis',
          },
          {
            id: uuidv4(),
            name: 'Mix',
            description:
              'Escolha 3 ingredientes: shimeji, alface americana, rúcula, pepino, tomate seco, cream cheese, maionese, cebolinha',
            price: 13.99,
            discountPrice: 0,
            tags: ['spicy'],
            category: 'Temakis',
            sizes: [
              {
                id: uuidv4(),
                name: 'pequeno',
                price: 13.99,
                discountPrice: 0,
                isDefault: true,
              },
              {
                id: uuidv4(),
                name: 'grande',
                price: 19.99,
                discountPrice: 0,
              },
            ],
          },
          {
            id: uuidv4(),
            name: 'Salmão picante',
            description: 'Alga, arroz, salmão fresco, pimenta e cebolinha',
            price: 13.99,
            discountPrice: 0,
            tags: ['spicy'],
            category: 'Temakis',
            sizes: [
              {
                id: uuidv4(),
                name: 'pequeno',
                price: 13.99,
                discountPrice: 0,
                isDefault: true,
              },
              {
                id: uuidv4(),
                name: 'grande',
                price: 19.99,
                discountPrice: 0,
              },
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Bebidas',
        products: [
          {
            id: uuidv4(),
            name: 'Coca-cola',
            description: 'Lata 350ml',
            price: 5.0,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
          {
            id: uuidv4(),
            name: 'Fanta laranja',
            description: 'Lata 350ml',
            price: 5.0,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
          {
            id: uuidv4(),
            name: 'Guaraná antarctica',
            description: 'Lata 350ml',
            price: 5.0,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
          {
            id: uuidv4(),
            name: 'Suco Prats laranja',
            description: 'Garrafa 450ml',
            price: 6.0,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
          {
            id: uuidv4(),
            name: 'Água sem gás',
            description: 'Garrafa 500ml',
            price: 3.0,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Sobremesas',
        products: [
          {
            id: uuidv4(),
            name: 'Sorvete de chá verde',
            description: 'Porção individual 120g',
            price: 8.99,
            discountPrice: 0,
            tags: [],
            category: 'Sobremesas',
          },
          {
            id: uuidv4(),
            name: 'Mochi de chocolate',
            description: '2 unidades',
            price: 10.5,
            discountPrice: 0,
            tags: [],
            category: 'Sobremesas',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Subway - Avenida center',
    logo: '/restaurants/subway.png',
    rating: 4.7,
    delivery: {
      type: 'paid',
      price: 6.0,
      time: '25-35 min',
      distance: '3.8km',
    },
    location: 'Avenida center',
    categories: ['Sandwiches', 'Fast Food'],
    isOpen: true,
    minimumOrder: 12.0,
    productCategories: [
      {
        id: uuidv4(),
        name: 'Sanduíches',
        products: [
          {
            id: uuidv4(),
            name: 'Frango Teriyaki',
            description:
              'Frango grelhado com molho teriyaki, vegetais e queijo',
            price: 18.9,
            discountPrice: 0,
            tags: [],
            category: 'Sanduíches',
            sizes: [
              {
                id: uuidv4(),
                name: '15cm',
                price: 18.9,
                discountPrice: 0,
                isDefault: true,
              },
              {
                id: uuidv4(),
                name: '30cm',
                price: 32.9,
                discountPrice: 0,
              },
            ],
            addons: [
              {
                id: uuidv4(),
                name: 'Queijo extra',
                price: 2.0,
                discountPrice: 0,
                available: true,
              },
              {
                id: uuidv4(),
                name: 'Bacon',
                price: 3.0,
                discountPrice: 0,
                available: true,
              },
            ],
          },
          {
            id: uuidv4(),
            name: 'Italiano BMT',
            description: 'Peperoni, salame, presunto, vegetais e queijo',
            price: 19.9,
            discountPrice: 0,
            tags: [],
            category: 'Sanduíches',
            sizes: [
              {
                id: uuidv4(),
                name: '15cm',
                price: 19.9,
                discountPrice: 0,
                isDefault: true,
              },
              {
                id: uuidv4(),
                name: '30cm',
                price: 33.9,
                discountPrice: 0,
              },
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Bebidas',
        products: [
          {
            id: uuidv4(),
            name: 'Refrigerante',
            description: 'Copo 500ml',
            price: 6.0,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
          {
            id: uuidv4(),
            name: 'Suco natural',
            description: 'Copo 300ml',
            price: 7.0,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Burger King - Colombo',
    logo: '/restaurants/burgerking.png',
    rating: 4.7,
    delivery: {
      type: 'paid',
      price: 6.0,
      time: '20-40 min',
      distance: '4.5km',
    },
    location: 'Colombo',
    categories: ['Burger', 'Fast Food'],
    isOpen: true,
    minimumOrder: 10.0,
    productCategories: [
      {
        id: uuidv4(),
        name: 'Lanches',
        products: [
          {
            id: uuidv4(),
            name: 'Whopper',
            description:
              'Hambúrguer grelhado no fogo com queijo, tomate, alface, cebola, picles, ketchup e maionese',
            price: 21.9,
            discountPrice: 0,
            tags: [],
            category: 'Lanches',
          },
          {
            id: uuidv4(),
            name: 'Whopper Duplo',
            description:
              'Dois hambúrgueres grelhados no fogo com queijo, tomate, alface, cebola, picles, ketchup e maionese',
            price: 28.9,
            discountPrice: 0,
            tags: [],
            category: 'Lanches',
          },
          {
            id: uuidv4(),
            name: 'Chicken Jr',
            description: 'Frango empanado com alface e maionese',
            price: 9.9,
            discountPrice: 0,
            tags: [],
            category: 'Lanches',
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Bebidas',
        products: [
          {
            id: uuidv4(),
            name: 'Refrigerante',
            description: 'Copo 500ml',
            price: 7.0,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
          {
            id: uuidv4(),
            name: 'Milk Shake',
            description: 'Copo 400ml',
            price: 10.9,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Sobremesas',
        products: [
          {
            id: uuidv4(),
            name: 'Sundae',
            description: 'Sorvete com calda',
            price: 7.9,
            discountPrice: 0,
            tags: [],
            category: 'Sobremesas',
          },
          {
            id: uuidv4(),
            name: 'Torta de maçã',
            description: 'Torta quentinha de maçã',
            price: 6.9,
            discountPrice: 0,
            tags: [],
            category: 'Sobremesas',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "McDonald's - Novo Centro",
    logo: '/restaurants/mcdonalds.png',
    rating: 4.7,
    delivery: {
      type: 'free',
      freeDeliveryOver: 25.0,
      time: '20-35 min',
      distance: '3.2km',
    },
    location: 'Novo Centro',
    categories: ['Burger', 'Fast Food'],
    isOpen: true,
    minimumOrder: 10.0,
    productCategories: [
      {
        id: uuidv4(),
        name: 'Sanduíches',
        products: [
          {
            id: uuidv4(),
            name: 'Big Mac',
            description:
              'Dois hambúrgueres, alface, queijo, molho especial, cebola e picles em pão com gergelim',
            price: 24.9,
            discountPrice: 0,
            tags: [],
            category: 'Sanduíches',
          },
          {
            id: uuidv4(),
            name: 'Quarterão',
            description:
              'Hambúrguer com queijo, picles, cebola, ketchup e mostarda',
            price: 21.9,
            discountPrice: 0,
            tags: [],
            category: 'Sanduíches',
          },
          {
            id: uuidv4(),
            name: 'McChicken',
            description: 'Frango empanado com maionese e alface',
            price: 19.9,
            discountPrice: 0,
            tags: [],
            category: 'Sanduíches',
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'McOferta',
        products: [
          {
            id: uuidv4(),
            name: 'Big Mac + Batata Média + Bebida Média',
            description: 'Combo com Big Mac, batata média e bebida média',
            price: 33.9,
            discountPrice: 0,
            tags: [],
            category: 'McOferta',
          },
          {
            id: uuidv4(),
            name: 'Quarterão + Batata Média + Bebida Média',
            description: 'Combo com Quarterão, batata média e bebida média',
            price: 31.9,
            discountPrice: 0,
            tags: [],
            category: 'McOferta',
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Bebidas',
        products: [
          {
            id: uuidv4(),
            name: 'Coca-Cola',
            description: 'Copo 500ml',
            price: 7.5,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
          {
            id: uuidv4(),
            name: 'Suco de Laranja',
            description: 'Copo 300ml',
            price: 8.0,
            discountPrice: 0,
            tags: [],
            category: 'Bebidas',
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Sobremesas',
        products: [
          {
            id: uuidv4(),
            name: 'McFlurry Ovomaltine',
            description:
              'Sorvete de baunilha com cobertura e pedaços de Ovomaltine',
            price: 12.9,
            discountPrice: 0,
            tags: [],
            category: 'Sobremesas',
          },
          {
            id: uuidv4(),
            name: 'Casquinha',
            description: 'Sorvete no cone',
            price: 4.9,
            discountPrice: 0,
            tags: [],
            category: 'Sobremesas',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Matsuri Concept',
    logo: '/restaurants/matsuri.png',
    rating: 4.5,
    delivery: {
      type: 'free',
      freeDeliveryOver: 35.0,
      time: '30-40 min',
      distance: '5.2km',
    },
    location: 'Centro',
    categories: ['Japanese', 'Sushi'],
    isOpen: false,
    openHours: 'fecha às 20:00',
    minimumOrder: 15.0,
    productCategories: [
      {
        id: uuidv4(),
        name: 'Niguiris',
        products: [
          {
            id: uuidv4(),
            name: 'Niguiri Tradicional',
            description: 'Arroz com peixe fresco por cima',
            price: 10.99,
            discountPrice: 0,
            tags: [],
            category: 'Niguiris',
          },
          {
            id: uuidv4(),
            name: 'Niguiri Especial',
            description: 'Arroz com salmão maçaricado e molho especial',
            price: 12.99,
            discountPrice: 0,
            tags: [],
            category: 'Niguiris',
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Ceviches',
        description:
          'um prato super refrescante de peixe fatiado e marinado com limão',
        products: [
          {
            id: uuidv4(),
            name: 'Ceviche de Salmão',
            description: 'salmão temperado com limão, cebola e pimenta',
            price: 22.9,
            discountPrice: 19.9,
            tags: [],
            category: 'Ceviches',
            sizes: [
              {
                id: uuidv4(),
                name: 'médio',
                price: 22.9,
                discountPrice: 19.9,
                isDefault: true,
              },
              {
                id: uuidv4(),
                name: 'grande',
                price: 28.9,
                discountPrice: 0,
              },
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        name: 'Temakis',
        description: 'sushi em forma de cone com salmão e cream cheese',
        products: [
          {
            id: uuidv4(),
            name: 'Califórnia',
            description: 'Kani, pepino e maçã ou manga',
            price: 13.99,
            discountPrice: 13.99,
            tags: [],
            category: 'Temakis',
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Subway - Avenida center',
    logo: '/restaurants/subway.png',
    rating: 4.7,
    delivery: {
      type: 'paid',
      price: 6.0,
      time: '25-35 min',
      distance: '3.8km',
    },
    location: 'Avenida center',
    categories: ['Sandwiches', 'Fast Food'],
    isOpen: false,
    minimumOrder: 12.0,
    productCategories: [],
  },
  {
    id: uuidv4(),
    name: 'Burger King - Colombo',
    logo: '/restaurants/burgerking.png',
    rating: 4.7,
    delivery: {
      type: 'paid',
      price: 6.0,
      time: '20-40 min',
      distance: '4.5km',
    },
    location: 'Colombo',
    categories: ['Burger', 'Fast Food'],
    isOpen: false,
    minimumOrder: 10.0,
    productCategories: [],
  },
  {
    id: uuidv4(),
    name: "McDonald's - Novo Centro",
    logo: '/restaurants/mcdonalds.png',
    rating: 4.7,
    delivery: {
      type: 'free',
      freeDeliveryOver: 25.0,
      time: '20-35 min',
      distance: '3.2km',
    },
    location: 'Novo Centro',
    categories: ['Burger', 'Fast Food'],
    isOpen: false,
    minimumOrder: 10.0,
    productCategories: [],
  },
];
