import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import CommentCard from "../../components/card/CommentCard";
import { FaRegPaperPlane } from "react-icons/fa";
import {
  fetchRecordById,
  deleteRecord as apiDeleteRecord,
} from "../../api/apiRecords";
import { RecordData } from "../../types/RecordTypes";
import { commentCard } from "../../types/CommentTypes";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { addLike, removeLike } from "../../api/apiLike";
import { createComment, deleteComment } from "../../api/apiComment";
import { newComment } from "../../types/CommentTypes";

import layoutStyles from "../../styles/Layout.module.css";
import styles from "../../styles/RecordDetail.module.css";
import { format } from "date-fns";

function RecordDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState<RecordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<commentCard[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!id) return;

    const fetchRecord = async () => {
      try {
        const response = await fetchRecordById(id);
        setRecord(response);
        setComments(response.comments);
      } catch (error) {
        console.error("Error fetching record by ID:", error);
        setError("Failed to fetch record. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!record) return <div>Record not found</div>;

  const handleOptionClick = () => setShowOptions(true);
  const closeOptions = () => setShowOptions(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleDeleteRecord = (recordId: number) => {
    apiDeleteRecord(recordId)
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
    if (record) handleDeleteRecord(Number(id));
  };

  const handleSendClick = () => {
    if (!commentInput.trim()) return;

    const newCommentData: newComment = {
      postId: record.id,
      content: commentInput,
    };

    createComment(newCommentData.postId, newCommentData.content)
      .then((response) => {
        setComments((prev) => [
          ...prev,
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

  const date = new Date(record.createdAt);

  return (
    <div className={layoutStyles.layout}>
      {showOptions && (
        <div className={styles.blurOverlay} onClick={closeOptions}>
          <div
            className={styles.bottomSheet}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.buttonWrapper}>
              <button
                className={styles.editButton}
                onClick={() => {
                  closeOptions();
                  navigate(`/records/${id}/edit`, {
                    state: { updatedData: record },
                  });
                }}
              >
                수정
              </button>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteClick}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCommentId !== null && (
        <div
          className={styles.blurOverlay}
          onClick={() => setSelectedCommentId(null)}
        >
          <div
            className={styles.bottomSheet}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.buttonWrapper}>
              <button
                className={styles.deleteButton}
                onClick={() => {
                  handleCommentDelete(selectedCommentId);
                  setSelectedCommentId(null);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.headerWrapper}>
        <MoveLeftTitle
          title=""
          showOptionButton={record.isMine}
          onOptionClick={handleOptionClick}
        />
      </div>

      <div className={styles.scrollArea}>
        <div className={styles.contentWrapper}>
          <div className={styles.recordUser}>
            <img
              src={record.user.profileImage}
              alt={record.user.nickname}
              className={styles.userProfile}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontWeight: "bold" }}>{record.user.nickname}</div>
              <div style={{ fontSize: "11px", color: "gray" }}>
                {format(date, "MM/dd a hh:mm")}
              </div>
            </div>
          </div>
          <div className={styles.recordTitle}>{record.title}</div>
          <div className={styles.recordPreview}>
            <img
              src={record.imageUrl[0]}
              alt={record.title}
              className={styles.recordImage}
            />

            <div className={styles.recordDescription}>
              <div className={styles.recordContent}>{record.content}</div>
              <div className={styles.recordLikes} onClick={handleLikeToggle}>
                {record.userLiked ? (
                  <IoIosHeart style={{ color: "red", fontSize: "24px" }} />
                ) : (
                  <IoIosHeartEmpty style={{ color: "red", fontSize: "24px" }} />
                )}
                <span>{record.likeCount}</span>
              </div>
            </div>
          </div>

          <div className={styles.commentsWrapper}>
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                id={comment.id}
                isMine={comment.isMine}
                commentId={comment.id}
                profileImage={comment.profileImage}
                nickname={comment.nickname}
                content={comment.content}
                updatedAt={comment.updatedAt}
                onClick={(id) => setSelectedCommentId(id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.uploadComment}>
        <input
          className={styles.inputComment}
          placeholder="Leave a comment..."
          value={commentInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendClick();
          }}
        />
        <div className={styles.uploadIconWrapper} onClick={handleSendClick}>
          <FaRegPaperPlane />
        </div>
      </div>
    </div>
  );
}

export default RecordDetail;
