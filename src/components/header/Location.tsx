import { MapPin } from 'lucide-react';

const ADDRESS = 'Rua Mandaguari, 198';

export default function Location() {
  return (
    <div className="flex flex-1 items-center">
      <div>
        <MapPin className="text-white" />
      </div>
      <div>
        <div className="text-white">entregando em</div> {/**14 bold - 700 */}
        <div className="text-2xl font-bold text-white">{ADDRESS}</div>
        {/** 16 bold - 700 */}
      </div>
    </div>
  );
}
