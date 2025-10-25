import { XIcon } from 'lucide-react';

export default function RegisterModalHeader({
  title,
  handleClose,
}: {
  title: string;
  handleClose: () => void;
}) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <button onClick={handleClose} className="cursor-pointer">
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
