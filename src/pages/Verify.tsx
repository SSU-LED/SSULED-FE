import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { FiCamera } from "react-icons/fi";
import MediumTitle from "../components/title/MediumTitle";
import { createRecord, uploadImage } from "../api/apiRecords";

function Verify() {
  const cameraRef = useRef<{ takePhoto: () => string } | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("group");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("10");
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCapture = () => {
    const img = cameraRef.current?.takePhoto();
    if (img) {
      setPhoto(img);         // 상태만 저장
      setShowCamera(false);  // 카메라 닫기
    }
  };

  const handleSaveButtonClick = async () => {
    if (!photo) {
      alert("사진을 먼저 촬영해주세요.");
      return;
    }

    setLoading(true);
    try {
      const uploadedImageUrl = await uploadImage(photo);
      if (!uploadedImageUrl) throw new Error("이미지 업로드 실패");

      const response = await createRecord({
        title: title,
        content: description,
        imageUrl: [uploadedImageUrl],
        bodyPart: selectedParts,
        duration: parseInt(selectedTime, 10),
        isPublic: visibility === "public",
      });

      console.log("업로드 성공:", response);
      alert("업로드가 완료되었습니다!");
    } catch (err) {
      console.error("업로드 실패:", err);
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>

      <div className="header-wrapper">
        <MediumTitle>Verify</MediumTitle>
      </div>

      <div className="scrollable-content">
        <div className="record-preview">
          {photo ? (
            <img src={photo} alt="Preview" className="record-image" />
          ) : showCamera ? (
            <div className="camera-container">
              <Camera
                ref={cameraRef}
                aspectRatio={4 / 3}
                facingMode="environment"
                errorMessages={{
                  noCameraAccessible: "카메라에 접근할 수 없습니다.",
                  permissionDenied: "카메라 권한이 거부되었습니다.",
                  switchCamera: "카메라 전환 중 오류가 발생했습니다.",
                  canvas: "이미지를 렌더링할 수 없습니다.",
                }}
              />
              <button className="capture-button" onClick={handleCapture}>
                캡처
              </button>
            </div>
          ) : (
            <div
              className="placeholder-container"
              onClick={() => setShowCamera(true)}
            >
              <FiCamera size={36} color="#aaa" />
            </div>
          )}
        </div>

        <div className="metadata-form">
          <div className="floating-input-wrapper">
            <input
              type="text"
              className="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="postTitle">Title</label>
          </div>

          <div className="floating-input-wrapper">
            <textarea
              className="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="postDescription">Description</label>
          </div>

          <div className="visibility-selector">
            <div className="form-section">
              <div className="form-title">Visibility</div>
              <div className="segmented-control">
                <button
                  className={`segment-button ${visibility === "group" ? "active" : ""
                    }`}
                  onClick={() => setVisibility("group")}
                >
                  그룹공개
                </button>
                <button
                  className={`segment-button ${visibility === "public" ? "active" : ""
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
              <div className="floating-select-wrapper">
                <select
                  id="parts"
                  value={selectedParts[selectedParts.length - 1] || ""}
                  data-hasvalue={selectedParts.length > 0}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value && !selectedParts.includes(value)) {
                      setSelectedParts([...selectedParts, value]);
                    }
                  }}
                >
                  <option value="" disabled hidden />
                  <option value="chest">가슴</option>
                  <option value="back">등</option>
                  <option value="shoulders_arms">어깨/팔</option>
                  <option value="legs">하체</option>
                  <option value="abs">복근</option>
                </select>
                <label htmlFor="parts">운동 부위</label>
              </div>
            </div>

            <div className="exercise-time-selector">
              <div className="floating-select-wrapper">
                <select
                  id="time"
                  className="form-select"
                  value={selectedTime}
                  data-hasvalue={!!selectedTime}
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
                <label htmlFor="time">운동 시간</label>
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

      <div className="floating-button-wrapper">
        <button className="save-button" onClick={handleSaveButtonClick}>upload</button>
      </div>
    </div>
  );
}

export default Verify;

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
    padding-bottom: 120px; /* floating-button-wrapper 공간 확보 */
  }

  .record-preview {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-bottom: 20px;
  }

  .record-image {
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .camera-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .capture-button {
    margin-top: 12px;
    width: 100%;
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    border: none;
    background-color: #111;
    color: white;
    cursor: pointer;
  }

  .placeholder-container {
    width: 100%;
    height: 240px;
    background-color: #f1f2f6;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .floating-input-wrapper,
  .floating-select-wrapper {
    position: relative;
  }

  .floating-input-wrapper input,
  .floating-input-wrapper textarea,
  .floating-select-wrapper select {
    width: 100%;
    padding: 16px 14px 12px;
    font-size: 15px;
    border: none;
    border-radius: 12px;
    background-color: #f1f2f6;
    color: #111;
    outline: none;
  }

  .floating-input-wrapper textarea {
    resize: vertical;
    min-height: 90px;
  }

  .floating-input-wrapper label,
  .floating-select-wrapper label {
    position: absolute;
    top: 14px;
    left: 14px;
    color: #888;
    font-size: 14px;
    pointer-events: none;
    transition: all 0.2s ease;
    background: transparent;
  }

  /* Floating label active 상태 */
  .floating-input-wrapper input:focus + label,
  .floating-input-wrapper input:not(:placeholder-shown) + label,
  .floating-input-wrapper textarea:focus + label,
  .floating-input-wrapper textarea:not(:placeholder-shown) + label,
  .floating-select-wrapper select:focus + label{
    top: -8px;
    left: 10px;
    font-size: 13px;
    color: #333;
    background: transparent;
    padding: 0 4px;
  }

  .floating-select-wrapper select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    background-size: 18px 18px;
  }

  .floating-select-wrapper select[data-hasvalue="true"] + label {
  top: -8px;
  left: 10px;
  font-size: 13px;
  color: #333;
  padding: 0 4px;
  z-index: 2;
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
  .placeholder-container {
    width: 100%;
    height: 280px;
    background-color: #f1f2f6;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
    padding: 2px;
  }

  .tag-remove:hover {
    color: #000;
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

  .floating-button-wrapper {
    position: fixed;
    bottom: 56px; /* navbar 높이 고려 */
    left: 0;
    right: 0;
    padding: 0 16px 16px;
    background-color: transparent;
    z-index: 20;
    display: flex;
    justify-content: center;
  }

  .save-button {
    width: 430px;
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

    .form-select,
    .description-input {
      font-size: 14px;
      padding: 12px;
    }

    .save-button {
      font-size: 15px;
      padding: 14px;
    }
  }
`;
