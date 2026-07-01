'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { getAllCourse } from '@/src/lib/actions/course.action';
import { createCoupon } from '@/src/modules/coupon/actions/coupon.action';
import { IconCancel } from '@/src/shared/components/icons';
import { Button } from '@/src/shared/components/ui/button';
import { Calendar } from '@/src/shared/components/ui/calendar';
import { Checkbox } from '@/src/shared/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/src/shared/components/ui/field';
import { Input } from '@/src/shared/components/ui/input';
import InputFormatCurrency from '@/src/shared/components/ui/input-format';
import { Label } from '@/src/shared/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/shared/components/ui/popover';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/src/shared/components/ui/radio-group';
import { Switch } from '@/src/shared/components/ui/switch';
import { couponFormSchema, couponTypes } from '@/src/shared/constants';
import { CouponType } from '@/src/types/enum';

const NewCouponForm = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [findCourse, setFindCourse] = useState<any[] | undefined>([]);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const form = useForm<z.infer<typeof couponFormSchema>>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      title: '',
      code: '',
      active: false,
      type: CouponType.PERCENT,
      value: '0',
      limit: 0,
      start_date: '',
      end_date: '',
      courses: [],
    },
  });

  const couponTypeWatch = form.watch('type');
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof couponFormSchema>) {
    try {
      const couponType = values.type;
      const couponValue = Number(values.value?.replace(/,/g, ''));

      if (
        couponType === CouponType.PERCENT &&
        couponValue &&
        (couponValue > 100 || couponValue < 0)
      ) {
        form.setError('value', {
          message: 'Giá trị không hợp lệ',
        });

        return;
      }
      const newCoupon = await createCoupon({
        ...values,
        value: couponValue,
        start_date: startDate,
        end_date: endDate,
        courses: selectedCourses.map((course) => course._id),
      });

      if (newCoupon.error) {
        toast.error(newCoupon.error);

        return;
      }
      if (newCoupon.code) {
        toast.success('Tạo mã giảm giá thành công');
        router.push('/manage/coupon');
      }
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  }
  // const couponTypeWatch = form.watch("courses");

  const handleSearchCourse = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const courseList = await getAllCourse({ search: value });

      setFindCourse(courseList?.courses);
      if (!value) setFindCourse([]);
    },
    500,
  );

  const handleSelectCourse = (checked: boolean | string, course: any) => {
    if (checked) {
      setSelectedCourses((previous) => [...previous, course]);
    } else {
      setSelectedCourses((previous) =>
        previous.filter((selectedCourse) => selectedCourse._id !== course._id),
      );
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="mt-10 mb-8 grid grid-cols-2 gap-8">
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Tiêu đề</FieldLabel>
              <Input
                placeholder="Tiêu đề"
                {...field}
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                className="font-semibold uppercase"
                placeholder="Mã giảm giá"
                {...field}
                onChange={(event) =>
                  field.onChange(event.target.value.toUpperCase())
                }
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="start_date"
          render={({ fieldState }) => (
            <Field>
              <FieldLabel>Ngày bắt đầu</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="w-full"
                    variant={'outline'}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, 'dd/MM/yyyy')
                    ) : (
                      <span>Chọn ngày bắt đầu</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-auto bg-white p-0 shadow-md"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="end_date"
          render={({ fieldState }) => (
            <Field>
              <FieldLabel>Ngày kết thúc</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="w-full"
                    variant={'outline'}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, 'dd/MM/yyyy')
                    ) : (
                      <span>Chọn ngày kết thúc</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-auto bg-white p-0 shadow-md"
                >
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                className="flex h-12 gap-5"
                defaultValue={CouponType.PERCENT}
                onValueChange={field.onChange}
              >
                {couponTypes.map((type) => (
                  <div
                    key={type.value}
                    className="flex cursor-pointer items-center space-x-2"
                  >
                    <RadioGroupItem
                      id={type.value}
                      value={type.value}
                    />
                    <Label
                      className="cursor-pointer"
                      htmlFor={type.value}
                    >
                      {type.title}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="value"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Giá trị</FieldLabel>
              <>
                {couponTypeWatch === CouponType.PERCENT ? (
                  <Input
                    placeholder="100"
                    {...field}
                    onChange={(event) => field.onChange(event.target.value)}
                  />
                ) : (
                  <InputFormatCurrency
                    {...field}
                    placeholder="100"
                    onChange={(event) => field.onChange(event.target.value)}
                  />
                )}
              </>
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="active"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Trạng thái</FieldLabel>
              <div className="flex h-12 flex-col justify-center">
                <Switch
                  checked={field.value}
                  size="lg"
                  onCheckedChange={field.onChange}
                />
              </div>
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
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
                placeholder="100"
                type="number"
                {...field}
                onChange={(event) => field.onChange(event.target.valueAsNumber)}
              />
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="courses"
          render={({ fieldState }) => (
            <Field>
              <FieldLabel>Khóa học</FieldLabel>
              <Input
                placeholder="Tìm kiếm khóa học ..."
                onChange={handleSearchCourse}
              />
              {!!findCourse && findCourse.length > 0 && (
                <div className="mt-5! flex flex-col gap-2">
                  {findCourse?.map((course) => (
                    <Label
                      key={course.title}
                      className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                      htmlFor={course.title}
                    >
                      <Checkbox
                        className="shirk-0 size-3.5 text-slate-400"
                        id={course.title}
                        checked={selectedCourses.some(
                          (element) => element._id === course._id,
                        )}
                        onCheckedChange={(checked) =>
                          handleSelectCourse(checked, course)
                        }
                      />
                      <span>{course.title}</span>
                    </Label>
                  ))}
                </div>
              )}
              {selectedCourses.length > 0 && (
                <div className="mt-5! flex flex-wrap items-start gap-2">
                  {selectedCourses?.map((course) => (
                    <div
                      key={course.title}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-400 bg-white px-3 py-1 text-sm font-medium"
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
              {!!fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>
      <Button
        className="ml-auto flex w-37.5"
        variant="primary"
      >
        Tạo mã
      </Button>
    </form>
  );
};

export default NewCouponForm;
