import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { createGroup } from "../../api/apiGroup";
import { CreateGroupRequest } from "../../types/GroupTypes";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";

import layoutStyles from "../../styles/Layout.module.css";
import styles from "../../styles/CreateGroup.module.css";

function CreateGroup() {
  const [title, setTitle] = useState("");
  const [maximum, setMaximum] = useState("1");
  const [visibility, setVisibility] = useState("public");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (visibility === "public") {
      setPassword("");
    }
  }, [visibility]);

  const handleCreate = async () => {
    const newGroup: CreateGroupRequest = {
      title,
      password: visibility === "private" ? password : "",
      isAccessible: visibility === "public",
      maxMember: parseInt(maximum, 10),
    };

    setLoading(true);
    setError(false);

    try {
      await createGroup(newGroup);
      navigate("/group", { state: { group: newGroup } });
    } catch (error) {
      console.error("Error creating group:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) console.log("error", error);

  return (
    <div className={layoutStyles.layout}>
      <MoveLeftTitle title="Create Group" />

      <div className={styles.groupInfoWrapper}>
        <div className={styles.floatingInputWrapper}>
          <input
            type="text"
            id="groupName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder=" "
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
          >
            <option value="" disabled hidden />
            {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <label htmlFor="capacity">Maximum Capacity</label>
        </div>
      </div>

      <div className={styles.groupInfoWrapper}>
        <div className={styles.floatingSelectWrapper}>
          <select
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            required
          >
            <option value="" disabled hidden />
            <option value="public">공개</option>
            <option value="private">비공개</option>
          </select>
          <label htmlFor="visibility">Visibility</label>
        </div>
      </div>

      {visibility === "private" && (
        <div className={styles.groupInfoWrapper}>
          <div className={`${styles.floatingInputWrapper} ${styles.passwordInputWithIcon}`}>
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
        <button className={styles.createButton} onClick={handleCreate}>
          create
        </button>
      </div>
    </div>
  );
}

export default CreateGroup;
