import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FormAddDeviceSchema = z.object({
  devId: z.number(),
});

export function ConnectionForm() {
  const form = useForm<z.infer<typeof FormAddDeviceSchema>>({
    resolver: zodResolver(FormAddDeviceSchema),
  });

  function onSubmit(values: z.infer<typeof FormAddDeviceSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="devId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Устройство РЗА</FormLabel>
              <FormControl>
                <Input placeholder="Выбор устройства" {...field} />
              </FormControl>
              <FormDescription>Выбор списка установленных УРЗА</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  );
}
