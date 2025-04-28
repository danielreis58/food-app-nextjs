import Typography from '@/components/Typography';
import { type Restaurant } from '@/constants/mock';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter();

  const { id, name, logo, rating, delivery } = restaurant;

  return (
    <div
      className="flex items-center w-full bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition duration-200 ease-in-out"
      onClick={() => router.push(`/restaurant/${id}`)}
    >
      <div className="w-18 h-18 relative rounded-l-lg overflow-hidden">
        <Image
          src={logo}
          alt={name}
          fill
          className="object-cover"
          sizes="72px"
        />
      </div>

      <div className="flex flex-col flex-1 p-3 gap-1">
        <Typography variant="16-bold-700" className="text-neutral-700">
          {name}
        </Typography>
        <div className="flex items-center mt-1">
          {delivery.type === 'free' ? (
            <div className="flex items-center text-teal-600 mr-2">
              <div className="w-5 h-5 relative overflow-hidden mr-1">
                <Image
                  src="/svg/icons/motorcycle.svg"
                  alt="Free Delivery"
                  fill
                />
              </div>
              <Typography variant="14-bold-700" className="text-teal-600">
                grátis
              </Typography>
            </div>
          ) : (
            <div className="flex items-center text-primary">
              <div className="w-4 h-4 relative overflow-hidden mr-1">
                <Image
                  src="/svg/icons/aiq-a-icon-delivery.svg"
                  alt="Delivery Price"
                  fill
                />
              </div>
              <Typography variant="14-bold-700" className="mr-2">
                R${delivery.price?.toFixed(2)}
              </Typography>
            </div>
          )}

          <div className="flex items-center text-yellow-500">
            <div className="w-4 h-4 relative overflow-hidden mr-1">
              <Image src="/svg/icons/star.svg" alt="Rating" fill />
            </div>
            <Typography variant="14-bold-700" className="text-neutral-500">
              {rating}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
