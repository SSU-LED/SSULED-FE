import React from "react";

function LargeTitle({ children }: React.PropsWithChildren<object>) {
  return <h1 style={titleStyle}>{children}</h1>;
}

export default LargeTitle;

const titleStyle: React.CSSProperties = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "16px",
    marginTop: "24px",
};