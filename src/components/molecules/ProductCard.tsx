import React from "react";
import { Card, Rate, Typography } from "antd";
import Button from "@/components/atoms/Button";
import { useTranslations } from "next-intl";
import { Product } from "@/modules/products/domain/entities/Product";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import the Image component
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";

interface ProductCardProps {
  product: Product;
}

const { Meta } = Card;
const { Text } = Typography;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card
      hoverable
      className="card"
      cover={
        <Image
          alt={product.name}
          src={product.image}
          width={300}
          height={250}
          style={{ objectFit: "contain" }}
        />
      }
      actions={[
        <Button
          key="favorite"
          className="card-fav-btn"
          icon={<HeartOutlined />}
          onClick={() => dispatch(toggleFavorite(product.id))}>
          {t("main.addToFavorites")}
        </Button>,
        <Button
          key="details"
          className="card-btn"
          icon={<EyeOutlined />}
          onClick={handleViewDetails}>
          {t("main.viewDetails")}
        </Button>,
      ]}>
      <Meta
        title={product.name}
        description={
          <>
            <Rate
              disabled
              defaultValue={product.rating}
              style={{ fontSize: 12 }}
            />
            <Text type="secondary">
              {t("main.price")}: ${product.price}
            </Text>
          </>
        }
      />
    </Card>
  );
};

export default ProductCard;
