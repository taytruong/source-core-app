"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { ECouponType } from "@/src/types/enum";
import { couponTypes } from "@/src/constanst";
import { format } from "date-fns";
import { createCoupon } from "@/src/lib/actions/coupon.action";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const formSchema = z.object({
  title: z
    .string({ message: "Tiêu đề không được để trống" })
    .min(3, "Tiêu đề phải có ít nhất 3 ký tự"),
  code: z
    .string({ message: "Mã giảm giá không được để trống" })
    .min(3, "Mã giảm giá phải có ít nhất 3 ký tự")
    .max(10, "Mã giảm giá không được quá 10 ký tự"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  active: z.boolean().optional(),
  value: z.number().optional(),
  type: z.string().optional(),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});
const UpdateCouponForm = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newCoupon = await createCoupon(values);
      if (newCoupon.code) {
        toast.success("Tạo mã giảm giá thành công");
        redirect("/manage/coupon");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  }
  const couponTypeWatch = form.watch("type");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
      <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Tiêu đề</FieldLabel>
              <Input placeholder="Tiêu đề" {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="code"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Code</FieldLabel>
              <Input
                placeholder="Mã giảm giá"
                {...field}
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="startDate"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Ngày bắt đầu</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className="w-full">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "dd/MM/yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white shadow-md"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="endDate"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Ngày kết thúc</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className="w-full">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "dd/MM/yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white shadow-md"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="type"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Loại coupon</FieldLabel>
              <RadioGroup
                defaultValue={ECouponType.PERCENT}
                className="flex gap-5"
                onValueChange={field.onChange}
              >
                {couponTypes.map((type) => (
                  <div className="flex items-center space-x-2" key={type.value}>
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label htmlFor={type.value}>{type.title}</Label>
                  </div>
                ))}
              </RadioGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="value"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Giá trị</FieldLabel>
              <Input
                type="number"
                placeholder="20%"
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="active"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Trạng thái</FieldLabel>
              <div>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  size="lg"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="limit"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Số lượng tối đa</FieldLabel>
              <Input
                type="number"
                placeholder="25"
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="courses"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Khóa học</FieldLabel>
              <Input placeholder="Tìm kiếm khóa học ..." />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Button variant="primary" className="w-37.5 ml-auto flex">
        Cập nhật
      </Button>
    </form>
  );
};

export default UpdateCouponForm;
