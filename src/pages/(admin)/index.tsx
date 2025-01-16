import ResumeAreGrid from '@components/admin/ResumeAreGrid';
import StatsList from '@components/admin/StatsList';
import TransactionAreaGrid from '@components/admin/TransactionAreGrid';

function AdminPage() {
  return (
    <div className="container mx-auto space-y-6 pt-4">
      <StatsList />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TransactionAreaGrid />
        <ResumeAreGrid />
      </div>
    </div>
  );
}

export default AdminPage;
