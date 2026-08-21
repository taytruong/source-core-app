import { BannerCenter, BannerLeft, BannerRight } from '@/src/assets/banner';

export interface BannerProps {}

function Banner(_props: BannerProps) {
  return (
    <section className="bg-primary/90 relative flex min-h-52 w-full items-center justify-center overflow-hidden rounded-3xl px-5 py-8 text-white sm:min-h-56 sm:px-8 md:min-h-60 lg:min-h-64 lg:px-10 xl:min-h-72 xl:px-8 2xl:justify-between 2xl:px-6">
      <div className="hidden shrink-0 2xl:block 2xl:w-[22%] [&>svg]:h-auto [&>svg]:w-full">
        <BannerLeft />
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center xl:max-w-3xl 2xl:w-[52%] 2xl:max-w-none">
        <div className="[&>svg]:w-40] xl:[&>svg]:w-70] pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 [&>svg]:h-auto sm:[&>svg]:w-50 md:[&>svg]:w-57.5 lg:[&>svg]:w-65">
          <BannerCenter />
        </div>

        <div className="relative z-10 px-2">
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl">
            Learn to Cook 🍳
          </h1>

          <p className="mx-auto mt-3 max-w-70 text-sm leading-relaxed font-medium sm:mt-4 sm:max-w-md sm:text-base md:max-w-lg lg:mt-5 lg:max-w-xl lg:text-lg">
            Master authentic recipes from beginner to advanced with structured
            courses, hands-on practice, and expert guidance.
          </p>
        </div>
      </div>

      <div className="hidden shrink-0 2xl:block 2xl:w-[22%] [&>svg]:h-auto [&>svg]:w-full">
        <BannerRight />
      </div>
    </section>
  );
}

export default Banner;
