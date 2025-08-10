import FavoritesPage from "@/modules/favorites/presentation/pages/FavoritesPage";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Favorites");
  return {
    title: t("title"),
    description: t("description"),
    keywords: [t("keyword1"), t("keyword2"), t("keyword3")],

  };
}
export default function FavouritesPage() {
  return (
    <>
      <FavoritesPage />
    </>
  );
}
