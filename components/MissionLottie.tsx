'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import clsx from 'clsx';

const LOTTIE_URL = 'https://lottie.host/601b9405-cdb6-49ab-906d-23e841f30434/w7AV9BOh7E.lottie';

type MissionLottieProps = {
  compact?: boolean;
  className?: string;
};

export default function MissionLottie({ compact = false, className }: MissionLottieProps) {
  const containerClasses = compact
    ? 'flex items-center justify-center h-full w-full'
    : 'flex items-center justify-center w-full min-h-[16rem] md:min-h-[18rem] rounded-lg';

  const innerClasses = compact
    ? 'flex items-center justify-center h-full w-full'
    : 'flex items-center justify-center w-full h-full min-h-[16rem] md:min-h-[18rem]';

  const lottieClasses = compact
    ? 'w-full h-full'
    : 'w-[280px] h-[280px] max-w-full max-h-full';

  return (
    <div className={clsx(containerClasses, className)} aria-hidden>
      <div className={innerClasses}>
        <DotLottieReact
          src={LOTTIE_URL}
          autoplay
          loop
          className={lottieClasses}
        />
      </div>
    </div>
  );
}
