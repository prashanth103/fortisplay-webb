import Card from '../ui/Card';
import Text from '../ui/Text';

interface Props {
  label: string;
  value: string;
}

export default function StatCard({ label, value }: Props) {
  return (
    <Card className="px-5 py-4">
      <Text as="div" variant="labelMedium" className="uppercase text-textSecondary">{label}</Text>
      <Text as="div" variant="headlineLarge" className="mt-1 text-textPrimary">{value}</Text>
    </Card>
  );
}
