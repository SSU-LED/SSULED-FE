// import { useNavigate } from "react-router-dom";

// type MoveLeftTitleProps = {
//     title: string;
// };

// function MoveLeftTitle({ title }: MoveLeftTitleProps) {
//     const navigate = useNavigate(); // 이전 페이지로 이동하는 함수

//     return (
//         <div style={containerStyle}>
//             <button onClick={() => navigate(-1)} style={backButtonStyle}>
//                 {"<"}
//             </button>
//             <div style={titleContainerStyle}>
//                 <div style={titleStyle}>{title}</div>
//             </div>
//         </div>
//     );
// }

// export default MoveLeftTitle;

// const containerStyle: React.CSSProperties = {
//     display: "flex",
//     backgroundColor: "#fff",
//     width: "100vw",
//     borderBottom: "1px solid #ddd",
//     alignItems: "center",
//     position: "relative",
//     height: "50px",
//     marginTop: "46px",
// };

// const backButtonStyle: React.CSSProperties = {
//     background: "none",
//     border: "none",
//     fontSize: "20px",
//     fontWeight: "bold",
//     color: "#333",
//     cursor: "pointer",
//     position: "absolute",
//     left: "16px",
// };

// const titleContainerStyle: React.CSSProperties = {
//     flex: 1, // 부모 요소에서 중앙 정렬
//     display: "flex",
//     justifyContent: "center",
// };

// const titleStyle: React.CSSProperties = {
//     fontSize: "18px",
//     fontWeight: "bold",
// };

import { useNavigate } from "react-router-dom";

type MoveLeftTitleProps = {
    title: string;
    to?: string; // 이동할 경로를 받을 수 있도록 추가
};

function MoveLeftTitle({ title, to }: MoveLeftTitleProps) {
    const navigate = useNavigate(); // 페이지 이동 함수

    return (
        <div style={containerStyle}>
            <button onClick={() => navigate(-1)} style={backButtonStyle}>
                {"<"}
            </button>
            <div style={titleContainerStyle}>
                <div 
                    style={titleStyle} 
                    onClick={() => to && navigate(to)} // 'to' 경로가 있으면 해당 페이지로 이동
                >
                    {title}
                </div>
            </div>
        </div>
    );
}

export default MoveLeftTitle;

const containerStyle: React.CSSProperties = {
    display: "flex",
    backgroundColor: "#fff",
    width: "100vw",
    borderBottom: "1px solid #ddd",
    alignItems: "center",
    position: "relative",
    height: "50px",
    marginTop: "46px",
};

const backButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    cursor: "pointer",
    position: "absolute",
    left: "16px",
};

const titleContainerStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
};

const titleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer", // 제목을 클릭할 수 있게 스타일링
};

