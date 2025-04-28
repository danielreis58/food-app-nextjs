'use client';

import PromoBanner from '@/components/restaurant/PromoBanner';
import RestaurantList from '@/components/restaurant/RestaurantList';
import SearchBar from '@/components/ui/SearchBar';
import { restaurants } from '@/constants/mock';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="flex flex-col">
      <div className="sticky top-18 z-50 p-4 bg-primary">
        <SearchBar onSearch={handleSearch} />
      </div>

      <PromoBanner alt="Kids Day" src="/promo/kids-day.png" />

      <div className="px-4 py-6 ">
        <RestaurantList restaurants={restaurants} searchQuery={searchQuery} />
      </div>
    </main>
  );
}
