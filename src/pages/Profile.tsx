import React from "react";
import MoveRightTitle from "../components/MoveRightTitle";

function Profile() {
    return (
        <div style={pageStyle}>
            <div style={headerStyle}>
                <MoveRightTitle title="my profile" subtitle={"gogo"} to="/changenickname"/>
            </div>
            
        </div>
    );
}

export default Profile;


const pageStyle: React.CSSProperties = {
    padding: "0 16px",
};

const headerStyle: React.CSSProperties = {
    marginTop: "0px",
};
