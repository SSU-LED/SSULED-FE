import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import rawData from "../../assets/tempData.json";
import MediumTitle from "../../components/title/MediumTitle";

function RecordEdit() {
  const { id } = useParams();
  const numericId = Number(id);
  const item = rawData.find((item) => item.id === numericId);

  const [description, setDescription] = useState(item?.content || "");
  const [visibility, setVisibility] = useState("group");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("20");

  const navigate = useNavigate();

  const handleSave = () => {
    const updatedData = {
      id: item!.id,
      title: item!.title,
      imageUrl: item!.imageUrl,
      content: description,
      visibility,
      parts: selectedParts,
      time: selectedTime,
    };

    navigate(`/records/${item!.id}`, { state: { updatedData } });
  };

  if (!item) return <div>Record not found</div>;

  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>

      <div className="header-wrapper">
        <MediumTitle>운동 기록 수정</MediumTitle>
      </div>

      <div className="scrollable-content">
        <div className="record-preview">
          <img src={item.imageUrl} alt={item.title} className="record-image" />
          <div className="record-title">{item.title}</div>
        </div>

        <div className="metadata-form">
          <div className="description-wrapper">
            <div className="form-title">Description</div>
            <textarea
              className="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="운동 설명을 입력하세요"
            />
          </div>
          <div className="visibility-selector">
            <div className="form-section">
              <div className="form-title">Visibility</div>
              <div className="segmented-control">
                <button
                  className={`segment-button ${
                    visibility === "group" ? "active" : ""
                  }`}
                  onClick={() => setVisibility("group")}
                >
                  그룹공개
                </button>
                <button
                  className={`segment-button ${
                    visibility === "public" ? "active" : ""
                  }`}
                  onClick={() => setVisibility("public")}
                >
                  전체공개
                </button>
              </div>
            </div>
          </div>
          <div className="exercise-detail-wrapper">
            <div className="exercise-part-selector">
              <div className="form-section">
                <div className="form-title">Exercise Parts</div>
                <select
                  className="form-select"
                  value=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value && !selectedParts.includes(value)) {
                      setSelectedParts([...selectedParts, value]);
                    }
                  }}
                >
                  <option value="">운동 부위 선택</option>
                  <option value="가슴">가슴</option>
                  <option value="등">등</option>
                  <option value="어깨">어깨</option>
                  <option value="하체">하체</option>
                  <option value="복근">복근</option>
                </select>
              </div>
            </div>

            <div className="exercise-time-selector">
              <div className="form-section">
                <div className="form-title">Exercise Time</div>
                <select
                  className="form-select"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const value = (i + 1) * 10;
                    return (
                      <option key={value} value={value}>
                        {value}분
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="selected-tags">
            {selectedParts.map((part) => (
              <div key={part} className="tag">
                {part}
                <button
                  className="tag-remove"
                  onClick={() =>
                    setSelectedParts(selectedParts.filter((p) => p !== part))
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="save-button-wrapper">
        <button className="save-button" onClick={handleSave}>
          save
        </button>
      </div>
    </div>
  );
}

export default RecordEdit;

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
};

const responsiveCSS = `
  * {
    box-sizing: border-box;
  }

  .header-wrapper {
    padding: 16px;
    background-color: white;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .scrollable-content {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    padding-bottom: 100px;
  }

  .metadata-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 8px;
  }

  .form-title {
    font-weight: 600;
    font-size: 15px;
    color: #111;
    margin-bottom: 6px;
  }
  
  .record-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .record-image {
    width: 420px;
    height: 280px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .record-title {
    margin-top: 12px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #111;
  }


  .description-input {
    width: 100%;
    min-height: 100px;
    font-size: 15px;
    padding: 12px;
    border: none;
    border-radius: 12px;
    background-color: #f1f2f6;
    color: #111;
    resize: vertical;
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-select {
    padding: 14px;
    font-size: 15px;
    border: none;
    border-radius: 12px;
    background-color: #f1f2f6;
    color: #111;
    width: 100%;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg fill='gray' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 18px 18px;
  }

  .exercise-detail-wrapper {
    display: flex;
    gap: 12px;
  }

  .exercise-detail-wrapper > div {
    flex: 1;
  }

  .selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }

  .tag {
    background-color: #e8e8e8;
    color: #333;
    padding: 6px 12px;
    border-radius: 9999px;
    font-size: 13px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }

  .tag-remove {
    margin-left: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #aaa;
    background: none;
    border: none;
    cursor: pointer;
  }

  .tag-remove:hover {
    color: #000;
  }

  .save-button-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background-color: white;
    border-top: 1px solid #eee;
  }

  .save-button {
    width: 100%;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    border: none;
    background-color: #111;
    color: white;
    cursor: pointer;
  }

  .save-button:active {
    background-color: #333;
  }

  @media (max-width: 480px) {
    .form-title {
      font-size: 14px;
    }

    .form-select, .description-input {
      font-size: 14px;
      padding: 12px;
    }

    .save-button {
      font-size: 15px;
      padding: 14px;
    }
  }
    .segmented-control {
  display: flex;
  background-color: #f1f2f6;
  border-radius: 10px;
  overflow: hidden;
}

.segment-button {
  flex: 1;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.segment-button.active {
  background-color: #fff;
  color: #111;
  font-weight: 600;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.06);
}
`;
