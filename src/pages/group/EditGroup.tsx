import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";

function EditGroup() {
  const location = useLocation();
  const { group } = location.state || {};

  const [name, setName] = useState(group?.name || "");
  const [description, setDescription] = useState(group?.content || "");
  const [maximum, setMaximum] = useState(group?.capacity?.toString() || "1");
  const [visibility, setVisibility] = useState(group?.visibility || "public");
  const [password, setPassword] = useState(group?.password || "");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSave = () => {
    const updatedGroup = {
      ...group,
      name,
      content: description,
      capacity: parseInt(maximum, 10),
      visibility,
      password: visibility === "private" ? password : "",
    };

    navigate("/group", { state: { group: updatedGroup } });
  };

  const handleDeleteConfirmed = () => {
    console.log("Group deleted:", group?.id);
    setShowModal(false);
    navigate("/group");
  };

  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>
      <MoveLeftTitle title="Edit Group" />

      <div className="group-info-wrapper">
        <div className="floating-input-wrapper">
          <input
            type="text"
            id="groupName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="groupName">Group Name</label>
        </div>
      </div>

      <div className="group-info-wrapper">
        <div className="floating-input-wrapper">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=" "
            rows={4}
            required
          />
          <label htmlFor="description">Description</label>
        </div>
      </div>

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
          <label htmlFor="capacity">Options</label>
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
        <button className="delete-button" onClick={() => setShowModal(true)}>
          delete group
        </button>
        <button className="create-button" onClick={handleSave}>
          save
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">Delete Group</div>
            <div className="modal-message">
              Are you sure you want to delete this group?
            </div>
            <div className="modal-buttons">
              <button
                className="modal-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="modal-confirm" onClick={handleDeleteConfirmed}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditGroup;

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

  .floating-input-wrapper input:focus + label,
  .floating-input-wrapper input:not(:placeholder-shown) + label,
  .floating-input-wrapper textarea:focus + label,
  .floating-input-wrapper textarea:not(:placeholder-shown) + label,
  .floating-select-wrapper select:focus + label,
  .floating-select-wrapper select:not([value=""]) + label {
    top: -8px;
    left: 10px;
    font-size: 12px;
    color: #333;
    background: white;
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

  .create-wrapper {
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
  }

  .delete-button {
    width: 100%;
    margin-bottom: 16px;
    font-size: 15px;
    font-weight: 500;
    color: #e63946;
    background: none;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    padding: 12px;
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

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .modal {
    background: #fff;
    padding: 24px 20px;
    border-radius: 16px;
    width: 80%;
    max-width: 340px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .modal-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .modal-message {
    font-size: 14px;
    color: #444;
    margin-bottom: 24px;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .modal-cancel {
    flex: 1;
    background: #e0e0e0;
    color: #111;
    border: none;
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
  }

  .modal-confirm {
    flex: 1;
    background: #e63946;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
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
