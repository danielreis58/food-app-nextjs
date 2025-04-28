'use client';

import Typography from '@/components/Typography';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Mock cart data - in a real app, this would come from a state management solution like Redux or context
const mockCartItems = [
  {
    id: '1',
    name: 'Ceviche de salmão',
    quantity: 2,
    size: 'médio',
    price: 19.9,
    extras: [{ name: 'coca-cola', price: 5.0 }],
    observations: '',
  },
  {
    id: '2',
    name: 'Temaki Filadélfia',
    quantity: 1,
    price: 14.0,
    extras: [],
    ingredients: ['shimeji', 'cream cheese', 'tomate seco'],
    observations: 'tirar a cebolinha',
  },
  {
    id: '3',
    name: 'Temaki Mix',
    quantity: 1,
    price: 22.0,
    extras: [{ name: 'salmão', price: 8.0 }],
    observations: '',
  },
  {
    id: '4',
    name: 'Coca-cola lata',
    quantity: 2,
    price: 5.0,
    observations: '',
  },
];

export default function CheckoutPage() {
  const router = useRouter();

  // Calculate subtotal
  const subtotal = mockCartItems.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    const extrasTotal = item.extras
      ? item.extras.reduce((sum, extra) => sum + (extra.price || 0), 0)
      : 0;
    return acc + itemTotal + extrasTotal;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 pb-24">
      {/* Header */}
      <div className="bg-primary p-4">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Typography variant="16-bold-700" className="text-white">
            seus itens em
          </Typography>
        </div>
        <div className="mt-1 flex items-center">
          <div className="w-10 h-10 relative rounded-md overflow-hidden mr-2">
            <Image
              src="/restaurants/matsuri.png"
              alt="Restaurant Logo"
              fill
              className="object-cover"
            />
          </div>
          <Typography variant="20-bold-700" className="text-white">
            Matsuri Concept
          </Typography>
        </div>
      </div>

      {/* Cart items */}
      <div className="flex-1">
        {mockCartItems.map((item) => (
          <div key={item.id} className="bg-white p-4 mb-4 border-b">
            <div className="flex justify-between items-center">
              <Typography variant="16-bold-700" className="text-primary">
                R$ {(item.price * item.quantity).toFixed(2)}
              </Typography>
              <div className="flex items-center">
                <button className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <span className="mx-2 text-neutral-400">|</span>
                <button className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <Typography variant="16-bold-700">{item.name}</Typography>
              <div className="flex items-center">
                <button className="w-8 h-8 flex items-center justify-center rounded-full border">
                  <span className="text-neutral-500">-</span>
                </button>
                <Typography variant="16-bold-700" className="mx-3">
                  {item.quantity}
                </Typography>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border text-primary">
                  <span>+</span>
                </button>
              </div>
            </div>

            {/* Item customizations */}
            {item.size && (
              <div className="mt-2">
                <Typography
                  variant="14-regular-400"
                  className="text-neutral-600"
                >
                  • tamanho
                </Typography>
                <Typography
                  variant="14-regular-400"
                  className="text-neutral-600 ml-2"
                >
                  {item.size}
                </Typography>
              </div>
            )}

            {item.ingredients && item.ingredients.length > 0 && (
              <div className="mt-1">
                <Typography
                  variant="14-regular-400"
                  className="text-neutral-600"
                >
                  • escolha 3 ingredientes
                </Typography>
                <Typography
                  variant="14-regular-400"
                  className="text-neutral-600 ml-2"
                >
                  {item.ingredients.join(', ')}
                </Typography>
              </div>
            )}

            {item.extras && item.extras.length > 0 && (
              <div className="mt-1">
                <Typography
                  variant="14-regular-400"
                  className="text-neutral-600"
                >
                  • vai querer bebida?
                </Typography>
                {item.extras.map((extra, index) => (
                  <Typography
                    key={index}
                    variant="14-regular-400"
                    className="text-neutral-600 ml-2 flex justify-between"
                  >
                    <span>{extra.name}</span>
                    {extra.price > 0 && (
                      <span>+R$ {extra.price.toFixed(2)}</span>
                    )}
                  </Typography>
                ))}
              </div>
            )}

            {item.observations && (
              <div className="mt-1">
                <Typography
                  variant="14-regular-400"
                  className="text-neutral-600"
                >
                  • observação:
                </Typography>
                <Typography
                  variant="14-regular-400"
                  className="text-neutral-600 ml-2"
                >
                  {item.observations}
                </Typography>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fixed bottom bar with subtotal and checkout button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-md">
        <div className="flex justify-between items-center">
          <Typography variant="16-bold-700" className="text-neutral-800">
            subtotal
          </Typography>
          <Typography variant="20-bold-700" className="text-primary">
            R$ {subtotal.toFixed(2)}
          </Typography>
        </div>
        <button
          className="w-full bg-primary text-white py-3 rounded-md font-bold mt-2"
          onClick={() => alert('Pedido finalizado com sucesso!')}
        >
          ir para pagamento
        </button>
      </div>
    </div>
  );
}
