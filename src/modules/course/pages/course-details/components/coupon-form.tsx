'use client';
import { debounce } from 'lodash';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';

import { getValidateCode } from '@/src/modules/coupon/actions/coupon.action';
import { Input } from '@/src/shared/components/ui/input';
import { CouponType } from '@/src/shared/constants';

interface CouponFormProps {
  courseId: string;
  setPrice: Dispatch<SetStateAction<number>>;
  originalPrice: number;
  setCouponId: Dispatch<SetStateAction<string>>;
}

const CouponForm = ({
  courseId,
  originalPrice,
  setCouponId,
  setPrice,
}: CouponFormProps) => {
  const [isAppiled, setIsAppiled] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  // const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsAppiled(false);
  }, [couponCode]);

  const handleApplyCoupon = async () => {
    if (isAppiled) return;
    try {
      const response = await getValidateCode({
        code: couponCode.toUpperCase(),
        courseId,
      });
      const couponType = response?.type;
      let finalPrice = originalPrice;

      if (!response) {
        toast.error('Mã giảm giá không hợp lệ');
        setCouponCode('');
        setCouponId('');

        return;
      }

      if (couponType === CouponType.PERCENT) {
        finalPrice = originalPrice - (originalPrice * response?.value) / 100;
      } else if (couponType === CouponType.AMOUNT) {
        finalPrice = originalPrice - response?.value;
      }
      setPrice(finalPrice);
      toast.success('Áp mã (coupon) thành công ^-^');
      setCouponCode('');
      // inputRef.current?.value && (inputRef.current.value = "");
      setIsAppiled(true);
      setCouponId(response._id.toString());
    } catch (error) {
      console.log('🚀 ~ handleApplyCoupon ~ error:', error);
    }
  };

  const handleChangeCoupon = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCouponCode(event.target.value);
    },
    500,
  );

  return (
    <div className="relative mt-5">
      <Input
        className="pr-20 font-medium uppercase"
        defaultValue={couponCode}
        placeholder="Nhập mã giảm giá"
        onChange={handleChangeCoupon}
        // ref={inputRef}
      />
      <button
        className="absolute top-1/2 right-5 -translate-y-1/2 text-sm font-medium"
        onClick={handleApplyCoupon}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default CouponForm;
