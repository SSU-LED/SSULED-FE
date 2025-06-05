import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { updateGroup, fetchMyGroup, deleteGroup } from "../../api/apiGroup";
import { CreateGroupRequest, GroupInfo } from "../../types/GroupTypes";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";

import layoutStyles from "../../styles/Layout.module.css";
import styles from "../../styles/EditGroup.module.css";
import { apiClient } from "../../api/apiClient";

function EditGroup() {
  const [group, setGroup] = useState<GroupInfo>();
  const [title, setTitle] = useState("");
  const [maximum, setMaximum] = useState("1");
  const [isAccessible, setIsAccessible] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (group) {
      setTitle(group.title || "");
      setMaximum(group.maxMember.toString());
      setIsAccessible(group.isAccessible);
      setPassword("");
      if (group.isOwner) {
        setIsOwner(true);
      }
    }
  }, [group]);

  useEffect(() => {
    if (!group) {
      fetchMyGroup()
        .then((data) => setGroup(data))
        .catch((err) => {
          console.error("그룹 정보를 불러오지 못했습니다", err);
          navigate("/group");
        });
    }
  }, [group, navigate]);

  useEffect(() => {
    if (isAccessible) {
      setPassword("");
      setShowPassword(false);
    }
  }, [isAccessible]);

  const handleSave = async () => {
    if (!group) return;

    const updatedGroup: CreateGroupRequest = {
      title,
      password: isAccessible ? "" : password,
      isAccessible,
      maxMember: parseInt(maximum, 10),
    };

    try {
      await updateGroup(group.id, updatedGroup);
      navigate("/group", { state: { group: updatedGroup } });
    } catch (err) {
      console.error("Failed to update group:", err);
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!group) return;
    try {
      await deleteGroup(group.id);
      setShowModal(false);
      navigate("/group");
    } catch (err) {
      console.error("Failed to delete group:", err);
    }
  };

  const handleLeaveConfirmed = async () => {
    const confirmLeave = window.confirm("정말 탈퇴하시겠습니까? 🥺");
    if (confirmLeave) {
      try {
        await apiClient.delete(`/group/${group?.id}/leave`);
        alert("그룹에서 탈퇴했습니다.");
        navigate("/group");
      } catch (error) {
        console.error("그룹 탈퇴 실패:", error);
        alert("그룹 탈퇴 중 오류가 발생했습니다.");
      }
    }
  };
  if (!group) return <div>Loading group info...</div>;

  return (
    <div className={layoutStyles.layout}>
      <MoveLeftTitle title="Edit Group" />

      <div className={styles.groupInfoWrapper}>
        <div className={styles.floatingInputWrapper}>
          <input
            type="text"
            id="groupName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="그룹 이름을 입력해주세요"
            disabled={!isOwner}
          />
          <label htmlFor="groupName">Group Name</label>
        </div>
      </div>

      <div className={styles.groupInfoWrapper}>
        <div className={styles.floatingSelectWrapper}>
          <select
            id="capacity"
            value={maximum}
            onChange={(e) => setMaximum(e.target.value)}
            required
            disabled={!isOwner}
          >
            <option value="" disabled hidden></option>
            {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <label htmlFor="capacity">Options</label>
        </div>
      </div>

      <div className={styles.groupInfoWrapper}>
        <div className={styles.floatingSelectWrapper}>
          <select
            id="accessibility"
            value={isAccessible ? "public" : "private"}
            onChange={(e) => setIsAccessible(e.target.value === "public")}
            required
            disabled={!isOwner}
          >
            <option value="" disabled hidden></option>
            <option value="public">공개</option>
            <option value="private">비공개</option>
          </select>
          <label htmlFor="accessibility">Accessibility</label>
        </div>
      </div>

      {!isAccessible && (
        <div className={styles.groupInfoWrapper}>
          <div
            className={`${styles.floatingInputWrapper} ${styles.passwordInputWithIcon}`}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>
        </div>
      )}

      <div className={styles.createWrapper}>
        <button
          className={styles.deleteButton}
          onClick={() => setShowModal(true)}
        >
          {isOwner ? "그룹 삭제하기" : "그룹 탈퇴하기"}
        </button>
        {isOwner && (
          <button className={styles.createButton} onClick={handleSave}>
            save
          </button>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>
              {isOwner ? "그룹 삭제" : "그룹 탈퇴"}
            </div>
            <div className={styles.modalMessage}>
              {isOwner
                ? "그룹을 삭제하시겠습니까?"
                : "그룹에서 탈퇴하시겠습니까?"}
            </div>
            <div className={styles.modalButtons}>
              <button
                className={styles.modalCancel}
                onClick={() => setShowModal(false)}
              >
                취소
              </button>
              <button
                className={styles.modalConfirm}
                onClick={isOwner ? handleDeleteConfirmed : handleLeaveConfirmed}
              >
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditGroup;
