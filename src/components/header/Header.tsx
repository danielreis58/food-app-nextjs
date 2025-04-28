import HomeButton from './HomeButton';
import Location from './Location';
import UserButton from './UserButton';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 p-4 bg-primary h-18">
      <div className="flex justify-between items-center gap-6 bg-primary">
        <HomeButton />
        <Location />
        <UserButton />
      </div>
    </header>
  );
}
