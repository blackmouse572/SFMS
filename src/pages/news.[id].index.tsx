import { useBreadcrumb } from '@components/admin-breadcrumb/AdminBreadcrumb';
import { Caption, Display } from '@components/tailus-ui/typography';
import { useEffectOnce } from '@hooks/useEffectOnce';
import axios from '@lib/axios';
import { IResponse, News } from '@lib/types';
import { Interweave } from 'interweave';
import { useLoaderData } from 'react-router-dom';
export async function loader({ params }: { params: { id: string } }) {
  const res = await axios.get<IResponse<News>>(`/news/${params.id}`);
  return res.data.data;
}
function NewsPage() {
  const data = useLoaderData() as News;
  const { setItems } = useBreadcrumb();
  useEffectOnce(() => {
    setItems([
      {
        title: 'Tin tức',
        href: '/news',
      },
      {
        title: data.title,
        href: `/news/${data._id}`,
      },
    ]);
  });
  return (
    <div className="grid grid-cols-[1fr_0.3fr] gap-16">
      <section className="space-y-8 py-6">
        <div className="space-y-4">
          <Display size="5xl">{data?.title}</Display>
          <Caption>{data?.label}</Caption>
        </div>
        <div className="prose prose-xl">
          <Interweave content={data?.description} />
        </div>
      </section>
    </div>
  );
}

export default NewsPage;
