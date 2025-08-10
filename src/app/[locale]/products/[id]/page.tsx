import ProductDetailsPage from "@/modules/products/presentation/pages/ProductDetailsPage";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ProductDetails");

  return {
    title: t("title"),
    description: t("description"),
    keywords: [t("keyword1"), t("keyword2"), t("keyword3")],
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetailsPage productId={params.id} />;
}
