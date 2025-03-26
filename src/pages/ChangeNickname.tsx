// import MoveLeftTitle from "../components/MoveLeftTitle";
import React from "react";

function ChangeNickname() {
    const [nickname, setNickname] = React.useState("");

    return (
        <div style={pageStyle}>
            {/* 상단 뒤로가기 버튼*/}
            {/* MoveLeftTitle */}
            
            {/*닉네임 입력 폼*/}
            <div style={inputContainerStyle}>
                <label htmlFor="nickname" style={labelStyle}>새 닉네임</label>
                <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="새 닉네임을 입력하세요"
                    style={inputStyle}
                    />
            </div>
            {/* 변경 버튼 */}
            <button style={buttonStyle} onClick={() => alert(`닉네임이 "${nickname}"(으)로 변경되었습니다!`)}>
                변경하기
            </button>
        </div>
    );
}

export default ChangeNickname;

const pageStyle: React.CSSProperties = {
    padding: "0 16px",
};

const inputContainerStyle: React.CSSProperties = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
};

const labelStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
};

const buttonStyle: React.CSSProperties = {
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
};
