/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getProducts } from "@/modules/products/infrastructure/repositories/ProductRepository";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/molecules/ProductCard";
import Loader from "@/components/atoms/Loader";
import { Row, Col } from "antd";

const queryClient = new QueryClient();

const MainPage: React.FC = () => {
  const t = useTranslations();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductsContent t={t} />
    </QueryClientProvider>
  );
};

const ProductsContent: React.FC<{ t: any }> = ({ t }) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>{t("main.error")}</div>;

  return (
    // Home page - Products Page
    <div className="main-page">
      <Row gutter={[16, 16]}>
        {products?.map((product) => (
          <Col
            key={product.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
