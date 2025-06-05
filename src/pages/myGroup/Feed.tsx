import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import rawData from "../../assets/tempData.json";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import LargeCard from "../../components/card/LargeCard";
import SmallImageCard from "../../components/card/SmallImageCard";
import { FaRegPaperPlane } from "react-icons/fa";

function RecordDetail() {
  const { id } = useParams();
  const location = useLocation();
  const numericId = Number(id);

  const updated = location.state?.updatedData;
  const item = updated || rawData.find((item) => item.id === numericId);
  const [showOptions, setShowOptions] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const navigate = useNavigate();

  if (!item) return <div>Record not found</div>;

  const handleOptionClick = () => setShowOptions(true);
  const closeOptions = () => setShowOptions(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleSendClick = () => {
    if (!commentInput.trim()) return;
    console.log("Sending comment:", commentInput);
    setCommentInput("");
  };

  const renderOptionSheet = () => (
    <div className="blur-overlay" onClick={closeOptions}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="button-wrapper">
          <button
            className="edit-button"
            onClick={() => {
              closeOptions();
              navigate(`/records/${id}/edit`);
            }}
          >
            수정
          </button>
          <button className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>

      {showOptions && renderOptionSheet()}
      <h2>hi?</h2>
      <div className="header-wrapper">
        <MoveLeftTitle
          title={`${item.id}: ${item.title}`}
          page="/mygroup"
          showOptionButton={true}
          onOptionClick={handleOptionClick}
        />
      </div>

      <div className="scroll-area">
        <div className="content-wrapper">
          <LargeCard
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            content={item.content}
          />

          <div className="comments-wrapper">
            {fakeComments.map((comment, index) => (
              <SmallImageCard
                key={`${comment.name}-${index}`}
                image={comment.imageUrl}
                title={comment.name}
                content={comment.comment}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="upload-comment">
        <input
          className="input-comment"
          placeholder="Leave a comment..."
          value={commentInput}
          onChange={handleInputChange}
        />
        <div className="upload-icon-wrapper" onClick={handleSendClick}>
          <FaRegPaperPlane />
        </div>
      </div>
    </div>
  );
}

export default RecordDetail;

const fakeComments = [
  {
    imageUrl: "https://placekitten.com/80/80",
    name: "Alice",
    comment: "Great workout!",
  },
  {
    imageUrl: "https://placekitten.com/81/81",
    name: "Bob",
    comment: "Respect 👏",
  },
  {
    imageUrl: "https://placekitten.com/82/82",
    name: "Charlie",
    comment: "Let’s do it again tomorrow!",
  },
  {
    imageUrl: "https://placekitten.com/83/83",
    name: "Dana",
    comment: "That looked intense!",
  },
  {
    imageUrl: "https://placekitten.com/84/84",
    name: "Eli",
    comment: "Good energy today.",
  },
  {
    imageUrl: "https://placekitten.com/85/85",
    name: "Fiona",
    comment: "Nice shot!",
  },
  {
    imageUrl: "https://placekitten.com/86/86",
    name: "George",
    comment: "🔥🔥🔥",
  },
  {
    imageUrl: "https://placekitten.com/87/87",
    name: "Hannah",
    comment: "Can’t wait to join next time.",
  },
  {
    imageUrl: "https://placekitten.com/88/88",
    name: "Ian",
    comment: "Good form!",
  },
  {
    imageUrl: "https://placekitten.com/89/89",
    name: "Jade",
    comment: "This motivated me to work out too!",
  },
  {
    imageUrl: "https://placekitten.com/90/90",
    name: "Kai",
    comment: "Let’s go again tomorrow.",
  },
];

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  height: "100vh",
  position: "relative",
};

const responsiveCSS = `
  .header-wrapper {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: white;
    border-bottom: 1px solid #eee;
  }

  .scroll-area {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;

    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  .scroll-area::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  .content-wrapper {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .comments-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .upload-comment {
    position: sticky;
    bottom: 0;
    z-index: 10;
    background-color: white;
    padding: 0.75rem 1rem;
    display: flex;
    gap: 0.5rem;
    border-top: 1px solid #ddd;
    align-items: center;
  }

  .input-comment {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: transparent;
    color: #000;
  }

  .upload-icon-wrapper {
    font-size: 1.4rem;
    color: #333;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .upload-icon-wrapper:hover {
    color: #000;
  }

  .blurOverlay {
    position: fixed;
    width: 100%;
    max-width: 390px;
    height: 100%;
    max-height: 100vh;
    backdrop-filter: blur(6px);
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 999;
    display: flex;
    align-items: flex-end;
  }

  .bottom-sheet {
    background: transparent;
    width: 100%;
    padding: 0 1.25rem 2rem;
    animation: slideUp 0.2s ease-out forwards;
  }

  .button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  @media (min-width: 480px) {
    .button-wrapper {
      flex-direction: row;
    }
  }

  .edit-button,
  .delete-button {
    padding: 0.9rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s ease;
    flex: 1;
  }

  .edit-button {
    color: #000;
    background-color: #e8f7fa;
  }

  .edit-button:hover {
    background-color: #d6f0f5;
  }

  .delete-button {
    color: #d00;
    background-color: #ffecec;
  }

  .delete-button:hover {
    background-color: #ffd8d8;
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
