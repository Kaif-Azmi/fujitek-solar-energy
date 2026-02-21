'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const LOTTIE_URL = 'https://lottie.host/601b9405-cdb6-49ab-906d-23e841f30434/w7AV9BOh7E.lottie';
const DotLottiePlayer = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
  { ssr: false },
);

type MissionLottieProps = {
  compact?: boolean;
  className?: string;
};

export default function MissionLottie({ compact = false, className }: MissionLottieProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    const enable = () => setIsReady(true);

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(enable, { timeout: 1500 });
    } else {
      timeoutId = setTimeout(enable, 400);
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      if (idleId !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

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
        {isReady ? (
          <DotLottiePlayer
            src={LOTTIE_URL}
            autoplay
            loop
            className={lottieClasses}
          />
        ) : (
          <div className={lottieClasses} />
        )}
      </div>
    </div>
  );
}
