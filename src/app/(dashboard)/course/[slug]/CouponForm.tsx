"use client";
import { Input } from "@/components/ui/input";
import { getValidateCode } from "@/src/lib/actions/coupon.action";
import { ECouponType } from "@/src/types/enum";
import { debounce } from "lodash";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

const CouponForm = ({
  setPrice,
  courseId,
  originalPrice,
  setCouponId,
}: {
  courseId: string;
  setPrice: Dispatch<SetStateAction<number>>;
  originalPrice: number;
  setCouponId: Dispatch<SetStateAction<string>>;
}) => {
  const [isAppiled, setIsAppiled] = useState(false);

  const [couponCode, setCouponCode] = useState("");
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
        toast.error("Mã giảm giá không hợp lệ");
        setCouponCode("");
        setCouponId("");
        return;
      }

      if (couponType === ECouponType.PERCENT) {
        finalPrice = originalPrice - (originalPrice * response?.value) / 100;
      } else if (couponType === ECouponType.AMOUNT) {
        finalPrice = originalPrice - response?.value;
      }
      setPrice(finalPrice);
      toast.success("Áp mã (coupon) thành công ^-^");
      setCouponCode("");
      // inputRef.current?.value && (inputRef.current.value = "");
      setIsAppiled(true);
      setCouponId(response._id.toString());
    } catch (error) {
      console.log("🚀 ~ handleApplyCoupon ~ error:", error);
    }
  };

  const handleChangeCoupon = debounce((e: any) => {
    setCouponCode(e.target.value);
  }, 500);

  return (
    <div className="mt-5 relative">
      <Input
        placeholder="Nhập mã giảm giá"
        className="pr-20 uppercase font-medium"
        onChange={handleChangeCoupon}
        defaultValue={couponCode}
        // ref={inputRef}
      />
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 font-medium text-sm"
        onClick={handleApplyCoupon}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default CouponForm;
