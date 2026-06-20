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
import { useEffect, useState } from "react";
import { ECouponType } from "@/src/types/enum";
import { couponFormSchema, couponTypes } from "@/src/constanst";
import { format } from "date-fns";
import { updateCoupon } from "@/src/lib/actions/coupon.action";
import { toast } from "sonner";
import InputFormatCurrency from "@/components/ui/input-format";
import { TCouponParams } from "@/src/types";
import { debounce } from "lodash";
import { getAllCourse } from "@/src/lib/actions/course.action";
import { Checkbox } from "@/components/ui/checkbox";
import { IconCancel } from "@/src/components/icons";

const UpdateCouponForm = ({ data }: { data: TCouponParams }) => {
  const [findCourse, setFindCourse] = useState<any[] | undefined>([]);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date>(
    data.start_date || new Date(),
  );
  const [endDate, setEndDate] = useState<Date>(data.end_date || new Date());
  const form = useForm<z.infer<typeof couponFormSchema>>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      title: data.title,
      code: data.code,
      active: data.active,
      value: data.value.toString(),
      limit: data.limit,
      type: data.type,
    },
  });

  useEffect(() => {
    if (data.courses) {
      setSelectedCourses(data.courses);
    }
  }, [data.courses]);

  async function onSubmit(values: z.infer<typeof couponFormSchema>) {
    try {
      const couponType = values.type;
      const couponValue = Number(values.value?.replace(/,/g, ""));
      if (
        couponType === ECouponType.PERCENT &&
        couponValue &&
        (couponValue > 100 || couponValue < 0)
      ) {
        form.setError("value", {
          message: "Giá trị không hợp lệ",
        });
        return;
      }
      const updatedCoupon = await updateCoupon({
        _id: data._id.toString(),
        updateData: {
          ...values,
          value: couponValue,
          start_date: startDate,
          end_date: endDate,
          courses: selectedCourses,
        },
      });
      if (updatedCoupon.code) {
        toast.success("Cập nhật mã (coupon) giảm giá thành công");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  }
  const handleSearchCourse = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const courseList = await getAllCourse({ search: value });
      setFindCourse(courseList);
      if (!value) setFindCourse([]);
    },
    500,
  );

  const handleSelectCourse = (checked: boolean | string, course: any) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, course]);
    } else {
      setSelectedCourses((prev) =>
        prev.filter((selectedCourse) => selectedCourse._id !== course._id),
      );
    }
  };

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
                className="font-semibold uppercase"
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                disabled
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="start_date"
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
                      <span>Chọn ngày bắt đầu</span>
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
                    onSelect={setStartDate as any}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="end_date"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Chọn ngày kết thúc</FieldLabel>
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
                    onSelect={setEndDate as any}
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
                value={field.value}
                className="flex gap-5 h-12"
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
          render={({ field, fieldState }) => {
            return (
              <Field>
                <FieldLabel>Giá trị</FieldLabel>
                <>
                  {couponTypeWatch === ECouponType.PERCENT ? (
                    <Input
                      placeholder="100"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  ) : (
                    <InputFormatCurrency
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="100"
                    />
                  )}
                </>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
        <Controller
          control={form.control}
          name="active"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Trạng thái</FieldLabel>
              <div className="flex flex-col justify-center h-12">
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
                placeholder="100"
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
              <Input
                placeholder="Tìm kiếm khóa học ..."
                onChange={handleSearchCourse}
              />
              {findCourse && findCourse.length > 0 && (
                <div className="flex flex-col gap-2 mt-5!">
                  {findCourse?.map((course) => (
                    <Label
                      key={course.title}
                      className="flex items-center gap-2 font-medium text-sm cursor-pointer"
                      htmlFor={course.title}
                    >
                      <Checkbox
                        id={course.title}
                        className="shirk-0 size-3.5 text-slate-400"
                        onCheckedChange={(checked) =>
                          handleSelectCourse(checked, course)
                        }
                        checked={selectedCourses.some(
                          (el) => el._id === course._id,
                        )}
                      />
                      <span>{course.title}</span>
                    </Label>
                  ))}
                </div>
              )}
              {selectedCourses.length > 0 && (
                <div className="flex items-start flex-wrap gap-2 mt-5!">
                  {selectedCourses?.map((course) => (
                    <div
                      key={course.title}
                      className="inline-flex items-center gap-2 font-medium text-sm px-3 py-1 rounded-lg border border-slate-400 bg-white"
                    >
                      <span>{course.title}</span>
                      <button
                        type="button"
                        onClick={() => handleSelectCourse(false, course)}
                      >
                        <IconCancel className="size-5 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
