"use client";
import React, { useState } from "react";
import { Layout, Badge, Space, Button, Drawer } from "antd";
import {
  HeartOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import "@/styles/main.scss";
import Input from "@/components/atoms/Input";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const currentLocale = params?.locale as string;

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favoriteCount = useSelector(
    (state: RootState) => state.favorites.productIds.length
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <>
      <AntHeader className="header">
        <div className="header-content">
          {/* Logo */}
          <img
            style={{ width: "50px", cursor: "pointer" }}
            src="assets/images/logo.jpg"
            alt="Logo"
            className="logo"
            onClick={() => router.push(`/`)}
          />
          {/* Desktop Menu */}
          <div className="desktop-menu">
            <Space size="large">
              {/* Favorites Button  */}
              <Badge
                count={favoriteCount}
                size="small">
                <Button
                  className="btn-menu"
                  type="text"
                  icon={<HeartOutlined />}
                  onClick={() => router.push(`/${currentLocale}/favorites`)}>
                  {t("main.favorites")}
                </Button>
              </Badge>
              {/* Cart Button  */}
              <Badge
                count={cartItems.length}
                size="small">
                <Button
                  className="btn-menu"
                  type="text"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => router.push(`/${currentLocale}/cart`)}>
                  {t("main.cart")}
                </Button>
              </Badge>
              {/* Language Button  */}
              <Button
                className="btn-menu"
                onClick={() =>
                  handleLanguageChange(currentLocale === "en" ? "ar" : "en")
                }
                type="text">
                {currentLocale === "en" ? "EN" : "AR"}
              </Button>
            </Space>
          </div>
          {/* Mobile Menu Icon */}
          <div className="mobile-menu">
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 20 }} />}
              onClick={() => setDrawerOpen(true)}
            />
          </div>
        </div>
      </AntHeader>

      {/* Drawer for Mobile */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}>
        <Input
          placeholder={t("main.search")}
          style={{ marginBottom: 16 }}
        />
        <Button
          block
          onClick={() => {
            router.push(`/${currentLocale}/favorites`);
            setDrawerOpen(false);
          }}>
          {t("main.favorites")} ({favoriteCount})
        </Button>
        <Button
          block
          onClick={() => {
            router.push(`/${currentLocale}/cart`);
            setDrawerOpen(false);
          }}>
          {t("main.cart")} ({cartItems.length})
        </Button>
        <div style={{ marginTop: 16 }}>
          <Button
            block
            onClick={() => handleLanguageChange("en")}
            type={currentLocale === "en" ? "primary" : "default"}>
            EN
          </Button>
          <Button
            block
            onClick={() => handleLanguageChange("ar")}
            type={currentLocale === "ar" ? "primary" : "default"}
            style={{ marginTop: 8 }}>
            AR
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
