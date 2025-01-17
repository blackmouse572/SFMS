import { SchoolarShipValueOptions } from '@components/schoolar-list/constant';
import { Skeleton } from '@components/Skeleton';
import Button from '@components/tailus-ui/Button';
import Card from '@components/tailus-ui/Card';
import { Form, InputForm, SelectForm, SelectItem } from '@components/tailus-ui/form';
import axios from '@lib/axios';
import { IResponse } from '@lib/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SchoolarShipsSearch = z.object({
  level: z.string(),
  major: z.string(),
  location: z.string(),
  gpa: z.number().min(0).max(4),
  ielts: z.number().min(0).max(9),
  pay: z.number().min(0),
  value: z.enum(['Học bổng toàn phần', 'Học bổng bán phần']).optional(),
});
export type SchoolarShipSearch = z.infer<typeof SchoolarShipsSearch>;

export type SearchBarProps = {
  onSearch: (value: SchoolarShipSearch) => void;
  defaultValues?: Partial<SchoolarShipSearch>;
};

function SearchBar(props: SearchBarProps) {
  const form = useForm<SchoolarShipSearch>({
    defaultValues: props.defaultValues ?? {
      level: '',
      location: '',
      gpa: 0,
      ielts: 0,
      pay: 0,
      major: '',
      value: 'Học bổng toàn phần',
    },
  });

  useEffect(() => {
    form.reset(props.defaultValues);
  }, [props.defaultValues]);

  return (
    <Form {...form}>
      <Card variant="soft" className="space-y-4">
        <form
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          id="filter"
          onSubmit={form.handleSubmit((data) => {
            props.onSearch(data);
          })}
        >
          <ListLevel name="level" control={form.control} />
          <LocationLevel name="location" control={form.control} />
          <MajorLevel name="major" control={form.control} />
          <InputForm control={form.control} name="ielts" step=".01" label="Điểm IELTS" type="number" min="0" max="9" />
          <InputForm control={form.control} name="pay" label="Sinh hoạt phí mà bạn chi trả trong 1 tháng ($)" type="number" />
          <InputForm control={form.control} name="GPA" step=".01" label="Điểm GPA" type="number" min="0" max="4" />
          <SelectForm control={form.control} name="value" label="Loại học bổng">
            {SchoolarShipValueOptions.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.value}
              </SelectItem>
            ))}
          </SelectForm>
        </form>
        <div className="flex gap-4 justify-end">
          <Button.Root
            type="reset"
            onClick={() =>
              form.reset({
                level: '',
                location: '',
                gpa: 0,
                ielts: 0,
                pay: 0,
              })
            }
            variant="outlined"
            intent="gray"
            className="bg-white"
          >
            <Button.Label>Làm mới</Button.Label>
          </Button.Root>
          <Button.Root type="submit" form="filter">
            <Button.Label>Tìm kiếm</Button.Label>
          </Button.Root>
        </div>
      </Card>
    </Form>
  );
}
export type SearchCompProps = {
  name: string;
  control: any;
};
export function ListLevel({ name, control }: SearchCompProps) {
  const { isLoading, data } = useQuery({
    queryKey: ['scholarships', 'level'],
    queryFn: async () => axios.get<IResponse<{ level: string[] }>>('/scholarship/list-level').then((res) => res.data.data),
  });
  return (
    <SelectForm control={control} name={name} label="Trình độ">
      {isLoading && (
        <>
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </>
      )}
      {data &&
        data.level.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
    </SelectForm>
  );
}
export function LocationLevel({ name, control }: SearchCompProps) {
  const { isLoading, data } = useQuery({
    queryKey: ['scholarships', 'location'],
    queryFn: async () => axios.get<IResponse<{ location: string[] }>>('/scholarship/list-country').then((res) => res.data.data),
  });
  return (
    <SelectForm control={control} name={name} label="Vị trí">
      {isLoading && (
        <>
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </>
      )}
      {data &&
        data.location.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
    </SelectForm>
  );
}
export function MajorLevel({ name, control }: SearchCompProps) {
  const { isLoading, data } = useQuery({
    queryKey: ['scholarships', 'major'],
    queryFn: async () => axios.get<IResponse<{ major: string[] }>>('/scholarship/list-major').then((res) => res.data.data),
  });
  return (
    <SelectForm control={control} name={name} label="Ngành học">
      {isLoading && (
        <>
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </>
      )}
      {data &&
        data.major.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
    </SelectForm>
  );
}

export default SearchBar;
