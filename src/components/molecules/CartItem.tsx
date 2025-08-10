import React from "react";
import { List, Typography, Input, Button } from "antd";
import { useTranslations } from "next-intl";
import { CartItem } from "@/modules/cart/domain/entities/CartItem";
import { Product } from "@/modules/products/domain/entities/Product";
import { useDispatch } from "react-redux";
import { updateItemQuantity, removeItem } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import the Image component
import { DeleteOutlined } from "@ant-design/icons";

interface CartItemProps {
  item: CartItem;
  product?: Product;
}

const { Text } = Typography;

const CartItemComponent: React.FC<CartItemProps> = ({ item, product }) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleIncrease = () => {
    dispatch(
      updateItemQuantity({
        productId: item.productId,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(
        updateItemQuantity({
          productId: item.productId,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.productId));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(item.productId));
  };

  const handleViewProduct = () => {
    if (product) {
      router.push(`/products/${product.id}`);
    }
  };

  return (
    // List of item at cart
    <List.Item>
      <div className="cart-item">
        <div
          className="cart-item-image"
          onClick={handleViewProduct}>
          {/* image of item */}
          <Image
            src={product?.image || "/images/placeholder.jpg"}
            alt={product?.name || "Product"}
            width={80}
            height={80}
            style={{ objectFit: "contain", cursor: "pointer" }}
          />
        </div>
        <div className="cart-item-info">
          <Text
            className="title-item"
            strong
            onClick={handleViewProduct}
            style={{ cursor: "pointer" }}>
            {product?.name || "Product"}
          </Text>
          <Text
            className="desc-item"
            type="secondary">
            ${product?.price || 0} × {item.quantity}
          </Text>
          {/* action of item of cart */}
          <div className="cart-item-controls">
            <Button
              className="btn"
              onClick={handleDecrease}>
              -
            </Button>
            <Input
              value={item.quantity}
              readOnly
              style={{ width: "50px", textAlign: "center", margin: "0 8px" }}
            />
            <Button
              className="btn"
              onClick={handleIncrease}>
              +
            </Button>
          </div>
          <Button
            className="remove-btn"
            type="link"
            danger
             icon={<DeleteOutlined />}
            onClick={handleRemove}>
            {t("main.remove")}
          </Button>
        </div>
      </div>
    </List.Item>
  );
};

export default CartItemComponent;
