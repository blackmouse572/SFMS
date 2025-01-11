import { SchoolarShipValue } from '@lib/types';

export const ContinentOptions = [
  {
    value: 'Châu Úc',
  },
  {
    value: 'Châu Âu',
  },
  {
    value: 'Châu Mỹ',
  },
  {
    value: 'Châu Á',
  },
];

export const SchoolarShipValueOptions = [
  {
    value: SchoolarShipValue['Học bổng bán phần'],
  },
  {
    value: SchoolarShipValue['Học bổng toàn phần'],
  },
];

export const LocationOptions = [
  {
    value: 'Học bổng Singapore',
  },
  {
    value: 'Học bổng Úc',
  },
  {
    value: 'Học bổng Pháp',
  },
  {
    value: 'Học bổng Trung Quốc',
  },
  {
    value: 'Học bổng Nhật Bản',
  },
  {
    value: 'Học bổng Hàn Quốc',
  },
  {
    value: 'Học bổng Đức',
  },
];

export const MajorOptions = [
  {
    value: 'Công Nghệ Thông Tin',
  },
  {
    value: 'Kinh doanh',
  },
  {
    value: 'Marketing',
  },
  {
    value: 'Thiết kế',
  },
  {
    value: 'Kỹ thuật',
  },
  {
    value: 'Giáo dục',
  },
  {
    value: 'Luật',
  },
  {
    value: 'Ngôn Ngữ Anh',
  },
  { value: 'Ngôn Ngữ Nhật' },
  { value: 'Ngôn Ngữ Hàn' },
  { value: 'Ngôn Ngữ Trung' },
  { value: 'Ngôn Ngữ Pháp' },
  { value: 'Quản Trị Kinh Doanh' },
  {
    value: 'Du Lịch',
  },
  {
    value: 'Y Học',
  },
  {
    value: 'Khách Sạn',
  },
];

export const LevelOptions = [
  {
    value: 'Đại học',
  },
  {
    value: 'Thạc sĩ',
  },
  {
    value: 'Tiến sĩ',
  },
];

export const getScholarProvShipKey = {
  list: (filter?: Record<string, any>) => ['schoolar-ship-prov', filter ?? {}],
  id: (id: string) => ['schoolar-ship-prov', id],
};
