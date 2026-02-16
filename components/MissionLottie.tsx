'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LOTTIE_URL = 'https://lottie.host/601b9405-cdb6-49ab-906d-23e841f30434/w7AV9BOh7E.lottie';

export default function MissionLottie() {
  return (
    <div
      className="flex items-center justify-center w-full min-h-[16rem] md:min-h-[18rem] rounded-lg"
      aria-hidden
    >
      <div className="flex items-center justify-center w-full h-full min-h-[16rem] md:min-h-[18rem]">
        <DotLottieReact
          src={LOTTIE_URL}
          autoplay
          loop
          className="w-[280px] h-[280px] max-w-full max-h-full"
        />
      </div>
    </div>
  );
}
