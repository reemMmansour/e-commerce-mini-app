"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/modules/products/infrastructure/repositories/ProductRepository";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { addItem } from "@/store/slices/cartSlice";
import { Button, Typography, Rate, Image, Row, Col, Divider } from "antd";
import { useRouter } from "next/navigation";
import Loader from "@/components/atoms/Loader";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "@/styles/main.scss";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

const { Title, Text } = Typography;

interface ProductDetailsPageProps {
  productId: string;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  productId,
}) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  });

  if (isLoading) return <Loader />;
  if (error || !product) return <div>{t("main.error")}</div>;
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const handleAddToCart = () => {
    dispatch(addItem({ productId: product.id, quantity: 1 }));
  };

  const handleAddToFavorites = () => {
    dispatch(toggleFavorite(product.id));
  };

  return (
    <div className="product-details-page">
      <div className="back-prev-page">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
          className="back-button">
          {t("main.backToProducts")}
        </Button>
      </div>
      <Row>
        {/* Image Proudact */}
        <Col
          xs={24}
          md={12}
          className="img-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Image
            style={{ width: "100%", height: "400px" }}
            src={product.image}
            alt={product.name}
            preview={false}
            className="product-image"
          />
        </Col>
        {/* Product Details */}
        <Col
          xs={24}
          md={12}>
          <div className="product-info">
            <Title level={2}>{product.name}</Title>
            <div className="price-section">
              <Title level={3}>${product.price}</Title>
              <Text
                className="stock"
                type={product.inStock ? "success" : "danger"}>
                {product.inStock ? t("main.inStock") : t("main.outOfStock")}
              </Text>
            </div>
            <Rate
              disabled
              defaultValue={product.rating}
              style={{ fontSize: 14 }}
            />
            <Divider />
            <div className="description">
              <Title
                className="title"
                level={4}>
                {t("main.description")}
              </Title>
              <Text>{product.description}</Text>
            </div>
            {/* Add To Cart Or Favorites */}
            <div className="action-buttons">
              <Button
                className="add-btn"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                disabled={!product.inStock}>
                {t("main.addToCart")}
              </Button>
              <Button
                className="add-btn"
                icon={<HeartOutlined />}
                onClick={handleAddToFavorites}>
                {t("main.addToFavorites")}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailsPage;
