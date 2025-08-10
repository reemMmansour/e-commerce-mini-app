"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/modules/products/infrastructure/repositories/ProductRepository";
import { useTranslations } from "next-intl";
import CartItem from "@/components/molecules/CartItem";
import Loader from "@/components/atoms/Loader";
import { Button, Typography, List, Card } from "antd";

const CartPage: React.FC = () => {
  const t = useTranslations();
  const cartItems = useSelector((state: RootState) => state.cart.items);

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

  const total = cartItems.reduce((sum, item) => {
    const product = products?.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <h1 className="title">{t("main.cart")}</h1>
      {cartItems.length === 0 ?
        <div className="empty-cart">
          <p>{t("main.emptyCart")}</p>
          <Button
            className="empty-btn"
            type="primary"
            onClick={() => window.history.back()}>
            {t("main.backToProducts")}
          </Button>
        </div>
      : <div className="cart-content">
          {/* List of Product at Cart */}
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <CartItem
                item={item}
                product={products?.find((p) => p.id === item.productId)}
              />
            )}
          />
          <Card className="cart-summary">
            {/* Total */}
            <Typography.Title level={4}>
              {t("main.total")}: ${total.toFixed(2)}
            </Typography.Title>
            {/* Checkout Button */}
            <Button
              type="primary"
              size="large">
              {t("main.checkout")}
            </Button>
          </Card>
        </div>
      }
    </div>
  );
};

export default CartPage;
