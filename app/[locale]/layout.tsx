import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIAssistantLazy from "@/components/AIAssistantLazy";
import { I18nProvider } from "@/components/i18n-provider";
import { buildLocalizedMetadata, isLocale, locales, type Locale } from "@/lib/i18n";
import { getMessages, getTranslator } from "@/lib/i18n-server";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getTranslator(locale);

  return {
    ...buildLocalizedMetadata({
      locale,
      pathname: "/",
      title: t("meta.layout.title"),
      description: t("meta.layout.description"),
    }),
    title: {
      default: t("meta.layout.title"),
      template: "%s | Fujitek Solar Energy",
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const messages = await getMessages(locale);
  return (
    <I18nProvider locale={locale} messages={messages}>
      <Header />
      <main>{children}</main>
      <Footer locale={locale} />
      <AIAssistantLazy />
    </I18nProvider>
  );
}
