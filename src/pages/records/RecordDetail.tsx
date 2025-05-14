import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import CommentCard from "../../components/card/CommentCard";
import { FaRegPaperPlane } from "react-icons/fa";
import { fetchRecordById, deleteRecord as apiDeleteRecord } from "../../api/apiRecords"; // Renaming import
import { RecordData } from "../../types/RecordTypes";
import { commentCard } from "../../types/CommentTypes";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { addLike, removeLike } from "../../api/apiLike";
import { createComment } from "../../api/apiComment";
import { newComment } from "../../types/CommentTypes";
import { deleteComment } from "../../api/apiComment";


function RecordDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState<RecordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<commentCard[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecord = async () => {
      try {
        const response = await fetchRecordById(id);
        setRecord(response);
        setComments(response.comments);
        console.log("Fetched record:", response);
      } catch (error) {
        console.error("Error fetching record by ID:", error);
        setError("Failed to fetch record. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  if (!record) return <div>Loading or record not found</div>;
  if (error) return <div>{error}</div>;
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleOptionClick = () => setShowOptions(true);
  const closeOptions = () => setShowOptions(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleDeleteRecord = (recordId: number) => { // Renamed function
    if (!recordId) return;

    apiDeleteRecord(recordId) // Use the renamed API function
      .then(() => {
        alert("Record deleted successfully.");
        navigate("/records");
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
        alert("Failed to delete record.");
      });
  };

  const handleDeleteClick = () => {
    if (record) {
      handleDeleteRecord(Number(id)); // Corrected ID passing here
    }
  };

  const handleSendClick = () => {
    if (!commentInput.trim()) return;

    const newCommentData: newComment = {
      postId: record.id,
      content: commentInput,
    };

    createComment(newCommentData.postId, newCommentData.content)
      .then((response) => {
        setComments((prevComments) => [
          ...prevComments,
          {
            ...response,
            isMine: true,
            nickname: record.user.nickname,
            profileImage: record.user.profileImage,
          },
        ]);
        setCommentInput("");
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  };

  const renderOptionSheet = () => (
    <div className="blur-overlay" onClick={closeOptions}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="button-wrapper">
          <button
            className="edit-button"
            onClick={() => {
              closeOptions();
              navigate(`/records/${id}/edit`, {
                state: { updatedData: record }
              });
            }}
          >
            Edit
          </button>
          <button 
            className="delete-button"
            onClick={handleDeleteClick} // Corrected to call handleDeleteClick without arguments
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  const renderCommentOptionSheet = () => (
    <div className="blur-overlay" onClick={() => setSelectedCommentId(null)}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="button-wrapper">
          <button
            className="delete-button"
            onClick={() => {
              if (selectedCommentId !== null) {
                handleCommentDelete(selectedCommentId);
                setSelectedCommentId(null);
              }
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );

  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      alert("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  const handleLikeToggle = async () => {
    if (!record) return;

    try {
      if (record.userLiked) {
        await removeLike(record.id);
        setRecord({
          ...record,
          userLiked: false,
          likeCount: record.likeCount - 1,
        });
      } else {
        await addLike(record.id);
        setRecord({
          ...record,
          userLiked: true,
          likeCount: record.likeCount + 1,
        });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>

      {showOptions && renderOptionSheet()}
      {selectedCommentId !== null && renderCommentOptionSheet()}

      <div className="header-wrapper">
        <MoveLeftTitle
          title={`${record.id}: ${record.title}`}
          showOptionButton={record.isMine}
          onOptionClick={handleOptionClick}
        />
      </div>

      <div className="scroll-area">
        <div className="content-wrapper">
          <div className="record-preview">
            <img
              src={record.imageUrl[0]}
              alt={record.title}
              className="record-image"
            />
            <div className="record-title">{record.title}</div>
            <div className="record-description">
              <div className="record-description record-content">
                {record.content}
              </div>
              <div className="record-description record-date">
                {record.createdAt}
              </div>
              <div className="record-description record-likes" onClick={handleLikeToggle}>
                {record.userLiked ? (
                  <IoIosHeart style={{ color: "red", fontSize: "24px" }} />
                ) : (
                  <IoIosHeartEmpty style={{ color: "red", fontSize: "24px" }} />
                )}
                <span>{record.likeCount}</span>
              </div>
              <div className="record-description user">
                <img
                  src={record.user.profileImage}
                  alt={record.user.nickname}
                  className="record-description user-profile"
                />
                <div className="record-description user-nickname">
                  {record.user.nickname}
                </div>
              </div>
            </div>
          </div>

          <div className="comments-wrapper">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                id={comment.id}
                isMine={comment.isMine}
                commentId={comment.id}
                profileImage={comment.profileImage}
                nickname={comment.nickname}
                content={comment.content}
                onClick={(id) => setSelectedCommentId(id)}
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

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
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

    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .scroll-area::-webkit-scrollbar {
    display: none;
  }

  .content-wrapper {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .record-preview {
    display: flex;
    flex-direction: column;
    align-records: center;
    text-align: left;
    gap: 12px;
  }

  .record-image {
    width: 100%;
    max-width: 480px;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .record-title {
    font-size: 18px;
    font-weight: 600;
    color: #111;
  }

  .record-description {
    font-size: 14px;
    color: #555;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  .record-description.record-likes {
    display: flex;
    flex-direction: row;
  }

  .record-description.user {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    display: flex;
    flex-direction: row;
  }

  .record-description.user-profile {
    width: 32px;
    height: 32px;
    border-radius: 50%;
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

  .blur-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 999;
    display: flex;
    align-items: flex-end;
  }

  .bottom-sheet {
    background: transparent;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 1.25rem 2rem;
    animation: slideUp 0.2s ease-out forwards;
  }

  .button-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 430px;
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
