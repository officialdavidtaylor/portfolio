import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { Exo_2, Inter } from '@next/font/google';

const exo_2 = Exo_2({
  weight: ['400'],
  variable: '--font-exo-2',
  display: 'optional',
});

const inter = Inter({
  variable: '--font-inter',
  display: 'optional',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --exo-2-font: ${exo_2.style.fontFamily};
            --font-roboto: ${inter.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
