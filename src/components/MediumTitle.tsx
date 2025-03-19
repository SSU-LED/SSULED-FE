import React from "react";

function MediumTitle({ children }: React.PropsWithChildren<{}>) {
  return <h2 style={titleStyle}>{children}</h2>;
}

export default MediumTitle;

const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    marginTop: "46px",
};
    