import { Search } from 'lucide-react';
import Input from '../ui/Input';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = 'Search…' }: Props) {
  return (
    <Input
      icon={<Search size={18} />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
