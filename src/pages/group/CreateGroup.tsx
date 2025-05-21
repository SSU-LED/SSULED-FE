import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { createGroup } from "../../api/apiGroup";
import { CreateGroupRequest } from "../../types/GroupTypes";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";

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
    setError(null);

    try {
      const response = await createGroup(newGroup);
      navigate("/group", { state: { group: newGroup } });
    } catch (error) {
      console.error("Error creating group:", error);
      setError("Failed to create group. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>
      <MoveLeftTitle title="Create Group" />

      <div className="group-info-wrapper">
        <div className="floating-input-wrapper">
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
      {/* 
      <div className="group-info-wrapper">
        <div className="floating-input-wrapper">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder=" "
            rows={4}
          />
          <label htmlFor="description">Description</label>
        </div>
      </div> */}

      <div className="group-info-wrapper">
        <div className="floating-select-wrapper">
          <select
            id="capacity"
            value={maximum}
            onChange={(e) => setMaximum(e.target.value)}
            required
          >
            <option value="" disabled hidden></option>
            {Array.from({ length: 50 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <label htmlFor="capacity">Maximum Capacity</label>
        </div>
      </div>

      <div className="group-info-wrapper">
        <div className="floating-select-wrapper">
          <select
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            required
          >
            <option value="" disabled hidden></option>
            <option value="public">공개</option>
            <option value="private">비공개</option>
          </select>
          <label htmlFor="visibility">Visibility</label>
        </div>
      </div>

      {visibility === "private" && (
        <div className="group-info-wrapper">
          <div className="floating-input-wrapper password-input-with-icon">
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
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>
        </div>
      )}

      <div className="create-wrapper">
        <button className="create-button" onClick={handleCreate}>
          create
        </button>
      </div>
    </div>
  );
}

export default CreateGroup;

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

  .group-info-wrapper {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
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
  .floating-select-wrapper select:focus + label,
  .floating-select-wrapper select:not([value=""]) + label {
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

  .password-input-with-icon {
    position: relative;
  }

  .password-input-with-icon input {
    padding-right: 42px;
  }

  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #888;
    padding: 4px;
  }
  
  /* Chrome, Edge */
  input[type="password"]::-webkit-credentials-auto-fill-button,
  input[type="password"]::-webkit-textfield-decoration-container,
  input[type="password"]::-ms-reveal {
    display: none !important;
    pointer-events: none;
    opacity: 0;
  }

  .create-wrapper {
    padding: 32px 20px;
  }

  .create-button {
    width: 100%;
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: #1c1b1f;
    border: none;
    border-radius: 12px;
    cursor: pointer;
  }

  .create-button:active {
    background-color: #2a292d;
  }

  @media (max-width: 480px) {
    .floating-input-wrapper input,
    .floating-input-wrapper textarea,
    .floating-select-wrapper select {
      font-size: 14px;
    }

    .create-button {
      font-size: 15px;
      padding: 12px;
    }
  }
`;
