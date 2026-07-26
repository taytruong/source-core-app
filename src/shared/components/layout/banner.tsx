import { BannerCenter, BannerLeft, BannerRight } from '@/src/assets/banner';

export interface BannerProps {}

function Banner(_props: BannerProps) {
  return (
    <section className="bg-primary/90 flex min-h-65 items-center justify-between rounded-3xl p-6 text-white">
      <BannerLeft />
      <div className="relative space-y-6">
        <h1 className="pb-7 text-7xl font-bold">Learn to Cook🍳</h1>
        <p className="max-w-xl text-lg font-semibold">
          Master authentic recipes from beginner to advanced with structured
          courses, hands-on practice, and expert guidance.
        </p>
        <div className="absolute top-0 mx-auto">
          <BannerCenter />
        </div>
      </div>
      <BannerRight />
    </section>
  );
}

export default Banner;
