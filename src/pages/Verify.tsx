import { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { FiCamera } from "react-icons/fi";
import { createRecord, uploadImage } from "../api/apiRecords";

import layoutStyles from "../styles/Layout.module.css";
import styles from "../styles/Verify.module.css";

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
      setPhoto(img);
      setShowCamera(false);
    }
  };

  const handleRetake = () => {
    setPhoto(null);
    setShowCamera(true);
  };


  const handleSaveButtonClick = async () => {
    if (!photo) {
      alert("사진을 먼저 촬영해주세요.");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      console.log("Uploading image...");
      const uploadedImageUrl = await uploadImage(photo);
      console.log("Image uploaded:", uploadedImageUrl);

      if (!uploadedImageUrl || typeof uploadedImageUrl !== "string") {
        throw new Error("이미지 업로드 결과가 유효하지 않습니다.");
      }

      // uploadImage가 성공했을 때만 createRecord 실행
      console.log("Creating record...");
      const response = await createRecord({
        title,
        content: description,
        imageUrl: [uploadedImageUrl],
        bodyPart: selectedParts,
        duration: parseInt(selectedTime, 10),
        isPublic: visibility === "public",
      });
      console.log("Record created:", response);
      alert("업로드가 완료되었습니다!");

      // 중복 방지를 위한 상태 초기화
      setPhoto(null);
      setTitle("");
      setDescription("");
      setSelectedParts([]);
      setSelectedTime("10");
      setVisibility("group");

    } catch (err) {
      console.error("업로드 실패:", err);
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={layoutStyles.layout}>
      <div className={styles.headerWrapper}>
        Verify
      </div>

      <div className={styles.scrollableContent}>
        <div className={styles.recordPreview}>
          {photo ? (
            <div className={styles.cameraContainer}>
              <img src={photo} alt="Preview" className={styles.recordImage} />
              <button className={styles.captureButton} onClick={handleRetake}>
                재촬영
              </button>
            </div>
          ) : showCamera ? (
            <div className={styles.cameraContainer}>
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
              <button className={styles.captureButton} onClick={handleCapture}>
                캡처
              </button>
            </div>
          ) : (
            <div
              className={styles.placeholderContainer}
              onClick={() => setShowCamera(true)}
            >
              <FiCamera size={36} color="#aaa" />
            </div>
          )}
        </div>

        <div className={styles.metadataForm}>
          <div className={styles.floatingInputWrapper}>
            <input
              type="text"
              className={styles.titleInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="postTitle">Title</label>
          </div>

          <div className={styles.floatingInputWrapper}>
            <textarea
              className={styles.descriptionInput}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="postDescription">Description</label>
          </div>

          <div className={styles.visibilitySelector}>
            <div className={styles.formSection}>
              <div className={styles.formTitle}>Visibility</div>
              <div className={styles.segmentedControl}>
                <button
                  className={`${styles.segmentButton} ${visibility === "group" ? styles.active : ""}`}
                  onClick={() => setVisibility("group")}
                >
                  그룹공개
                </button>
                <button
                  className={`${styles.segmentButton} ${visibility === "public" ? styles.active : ""}`}
                  onClick={() => setVisibility("public")}
                >
                  전체공개
                </button>
              </div>
            </div>
          </div>

          <div className={styles.exerciseDetailWrapper}>
            <div className={styles.exercisePartSelector}>
              <div className={styles.floatingSelectWrapper}>
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

            <div className={styles.exerciseTimeSelector}>
              <div className={styles.floatingSelectWrapper}>
                <select
                  id="time"
                  className={styles.formSelect}
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

          <div className={styles.selectedTags}>
            {selectedParts.map((part) => (
              <div key={part} className={styles.tag}>
                {part}
                <button
                  className={styles.tagRemove}
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

      <div className={styles.floatingButtonWrapper}>
        <button
          className={styles.saveButton}
          onClick={handleSaveButtonClick}
          disabled={loading}
        >
          {loading ? "업로드 중..." : "upload"}
        </button>
      </div>
    </div>
  );
}

export default Verify;
