'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LOTTIE_URL = 'https://lottie.host/829ae003-4864-40fc-a986-63cf93595e64/Ne3gRHBLbt.lottie';

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
