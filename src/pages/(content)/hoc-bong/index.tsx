import { useBreadcrumb } from '@components/admin-breadcrumb/AdminBreadcrumb';
import { SchoolarShipsList } from '@components/schoolar-list';
import SearchBar from '@components/schoolar-list/SearchBar';
import { Display } from '@components/tailus-ui/typography';
import { useEffectOnce } from '@hooks/useEffectOnce';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

function HocBongPage() {
  const [search] = useSearchParams();
  const { setItems } = useBreadcrumb();
  const [filter, setFilter] = useSearchParams(
    new URLSearchParams({
      s: '',
      location: '',
    })
  );
  const defaultFilter = useMemo(() => {
    return Object.fromEntries(filter.entries());
  }, [filter]);
  useEffectOnce(() => {
    setItems([]);
  });
  return (
    <div className="space-y-8 py-6">
      <div>
        <Display className="text-2xl font-bold">Học bổng</Display>
        <p className="text-sm text-gray-500">Tìm kiếm {search.get('location') ?? search.get('s')}</p>
        <SearchBar
          defaultValues={defaultFilter}
          onSearch={(filter) => {
            setFilter(
              new URLSearchParams(
                Object.entries(filter).reduce((acc, [key, value]) => {
                  if (value) {
                    acc.set(key, value.toString());
                  }
                  return acc;
                }, new URLSearchParams())
              )
            );
          }}
        />
      </div>
      <SchoolarShipsList filter={Object.fromEntries(filter.entries())} />
    </div>
  );
}

export default HocBongPage;
