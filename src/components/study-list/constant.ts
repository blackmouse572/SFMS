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

export const getStudyKey = {
  list: (filter?: Record<string, any>) => ['study', filter ?? {}],
  id: (id: string) => ['study', id],
};
