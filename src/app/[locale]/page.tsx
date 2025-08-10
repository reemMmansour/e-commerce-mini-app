import { QueryClient } from "@tanstack/react-query";
import { getProducts } from "@/modules/products/infrastructure/repositories/ProductRepository";
import MainPage from "@/modules/products/presentation/pages/MainPage";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const queryClient = new QueryClient();
  console.log(locale);
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return <MainPage />;
}
