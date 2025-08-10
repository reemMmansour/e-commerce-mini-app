import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/organisms/Header";
import { AntdProvider } from "@/providers/AntdProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { StoreProvider } from "@/providers/StoreProvider";

import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import MenuCategory from "./menu-category/page";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <StoreProvider>
          <AntdProvider>
            <ReactQueryProvider>
              <NextIntlClientProvider>
                <Header />
                <MenuCategory />
                <div className="container">{children}</div>
              </NextIntlClientProvider>
            </ReactQueryProvider>
          </AntdProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
