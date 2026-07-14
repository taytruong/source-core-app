'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateCoupon } from '@/src/modules/coupon/actions/coupon.action';
import { fetchCourse } from '@/src/modules/course/actions';
import { CourseItemData } from '@/src/modules/course/types';
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
import { CouponType, couponTypes } from '@/src/shared/constants';
import { CouponItemData } from '@/src/shared/types';

import { couponCreateSchema } from '../../../schemas';
import { CouponCreateFormValues } from '../../../types';

export interface UpdateCouponContainerProps {
  couponDetails: CouponItemData;
}

const UpdateCouponContainer = ({
  couponDetails,
}: UpdateCouponContainerProps) => {
  const [findCourse, setFindCourse] = useState<CourseItemData[] | undefined>(
    [],
  );
  const [selectedCourses, setSelectedCourses] = useState<CourseItemData[]>([]);
  const [startDate, setStartDate] = useState<Date>(
    couponDetails.start_date || new Date(),
  );
  const [endDate, setEndDate] = useState<Date>(
    couponDetails.end_date || new Date(),
  );
  const form = useForm<z.infer<typeof couponCreateSchema>>({
    resolver: zodResolver(couponCreateSchema),
    defaultValues: {
      title: couponDetails.title,
      code: couponDetails.code,
      active: couponDetails.active,
      value: couponDetails.value.toString(),
      limit: couponDetails.limit,
      type: couponDetails.type,
    },
  });

  useEffect(() => {
    if (couponDetails.courses) {
      setSelectedCourses(couponDetails.courses);
    }
  }, [couponDetails.courses]);

  async function onSubmit(values: CouponCreateFormValues) {
    try {
      const couponType = values.type;
      const couponValue = Number(values.value?.replace(/,/g, ''));

      if (
        couponType === CouponType.PERCENT &&
        couponValue &&
        (couponValue > 100 || couponValue < 0)
      ) {
        form.setError('value', {
          message: 'Value is invalid',
        });

        return;
      }
      const updatedCoupon = await updateCoupon({
        _id: couponDetails._id.toString(),
        updateData: {
          ...values,
          value: couponValue,
          start_date: startDate,
          end_date: endDate,
          courses: selectedCourses.map((course) => course._id.toString()),
        },
      });

      if (updatedCoupon.code) {
        toast.success('Coupon code updated successfully');
      }
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
    }
  }
  const handleSearchCourse = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const courseList = await fetchCourse({ search: value });

      setFindCourse(courseList?.courses);
      if (!value) setFindCourse([]);
    },
    500,
  );

  const handleSelectCourse = (
    checked: boolean | string,
    course: CourseItemData,
  ) => {
    if (checked) {
      setSelectedCourses((previous) => [...previous, course]);
    } else {
      setSelectedCourses((previous) =>
        previous.filter((selectedCourse) => selectedCourse._id !== course._id),
      );
    }
  };

  const couponTypeWatch = form.watch('type');

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
              <FieldLabel>Title</FieldLabel>
              <Input
                placeholder="Title"
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
                placeholder="Coupon Code"
                {...field}
                disabled
                className="font-semibold uppercase"
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
              <FieldLabel>Start Date</FieldLabel>
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
                      <span>Select start date</span>
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
                    onSelect={(day) => day && setStartDate(day)}
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
              <FieldLabel>Select end date</FieldLabel>
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
                      <span>Pick a date</span>
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
                    onSelect={(day) => day && setEndDate(day)}
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
              <FieldLabel>Coupon Type</FieldLabel>
              <RadioGroup
                className="flex h-12 gap-5"
                value={field.value}
                onValueChange={field.onChange}
              >
                {couponTypes.map((type) => (
                  <div
                    key={type.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      id={type.value}
                      value={type.value}
                    />
                    <Label htmlFor={type.value}>{type.title}</Label>
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
          render={({ field, fieldState }) => {
            return (
              <Field>
                <FieldLabel>Value</FieldLabel>
                <>
                  {couponTypeWatch === CouponType.PERCENT ? (
                    <Input
                      placeholder="100"
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  ) : (
                    <Input
                      placeholder="100"
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  )}
                </>
                {!!fieldState.invalid && (
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
              <FieldLabel>Status</FieldLabel>
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
              <FieldLabel>Maximum Quantity</FieldLabel>
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
              <FieldLabel>Courses</FieldLabel>
              <Input
                placeholder="Search courses ..."
                onChange={handleSearchCourse}
              />
              {!!findCourse && findCourse.length > 0 && (
                <div className="mt-5! flex flex-col gap-2">
                  {findCourse?.map((course) => (
                    <Label
                      key={course.title}
                      className="flex cursor-pointer items-center gap-2 text-base font-medium"
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
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1 text-base font-medium shadow-sm"
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
        Update
      </Button>
    </form>
  );
};

export default UpdateCouponContainer;
