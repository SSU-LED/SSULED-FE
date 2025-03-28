import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import rawData from "../../assets/tempData.json";
import MediumTitle from "../../components/MediumTitle";
import LargeCard from "../../components/LargeCard";

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
        <LargeCard id={item.id} title={item.title} imageUrl={item.imageUrl} />

        <div className="metadata-form">
          <div className="description-wrapper">
            <div className="form-title">
              Description
            </div>
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
              <select
                className="form-select"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="group">그룹공개</option>
                <option value="public">전체공개</option>
              </select>
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
                    return <option key={value} value={value}>{value}분</option>;
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
        <button className="save-button" onClick={handleSave}>save</button>
      </div>
    </div>
  );
}

export default RecordEdit;


const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
};

const responsiveCSS = `
    .header-wrapper {
        padding: 0px 16px;
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
    }

    .metadata-form {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 4px;
    }

    .form-title {
      font-weight: bold;
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .description-wrapper {
        margin-bottom: 8px;
        width: 100%;
    }

    .description-input {
        width: 100%;
        min-height: 100px;
        font-size: 1rem;
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        resize: vertical;
        color: #000;
        background-color: transparent;
        box-sizing: border-box;
    }

    .visibility-selector {
      display: flex;
      width: 100%;
      flex-direction: column;
    }
    
    .visibility-wrapper {
      display: flex;
    }

    .visibility-toggle {
        display: flex;
        gap: 1rem;
    }

    .visibility-button {
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        background-color: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .visibility-button.active {
        border-color: #333;
        background-color: #f0f0f0;
        font-weight: bold;
    }

    .visibility-public.active {
        color: green;
    }

    .visibility-private.active {
        color: #d00;
    }
    
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    .exercise-detail-wrapper {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }

    .exercise-detail-wrapper > div {
      flex: 1;
    }

    .exercise-part-options,
    .exercise-time-options {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        width: 100%;
    }

    .exercise-part-button,
    .exercise-time-button {
        padding: 0.6rem 1rem;
        border: 1px solid #ccc;
        background-color: white;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .exercise-part-button.selected,
    .exercise-time-button.selected {
        border-color: #333;
        background-color: #e8f4ff;
        font-weight: bold;
    }

    .form-select {
      padding: 0.6rem 1rem;
      font-size: 0.95rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      background-color: white;
      color: #000;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .selected-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tag {
      background-color: #f2f2f2;
      color: #333;
      padding: 0.4rem 0.75rem;
      border-radius: 16px;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      line-height: 1;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    .tag-remove {
      margin-left: 0.5rem;
      background: none;
      border: none;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      color: #aaa;
      padding: 0;
    }

    .tag-remove:hover {
      color: #000;
    }


    .save-button-wrapper {
        padding: 1rem;
        border-top: 1px solid #eee;
        background-color: white;
    }

    .save-button {
        width: 100%;
        padding: 0.9rem;
        background-color: #000;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
    }

    .save-button:hover {
        background-color: #333;
    }
`;
