'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Input } from './ui/Input';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const t = useTranslations('SearchBar');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search size={16} />
      </div>
      <Input
        type="text"
        className="pl-10 py-3 w-full rounded-lg border-0 placeholder:text-gray-400"
        placeholder={t('SearchPlaceholder')}
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
