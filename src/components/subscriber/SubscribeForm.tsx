import { SchoolarShipValueOptions } from '@components/schoolar-list/constant';
import { LocationLevel } from '@components/schoolar-list/SearchBar';
import { SubcribeSchema } from '@components/subscriber/SubscribeDialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, InputForm, SelectForm, SelectItem } from '@components/tailus-ui/form';
import { useUser } from '@lib/auth';
import { TagInput } from 'emblor';
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
        <FormField
          control={form.control}
          name={'level'}
          defaultValue={[] as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Cấp
                <span className="text-danger-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <TagInput
                  styleClasses={{
                    input: 'placeholder:text-caption rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:border-0 focus:outline-none',
                    inlineTagsContainer: '!rounded-btn focus:ring-0 focus-visible:ring-0 focus-visible:border-0 focus:outline-none',
                    tagList: {
                      container: 'border-red-500',
                    },
                    tag: {
                      body: '!rounded-card bg-soft-bg',
                    },
                  }}
                  activeTagIndex={null}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  setActiveTagIndex={() => {}}
                  tags={field.value?.map((v) => ({ id: v, text: v }))}
                  setTags={(newTags) => {
                    const value = (newTags as any).map((tag: Record<string, any>) => tag.text);
                    field.onChange(value);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'major'}
          defaultValue={[] as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Ngành học
                <span className="text-danger-500 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <TagInput
                  styleClasses={{
                    input: 'placeholder:text-caption rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:border-0 focus:outline-none',
                    inlineTagsContainer: '!rounded-btn focus:ring-0 focus-visible:ring-0 focus-visible:border-0 focus:outline-none',
                    tagList: {
                      container: 'border-red-500',
                    },
                    tag: {
                      body: '!rounded-card bg-soft-bg',
                    },
                  }}
                  activeTagIndex={null}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  setActiveTagIndex={() => {}}
                  tags={field.value?.map((v) => ({ id: v, text: v }))}
                  setTags={(newTags) => {
                    const value = (newTags as any).map((tag: Record<string, any>) => tag.text);
                    field.onChange(value);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
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

export default SubcribeForm;
