import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from "next-intl/server";
import "@/assets/styles/main.scss";
import { fetchData } from '@/utils/httpService';
import Header from '@/components/layout/Header/Header';
import Move from '@/components/Move/Move';
import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-urbanist',
  display: 'swap',
});

export const viewport = {
  initialScale: 1.0,
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no"
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const data = {
    notification_banner: {
      first_message: "SECURE YOUR SPOT IN OUR UPCOMING CLASS",
      second_message: "REGISTRATION IS NOW OPEN!",
      countdown_time: "04:13:12:48",
      show_countdown: true,
    },
    header: {},
    footer: {},
  }

    const [socialResult] = await Promise.allSettled([
      fetchData("v1/social-links/", locale),
    ]);

    const socialData = socialResult.status === "fulfilled" ? socialResult.value : null;

  return (
    <html lang={locale}>

      <body className={urbanist.variable}>
        <NextIntlClientProvider>
          <Move />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Header />
            <main>
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}