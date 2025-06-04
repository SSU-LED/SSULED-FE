import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RecordData } from "../../types/RecordTypes";
import layoutStyles from "../../styles/Layout.module.css";
import styles from "../../styles/RecordEdit.module.css";

function RecordEdit() {
  const location = useLocation();
  const navigate = useNavigate();

  const record = useMemo(() => {
    return location.state?.updatedData as RecordData | undefined;
  }, [location.state]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("group");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("20");

  const partLabelMap: Record<string, string> = {
    chest: "가슴",
    back: "등",
    shoulders_arms: "어깨/팔",
    legs: "하체",
    abs: "복근",
    cardio: "유산소",
    full_body: "전신",
  };

  useEffect(() => {
    if (!record) return;
    setTitle(record.title || "");
    setDescription(record.content || "");
    setVisibility(record.isPublic ? "public" : "group");
    setSelectedParts(record.bodyPart || []);
    setSelectedTime((record.duration ?? 20).toString());
  }, [record]);

  const handleSave = () => {
    if (!record) return;

    const updatedData: RecordData = {
      ...record,
      title,
      content: description,
      isPublic: visibility === "public",
      bodyPart: selectedParts,
      duration: Number(selectedTime),
    };

    navigate(`/records/${record.id}`, { state: { updatedData } });
  };

  if (!record) return <div>Record not found</div>;

  return (
    <div className={layoutStyles.layout}>
      <div className={styles.headerWrapper}>
        <div className={styles.mainTitle}>운동 기록 수정</div>
      </div>

      <div className={styles.scrollableContent}>
        <div className={styles.recordPreview}>
          <img
            src={record.imageUrl[0]}
            alt={record.title}
            className={styles.recordImage}
          />
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
                  <option value="back">등</option>
                  <option value="shoulders_arms">어깨/팔</option>
                  <option value="legs">하체</option>
                  <option value="abs">복근</option>
                  <option value="cardio">유산소</option>
                  <option value="full_body">전신</option>
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
        <button className={styles.saveButton} onClick={handleSave}>
          수정 완료
        </button>
      </div>
    </div>
  );
}

export default RecordEdit;
