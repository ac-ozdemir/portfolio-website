import Image from "next/image";

type FeatureBannerProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  chips: string[];
  imageSrc?: string;
  imageAlt: string;
  imagePosition?: string;
};

export default function FeatureBanner({
  id,
  eyebrow,
  title,
  description,
  chips,
  imageSrc,
  imageAlt,
  imagePosition = "center",
}: FeatureBannerProps) {
  return (
    <section id={id} className="relative overflow-hidden">
      <div className="relative flex min-h-[320px] flex-col justify-end px-6 py-16 md:min-h-[380px] md:px-12">
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />
          </>
        ) : (
          <div className="absolute inset-0 bg-foreground" aria-hidden="true" />
        )}

        <div
          className="relative mx-auto w-full max-w-5xl [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]"
        >
          <p className="text-sm font-medium tracking-wide text-white/70 uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 max-w-xl text-2xl font-semibold text-white md:text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-sm text-white/85 md:text-base">
            {description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs font-medium text-white [text-shadow:none]"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
