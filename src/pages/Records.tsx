import MoveLeftTitle from "../components/MoveLeftTitle";
import ImageCard from "../components/ImageCard";

function Records() {
    return (
        <div style={pageStyle}>
            {/* <MoveLeftTitle title="Records" /> */}
            <MoveLeftTitle title="Records" to="/" />
            <div style={listStyle}>
                {tempData.map((item, index) => (
                    <ImageCard
                        key={index}
                        imageUrl={item.imageUrl}
                        title={item.title}
                        content={item.content || ""}
                        size={item.size}
                    />
                ))}
            </div>
        </div>
    );
}

export default Records;

const pageStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 16px",
};

const listStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    marginTop: "16px",
    alignContent: "center",
};

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
        size: "small",
    },
    {
        imageUrl: "https://plus.unsplash.com/premium_photo-1668032526061-c0cbd0dc7111?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
    {
        imageUrl: "https://plus.unsplash.com/premium_photo-1668767725891-58f5cd788105?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
    {
        imageUrl: "https://plus.unsplash.com/premium_photo-1685311279547-ecd6086b7ccd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1726930095108-3737074d0f42?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
    {
        imageUrl: "https://plus.unsplash.com/premium_photo-1668032526061-c0cbd0dc7111?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
    {
        imageUrl: "https://plus.unsplash.com/premium_photo-1668767725891-58f5cd788105?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
    {
        imageUrl: "https://plus.unsplash.com/premium_photo-1685311279547-ecd6086b7ccd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D",
        title: "basketball",
        content: "Basketball is fun",
        size: "small",
    },
];