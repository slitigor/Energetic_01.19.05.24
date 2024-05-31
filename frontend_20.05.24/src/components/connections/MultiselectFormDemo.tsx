import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";

const MultiselectFormDemo = () => {
  const [deviceList, getAllDevices] = useRzaDeviceStore((state) => [
    state.deviceList,
    state.getAllDevices,
  ]);

  const FormSchema = z.object({
    deviceList: z
      .array(z.number())
      .refine((value) => value.some((device) => device), {
        message: "Выберите хотя бы одно устройство",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data.deviceList);
  };

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="deviceList"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Список УРЗА</FormLabel>
                <FormDescription>
                  Выберите хотя бы одно устройство и нажмите сохранить. Для
                  отмены жми 'ESC'
                </FormDescription>
                <ScrollArea className="h-40 w-full rounded-md border px-2">
                  {deviceList.map((device) => (
                    <FormField
                      key={device.id}
                      name="deviceList"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={device.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(device.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        device.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: number) => value !== device.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {device.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </ScrollArea>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default MultiselectFormDemo;
