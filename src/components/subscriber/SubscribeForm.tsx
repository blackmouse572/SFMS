import { SchoolarShipValueOptions } from '@components/schoolar-list/constant';
import { ListLevel, LocationLevel, MajorLevel } from '@components/schoolar-list/SearchBar';
import { SubcribeSchema } from '@components/subscriber/SubscribeDialog';
import { Form, InputForm, SelectForm, SelectItem } from '@components/tailus-ui/form';
import { useUser } from '@lib/auth';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

type SubcribeFormProps = {
  onSubmit: (data: SubcribeSchema) => void;
  defaultValues?: Partial<SubcribeSchema>;
  form: UseFormReturn<SubcribeSchema>;
};
function SubcribeForm({ onSubmit, form, defaultValues }: SubcribeFormProps) {
  const user = useUser();

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  return (
    <Form {...form}>
      <form
        id={'subscribe-form'}
        className="mt-4 space-y-4"
        onSubmit={form.handleSubmit(onSubmit, (e) => {
          Object.values(e).forEach((error) => {
            toast.error(error.message);
          });
        })}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputForm control={form.control} name="email" label="Email" value={user?.email} disabled />
          <InputForm control={form.control} name="name" label="Tên" value={user?.name} disabled />
        </div>
        <ListLevel name="level" control={form.control} />
        <MajorLevel name="major" control={form.control} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputForm name="ielts" control={form.control} label="Điểm IELTS" type="number" min="0" max="9" />
          <InputForm name="GPA" control={form.control} label="Điểm GPA" type="number" min="0" max="4" />
        </div>
        <InputForm name="pay" control={form.control} label="Sinh hoạt phí mà bạn chi trả trong 1 tháng ($)" type="number" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <LocationLevel name="location" control={form.control} />
          <SelectForm control={form.control} name="value" label="Loại học bổng" required>
            {SchoolarShipValueOptions.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.value}
              </SelectItem>
            ))}
          </SelectForm>
        </div>
      </form>
    </Form>
  );
}

// export function LocationLevel({ name, control }: SearchCompProps) {
//   const { isLoading, data } = useQuery({
//     queryKey: ['scholarships', 'location'],
//     queryFn: async () => axios.get<IResponse<{ location: string[] }>>('/scholarship/list-country').then((res) => res.data.data),
//   });
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Vị trí</FormLabel>
//           <Popover.Root modal>
//             <Popover.Trigger asChild>
//               <Button.Root
//                 variant="outlined"
//                 role="combobox"
//                 intent="gray"
//                 className={cn(
//                   field.value && 'text-caption',
//                   'w-full text-start justify-between text-sm [&>span]:text-ellipsis [&>span]:overflow-hidden [&>span]:text-nowrap [&>span]:max-w-full'
//                 )}
//               >
//                 <Button.Label>{field.value ? data?.location.find((o) => o === field.value) : 'Chọn vị trí'}</Button.Label>
//                 <Button.Icon type="trailing">
//                   <IconCaretDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                 </Button.Icon>
//               </Button.Root>
//             </Popover.Trigger>
//             <Popover.Portal>
//               <Popover.Content fancy className={cn('max-w-xs z-[13] p-0 relative w-[320px]')}>
//                 <Command
//                   className="w-full"
//                   shouldFilter={false}
//                   onValueChange={(v) => {
//                     field.onChange(v);
//                   }}
//                 >
//                   <CommandInput placeholder="" className="h-9" />
//                   <CommandList>
//                     <CommandEmpty>"Không có dữ liệu"</CommandEmpty>
//                     <CommandGroup>
//                       {data?.location?.map((language) => (
//                         <CommandItem
//                           value={language}
//                           key={language}
//                           onSelect={() => {
//                             field.onChange(language);
//                           }}
//                         >
//                           {language}
//                           <IconCheck className={cn('ml-auto h-4 w-4', language === field.value ? 'opacity-100' : 'opacity-0')} />
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </Popover.Content>
//             </Popover.Portal>
//           </Popover.Root>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }
export default SubcribeForm;
