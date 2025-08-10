import React from "react";
import { Spin } from "antd";
import { SpinProps } from "antd/lib/spin";
import "@/styles/main.scss";

interface LoaderProps extends SpinProps {
  size?: "small" | "default" | "large";
}

const Loader: React.FC<LoaderProps> = ({ size = "default", ...props }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}>
        <Spin
          className="custom-spin" 
          style={{ marginTop: "15rem"}}
          size={size}
          {...props}
        />
      </div>
    </>
  );
};

export default Loader;
