"use client";

import { Triangle } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="loading flex-center">
      <Triangle
        height="200"
        width="200"
        color="#FF5722"
        ariaLabel="triangle-loading"
        visible={true}
      />
    </div>
  );
}
