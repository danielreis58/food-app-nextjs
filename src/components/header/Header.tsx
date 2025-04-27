import HomeButton from './HomeButton';
import Location from './Location';
import UserButton from './UserButton';

export default function Header() {
  return (
    <header className="shadow p-4 bg-[var(--color-primary)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-6 bg-[var(--color-primary)]">
        <HomeButton />
        <Location />
        <UserButton />
      </div>
    </header>
  );
}
