import Card from '../ui/Card';

interface Props {
  label: string;
  value: string;
}

export default function StatCard({ label, value }: Props) {
  return (
    <Card className="px-5 py-4">
      <div className="text-xs font-medium uppercase tracking-wide text-textSecondary">{label}</div>
      <div className="mt-1 text-2xl font-bold text-textPrimary">{value}</div>
    </Card>
  );
}
