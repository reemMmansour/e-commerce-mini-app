import React from "react";
import { Button as AntButton } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CustomButtonProps extends Omit<any, "type"> {
  variant?: "primary" | "default" | "dashed" | "link" | "text";
  size?: "small" | "middle" | "large";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const ButtonProject: React.FC<CustomButtonProps> = ({
  variant = "default",
  size = "middle",
  onClick,
  children,
  className,
  ...props
}) => {
  // Map your variant names to Ant Design's type values
  const antdType = variant === "default" ? undefined : variant;

  return (
    <AntButton
      type={antdType}
      size={size}
      onClick={onClick}
      className={className}
      {...props}>
      {children}
    </AntButton>
  );
};

export default ButtonProject;
