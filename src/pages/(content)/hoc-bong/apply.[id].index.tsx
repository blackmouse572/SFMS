import Badge from '@components/tailus-ui/Badge';
import Button from '@components/tailus-ui/Button';
import Card from '@components/tailus-ui/Card';
import { Caption, Display, Text, Title } from '@components/tailus-ui/typography';
import UploadCVForm from '@components/upload-cv/UploadCvForm';
import { SchoolarShip } from '@lib/types';
import { IconBulb, IconCircleCheckFilled, IconSparkles } from '@tabler/icons-react';
import { useLoaderData } from 'react-router-dom';
const WHY_DATA = [
  'Bạn còn có cơ hội nhận được các phần quà giá trị từ quỹ học bổng của công ty tu vấn SFMS.',
  'Quy trình làm việc minh bạch, luôn tôn trọng và đặt lợi ích của khách hàng lên hàng đầu',
  'Đội ngũ chuyên viên tư vấn chuyên môn cao, xây dựng lộ trình giáo dục tốt nhất, tận tình giải đáp 24/7',
  'Hướng dẫn làm hồ sơ chứng minh tài chính, xin visa với tỷ lệ đạt cao, săn học bổng giá trị lên đến 100%',
  'Cung cấp dịch vụ luyện tập phỏng vấn và chứng chỉ được thu thập từ các nguồn uy tín trên thế giới .',
  'Giữ kết nối, chăm sóc và hỗ trợ học sinh trước khi bay, trong khi bay và sau khi bay',
];
const FEATURE_DATA = [
  {
    img: '/images/element05.svg',
    title: 'Đội ngũ tư vấn chuyên nghiệp, tận tâm',
  },
  {
    img: '/images/element06.svg',
    title: 'Chương trình học bổng phù hợp',
  },
  {
    img: '/images/element07.svg',
    title: 'Đối tác của hơn 1.000+ trường trên thế giới',
  },
  {
    img: '/images/element08.svg',
    title: 'Cập nhật học bổng mới nhất liên tục ',
  },
];
const STEP_DATA = [
  {
    img: '/images/step1.svg',
    title: 'Phí hoàn thành hồ sơ',
  },
  {
    img: '/images/step2.svg',
    title: 'Giao Staff xử lý',
  },
  {
    img: '/images/step3.svg',
    title: 'Sửa hồ sơ',
  },
  {
    img: '/images/step4.svg',
    title: 'Hoàn thành hồ sơ',
  },
  {
    img: '/images/step5.svg',
    title: 'Nhận kết quả',
  },
];
const PROFIT_DATA = [
  'Được tư vấn miễn phí về học bổng và du học.',

  'Staff sửa hồ sơ cho ứng viên cho đến khi hoàn hảo. ',

  'Được SFMS hỗ trợ nộp hồ sơ xin học bổng .',

  'Được làm các bài kiểm tra luyện tập để thi chứng chỉ cũng như những câu hỏi phỏng vấn .',
];
function ApplyScholarship() {
  const scholarship = useLoaderData() as SchoolarShip;

  return (
    <div>
      <section className={'bg-gradient-to-b from-blue-900 via-blue-800 to to-blue-500 min-h-[60vh] flex items-center justify-center flex-col gap-8'}>
        <div className="flex items-end gap-3 z-10">
          <Display className="text-white" size="6xl" weight={{ initial: 'semibold' }}>
            Nền tảng Tìm Kiếm
          </Display>
          <img src="/images/element01.png" alt="apply-scholarship" className="w-32" height={8} />
        </div>
        <div className="flex items-center gap-3 ml-20 z-10">
          <img src="/images/logo.jpg" alt="apply-scholarship" className="w-32" height={8} />
          <Display className="text-white" size="6xl" weight={{ initial: 'semibold' }}>
            Du học & Học bổng
          </Display>
        </div>
        <span className="relative w-full flex items-center justify-center">
          <Button.Root variant="soft" className="rounded-full font-medium shadow shadow-primary-200 z-10" size="lg" href="#apply-scholarship">
            <Button.Label>NỘP HỒ SƠ NGAY</Button.Label>
          </Button.Root>
          <img
            src="/images/element02.png"
            alt="arrow-down"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full opacity-20"
          />
        </span>
      </section>
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
      <section className="bg-primary-800 flex gap-5 py-8 px-4" id="apply-scholarship">
        <img src="/images/element09.png" alt="apply-scholarship" className="flex-shrink-0 aspect-square" />
        <Card fancy className="flex-1 flex flex-col gap-4">
          <div className="">
            <div className="flex flex-col items-center gap-4 text-center">
              <Title>Phí hoàn thành hồ sơ</Title>
              <Title>3.000.000 VND</Title>
              <Caption>
                <span className="line-through">4.000.000 VND</span>
                <Badge className="ml-2 decoration-current inline" color="red">
                  -25%
                </Badge>
              </Caption>
            </div>
            <div>
              <Text weight={{ initial: 'bold' }}>Quyền lợi:</Text>
              <ul className="space-y-2">
                {PROFIT_DATA.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <IconCircleCheckFilled className="text-yellow-500" />
                    <Text>{item}</Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <UploadCVForm className="h-full flex flex-col justify-between" scholarship={scholarship} />
        </Card>
      </section>
    </div>
  );
}

export default ApplyScholarship;
