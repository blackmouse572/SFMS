import AdvisorContactDialog from '@components/AdvisorContactDialog';
import { FocusCard } from '@components/FocusCard';
import { Navbar } from '@components/MainNavbar';
import { ChatPopover } from '@components/messages';
import { OpenProvider } from '@components/messages/useOpenProvider';
import { useProviderList } from '@components/provider-list';
import { SecondaryNavbar } from '@components/SecondaryNavbar';
import { Skeleton } from '@components/Skeleton';
import Card from '@components/tailus-ui/Card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/tailus-ui/Carosel';
import InfiniteScroll from '@components/tailus-ui/InfiniteScroll';
import SeparatorRoot from '@components/tailus-ui/Separator';
import { AdminAvatar } from '@components/user-nav';
import { useIsAuthenticated } from '@lib/auth';
import axios from '@lib/axios';
import { IPagedResponse, News } from '@lib/types';
import { cn } from '@lib/utils';
import { FEATURE_DATA, REVIEW_DATA, STEP_DATA, WHY_DATA } from '@pages/(content)/hoc-bong/constant';
import { IconAward, IconBriefcase, IconBulb, IconSchool, IconSparkles, IconStarFilled, IconWorld } from '@tabler/icons-react';
import { Caption, Display, Text, Title } from '@tailus-ui/typography';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const isAuth = useIsAuthenticated();
  return (
    <main>
      <SecondaryNavbar className="" />
      <Navbar className="px-8 min-h-16 border-b shadow-lg" />
      <div className="snap-mandatory snap-y">
        <HeaderSection className="" />
        <StatsSection className="" />
        <AdvisorSection className="" />
        <NewsSection />
        <section className="py-8 space-y-8 relative overflow-clip">
          <div className="uppercase flex items-center justify-center gap-4 z-10">
            <div className="">
              <Title weight={{ initial: 'bold' }} className="text-primary-800" size="xl">
                Tại sao nên chọn
              </Title>
              <Title weight={{ initial: 'bold' }} className="text-primary-800" size="3xl">
                DU HỌC TẠI SFMS
              </Title>
            </div>
            <Display weight={{ initial: 'bold' }} className="text-primary-800" size="7xl">
              ?
            </Display>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-screen-xl mx-auto z-10">
            {WHY_DATA.map((item) => (
              <Card className="rounded-full flex items-center gap-4 bg-white" key={item}>
                <div className="bg-primary-800 text-white w-full h-full rounded-full aspect-square flex items-center justify-center max-w-16">
                  <IconBulb className="size-10" />
                </div>
                <Text className="text-sm text-pretty">{item}</Text>
              </Card>
            ))}
          </div>
          <img src="/images/element03.png" alt="apply-scholarship" className="-z-10 absolute w-full inset-0 scale-125 -top-32" />
        </section>
        <section
          style={{
            background: 'url(/images/element04.png) no-repeat center center',
          }}
          className=""
        >
          <div className="flex items-center justify-between bg-primary-800 bg-opacity-90 px-5 py-8">
            {FEATURE_DATA.map((item) => (
              <div className="flex items-center flex-col">
                <img src={item.img} alt="feature" className="w-16" />
                <Text className="text-white text-wrap max-w-[20ch] text-center">{item.title}</Text>
              </div>
            ))}
          </div>
        </section>
        <section className="py-8">
          <Display className="text-center text-primary-900 max-w-6xl mx-auto" weight={{ initial: 'normal' }} size="4xl">
            Lộ trình <span className="text-primary-500">đăng ký du học tại SFMS</span> tinh gọn,
            <span>
              <IconSparkles className="inline-block size-16 text-yellow-500" />
            </span>
            <br />
            quy trình xử lý hồ sơ <span className="text-primary-500">nhanh chóng, đơn giản</span>
          </Display>
          <div className="flex items-center justify-between relative">
            {STEP_DATA.map((item, index) => (
              <div className="flex flex-col items-center py-4 z-10" key={item.title}>
                <div className="bg-primary-800 text-white size-20 rounded-full flex items-center justify-center">
                  <img src={item.img} alt="step" className="w-10" />
                </div>
                <Text size={'lg'}>Bước {index + 1}</Text>
                <Text className="text-primary-900">{item.title}</Text>
              </div>
            ))}
            <div className="absolute top-[38%] right-12 left-12 -translate-x-1.2 border border-dashed border-primary-200"></div>
          </div>
        </section>
        <section className="bg-primary-800 py-8">
          <div className="w-fit mx-auto space-y-2">
            <Display className="text-center uppercase text-white max-w-6xl mx-auto" weight={{ initial: 'bold' }} size="4xl">
              KHÔNG NGỪNG HOÀN THIỆN vì bạn
            </Display>
            <SeparatorRoot className="bg-orange-500" />
            <Text size="xl" className="text-white">
              Đem đến trải nghiệm đăng ký du học và được tư vấn bởi nhân viên được tối ưu nhất
            </Text>
          </div>
          <div className="flex gap-2 snap-mandatory overflow-x-auto py-8 w-full snap-x px-4">
            {REVIEW_DATA.map((item) => (
              <Card key={item.content} className="min-w-[33%] space-y-2">
                <div className="flex items-center gap-4 snap-center">
                  <img src={item.avatar} className="w-16 h-16 rounded-full" alt={item.name} />
                  <Caption>{item.content}</Caption>
                </div>
                <SeparatorRoot />
                <div className="flex items-center gap-2 justify-between">
                  <div>
                    <Text weight={{ initial: 'bold' }}>{item.name}</Text>
                    <Caption size="xs">{item.university}</Caption>
                  </div>
                  <div className="flex">
                    <IconStarFilled className="text-yellow-500" />
                    <IconStarFilled className="text-yellow-500" />
                    <IconStarFilled className="text-yellow-500" />
                    <IconStarFilled className="text-yellow-500" />
                    <IconStarFilled className="text-yellow-500" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="w-fit mx-auto">
            <AdvisorContactDialog />
          </div>
        </section>
        <ConnetSchoolSection className="" />
        <OpenProvider>{isAuth && <ChatPopover />}</OpenProvider>
      </div>
    </main>
  );
}
const headerItems = [
  {
    src: './images/ld/01.png',
    alt: 'Hoc bong du hoc My',
  },
  {
    src: './images/ld/02.jpeg',
    alt: 'Hoc bong du hoc My',
  },
  {
    src: './images/ld/03.jpeg',
    alt: 'Hoc bong du hoc My',
  },
];
function HeaderSection(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section id="header" {...props}>
      <Carousel
        className="px-2 mx-auto lg:max-w-screen-2xl"
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent className="h-[25vh] md:h-[40vh] lg:h-[60vh] w-full mx-auto">
          {headerItems.map((i) => (
            <CarouselItem key={i.alt}>
              <img className="w-full h-full object-cover mx-auto" src={i.src} alt={i.alt} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>
    </section>
  );
}

const statsItems = [
  {
    icon: <IconSchool />,
    stats: '900+',
    title: 'Trường đối tác',
  },
  {
    icon: <IconBriefcase />,
    stats: '1200+',
    title: 'Hồ sơ thành công',
  },
  {
    icon: <IconAward />,
    stats: '15+',
    title: 'Năm kinh nghiệm',
  },
  {
    icon: <IconWorld />,
    stats: '12+',
    title: 'Quốc gia du học',
  },
];

function StatsSection(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section id="header" {...props} className={cn('grid grid-cols-2 md:grid-cols-4 bg-soft-bg divide-x-2')}>
      {statsItems.map((i) => (
        <div
          key={i.title}
          className="flex flex-col items-center justify-center space-y-3 p-4 hover:bg-stone-50 hover:text-accent-500 group cursor-default [&_svg]:size-10 transition-colors"
        >
          {i.icon}
          <Title size="xl" weight="medium" className="group-hover:text-accent-580">
            {i.stats}
          </Title>
          <Text className="group-hover:text-accent-800">{i.title}</Text>
        </div>
      ))}
    </section>
  );
}
const advisorItems = [
  {
    src: './images/ld/usa.jpg',
    alt: 'Hoc bong du hoc My',
    title: 'Du học Mỹ',
    countryCode: 'US',
  },
  {
    src: './images/ld/canada_01.jpg',
    alt: 'Hoc bong du hoc Canada',
    title: 'Du học Canada',
    countryCode: 'CA',
  },
  {
    src: './images/ld/china.jpg',
    alt: 'Hoc bong du hoc Trung Quốc',
    title: 'Du học Trung Quốc',
    countryCode: 'CN',
  },
  {
    src: './images/ld/england.jpg',
    alt: 'Hoc bong du hoc Anh',
    title: 'Du học Anh',
    countryCode: 'GB',
  },
  {
    src: './images/ld/korea.jpg',
    alt: 'Hoc bong du hoc Han Quoc',
    title: 'Du học Hàn Quốc',
    countryCode: 'HK',
  },
  {
    src: './images/ld/brazil.jpg',
    alt: 'Hoc bong du hoc Brazil',
    title: 'Du học Brazil',
    countryCode: 'BR',
  },
];

function AdvisorSection(props: React.HTMLAttributes<HTMLDivElement>) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { isLoading, data } = useProviderList({ filter: { limit: 6 } });
  const items = data?.pages?.map((p) => p.data.result).flat() ?? [];
  return (
    <section id="header" {...props} className={cn('mt-8 space-y-4')}>
      <Display size="4xl" className="text-center">
        Đối tác cung cấp học bổng
      </Display>
      <div className="grid grid-cols-2 md:grid-cols-3 divide-x-2 gap-4 p-5">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Card>
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </Card>
          ))}
        {items?.map((card, index) => (
          <FocusCard
            style={{
              backgroundImage: `url(${card.background})`,
            }}
            key={card.name}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          >
            <div className="flex items-center justify-center gap-4 translate-y-[120px] group-hover:translate-y-0 transition-all duration-300 ease-in">
              {/* <ReactCountryFlag className="!size-8" countryCode={card.countryCode} svg /> */}
              <AdminAvatar size="lg" src={card.logo} />
              <Text size="xl" className="text-center text-white">
                {card.name}
              </Text>
            </div>
          </FocusCard>
        ))}
      </div>
    </section>
  );
}

const connetSchoolItems = [
  {
    id: 'amity',
    src: './images/ld/amity-u.jpg',
    alt: 'Amity University',
    title: 'Amity University',
  },
  {
    id: 'arizona',
    src: './images/ld/arizona-u.jpg',
    alt: 'Arizona University',
    title: 'Arizona University',
  },
  {
    id: 'trent',
    src: './images/ld/trent-u.png',
    alt: 'Trent University',
    title: 'Trent University',
  },
  {
    id: 'uis',
    src: './images/ld/uis-u.jpg',
    alt: 'University of Illinois at Urbana-Champaign',
    title: 'University of Illinois at Urbana-Champaign',
  },
];

function ConnetSchoolSection(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section id="header" {...props} className={cn('mt-8 space-y-4')}>
      <Display size="4xl" className="text-center">
        Cộng đồng
      </Display>
      <InfiniteScroll
        items={connetSchoolItems}
        renderItem={(item) => (
          <div>
            <img loading="lazy" src={item.src} alt={item.alt} className="w-full h-full object-cover" />
          </div>
        )}
      />
    </section>
  );
}

function NewsSection(props: React.HTMLAttributes<HTMLDivElement>) {
  const { isLoading, data } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const res = await axios.get<IPagedResponse<News>>('/news');
      return res.data.data.result;
    },
  });
  return (
    <section id="news" {...props} className={cn('mt-8 space-y-4')}>
      <Display size="4xl" className="">
        Tin tức
      </Display>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {isLoading && (
          <Card>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </Card>
        )}
        {data &&
          data.map((news) => (
            <Link key={news._id} to={`/news/${news._id}`} className="flex flex-col items-center justify-center p-4">
              <Card key={news._id} className="flex flex-col items-center justify-center p-4">
                <img
                  src={
                    news.heroImage?.length > 0
                      ? news.heroImage
                      : `https://dynamic-og-image-generator.vercel.app/api/generate?title=${news.title}&author=SFMS&websiteUrl=https%3A%2F%2Fsfms.pages.dev%2F&avatar=https%3A%2F%2Fsfms.pages.dev%2Fimages%2Flogo.jpg&theme=dracula`
                  }
                  alt={news.title}
                  className="w-full h-42 aspect-video object-cover"
                />
                <Text size="lg" className="mt-4 line-clamp-2">
                  {news.title}
                </Text>
              </Card>
            </Link>
          ))}
      </div>
    </section>
  );
}

export default App;
