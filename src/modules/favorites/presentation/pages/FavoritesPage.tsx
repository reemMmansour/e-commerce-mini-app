"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/modules/products/infrastructure/repositories/ProductRepository";
import { useTranslations } from "next-intl";
import ProductCard from "@/components/molecules/ProductCard";
import Loader from "@/components/atoms/Loader";
import { Row, Col, Button } from "antd";

const FavoritesPage: React.FC = () => {
  const t = useTranslations();
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.productIds
  );

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

  const favoriteProducts =
    products?.filter((p) => favoriteIds.includes(p.id)) || [];

  return (
    <div className="favorites-page">
      <h1 className="title">{t("main.favorites")}</h1>
      {favoriteProducts.length === 0 ?
        <div className="empty-favorites">
          <p>{t("main.emptyFavorites")}</p>
          <Button
            className="empty-btn"
            type="primary"
            onClick={() => window.history.back()}>
            {t("main.backToProducts")}
          </Button>
        </div>
      : <Row gutter={[16, 16]}>
          {favoriteProducts.map((product) => (
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
      }
    </div>
  );
};

export default FavoritesPage;
