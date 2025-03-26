import React from "react";

function MediumTitle({ children }: React.PropsWithChildren<object>) {
  return <h2 style={titleStyle}>{children}</h2>;
}

export default MediumTitle;

const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    marginTop: "24px",
};
    