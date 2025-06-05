import { useRef, useState, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { FiCamera } from "react-icons/fi";
import { createRecord, uploadImage } from "../api/apiRecords";
import { fetchMyGroup } from "../api/apiGroup";
import { useNavigate } from "react-router-dom";
import { BodyPartEnum } from "../types/RecordTypes";

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

  useEffect(() => {
    const checkGroupStatus = async () => {
      try {
        const response = await fetchMyGroup();
        console.log("그룹 정보:", response);

        if (!response || !response.id) {
          alert("그룹에 가입되어 있지 않습니다. 그룹 페이지로 이동합니다.");
          navigate("/group");
        }
      } catch (error) {
        console.error("그룹 정보 조회 실패:", error);
        alert("그룹 정보를 확인할 수 없습니다. 그룹 페이지로 이동합니다.");
        navigate("/group");
      }
    };

    checkGroupStatus();
  }, );


  const partLabelMap: Record<string, string> = {
    chest: "가슴",
    back: "등",
    legs: "하체",
    core: "코어",
    sports: "스포츠",
    shoulders_arms: "어깨/팔",
    cardio: "유산소",
    other: "기타",
    abs: "복부"
  };

  const navigate = useNavigate();

  const BODY_PART_VALUES: BodyPartEnum[] = [
    "chest",
    "back",
    "legs",
    "core",
    "sports",
    "shoulders_arms",
    "cardio",
    "other",
    "abs"
  ];

  const isValidBodyPart = (value: string): value is BodyPartEnum => {
    return BODY_PART_VALUES.includes(value as BodyPartEnum);
  };

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

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!description.trim()) {
      alert("설명을 입력해주세요.");
      return;
    }

    if (selectedParts.length === 0) {
      alert("운동 부위를 선택해주세요.");
      return;
    }

    const duration = parseInt(selectedTime, 10);
    if (isNaN(duration) || duration <= 0) {
      alert("운동 시간을 올바르게 선택해주세요.");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const uploadedImageUrl = await uploadImage(photo);

      if (!uploadedImageUrl || typeof uploadedImageUrl !== "string") {
        throw new Error("이미지 업로드 결과가 유효하지 않습니다.");
      }

      const validBodyParts = selectedParts.filter(isValidBodyPart);

      const response = await createRecord({
        title,
        content: description,
        imageUrl: [uploadedImageUrl],
        bodyPart: validBodyParts,
        duration,
        isPublic: visibility === "public",
      });
      console.log("업로드 성공:", response);

      // 초기화
      setPhoto(null);
      setTitle("");
      setDescription("");
      setSelectedParts([]);
      setSelectedTime("10");
      setVisibility("group");

      navigate("/");
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
        <div className={styles.mainTitle}>Verify</div>
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

          <div className={styles.floatingSegmentedWrapper}>
            <div className={styles.segmentedControl} id="visibility">
              <button
                type="button"
                className={`${styles.segmentButton} ${visibility === "group" ? styles.active : ""}`}
                onClick={() => setVisibility("group")}
              >
                그룹공개
              </button>
              <button
                type="button"
                className={`${styles.segmentButton} ${visibility === "public" ? styles.active : ""}`}
                onClick={() => setVisibility("public")}
              >
                전체공개
              </button>
            </div>
            <label htmlFor="visibility">Visibility</label>
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
                  <option value="abs">복부</option>
                  <option value="back">등</option>
                  <option value="legs">하체</option>
                  <option value="core">코어</option>
                  <option value="sports">스포츠</option>
                  <option value="shoulders_arms">어깨/팔</option>
                  <option value="cardio">유산소</option>
                  <option value="other">기타</option>
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
                {partLabelMap[part] || part}
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
