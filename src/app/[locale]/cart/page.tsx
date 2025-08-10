import CartPage from "@/modules/cart/presentation/pages/CartPage";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Cart");

  return {
    title: t("title"),
    description: t("description"),
    keywords: [t("keyword1"), t("keyword2"), t("keyword3")],
  };
}

export default function Cart() {
  return <CartPage />;
}
