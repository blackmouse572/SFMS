import Input from '@components/tailus-ui/Input';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

type DebounceInputProps = {
  defaultValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  delay?: number;
} & Omit<React.ComponentProps<typeof Input>, 'onChange'>;
function DebounceInput({ defaultValue, placeholder, onChange, delay = 300, ...props }: DebounceInputProps) {
  const [displayValue, setDisplayValue] = useState(defaultValue ?? '');
  const debouncedSearchTerm = useDebounce(displayValue, delay);

  useEffect(() => {
    onChange(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <Input
      value={displayValue}
      onChange={(e) => {
        setDisplayValue(e.target.value);
      }}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default DebounceInput;
