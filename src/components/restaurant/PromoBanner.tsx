import Image from 'next/image';

interface PromoBannerProps {
  src: string;
  alt: string;
}

export default function PromoBanner({ src, alt }: PromoBannerProps) {
  return (
    <div className="w-full h-32 relative overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
