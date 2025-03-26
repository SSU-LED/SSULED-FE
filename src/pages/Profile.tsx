import React from "react";
import MoveRightTitle from "../components/MoveRightTitle";
import Tabsbar from "../components/Tabsbar";

function Profile() {
    return (
        <div style={pageStyle}>
            <div style={headerStyle}>
                <MoveRightTitle title="my profile" subtitle={"gogo"}/>
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

const containerStyle: React.CSSProperties = {
    display: "inline-flex",
    overflowX: "auto",
    whiteSpace: "nowrap",
    paddingBottom: "8px",
    scrollbarWidth: "thin",
    scrollbarColor: "#ccc transparent",
};

const scrollContainerStyle = `
    ::-webkit-scrollbar {
        height: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 4px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const scrollableContainerStyle: React.CSSProperties = {
    overflow: "auto",
    scrollbarWidth: "none",
};

const styleElement = document.createElement("style");
styleElement.innerHTML = scrollContainerStyle;
document.head.appendChild(styleElement);

const tempData: {
    imageUrl: string;
    title: string;
    content?: string;
    size?: "small" | "medium" | "large";
}[] = [
    {
        imageUrl: "https://images.unsplash.com/photo-1726930095108-3737074d0f42?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "medium",
    },
    {
        imageUrl: "https://plus.unsplash.com/premium_photo-1668032526061-c0cbd0dc7111?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "medium",
    },
    {
        imageUrl: "https://plus.unsplash.com/premium_photo-1668767725891-58f5cd788105?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "medium",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "medium",
    },
    {
        imageUrl: "https://plus.unsplash.com/premium_photo-1685311279547-ecd6086b7ccd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "medium",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "medium",
    }
];