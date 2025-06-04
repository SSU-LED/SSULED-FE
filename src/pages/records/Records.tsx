import { useNavigate } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import MediumCard from "../../components/card/MediumCard";
import { fetchAllRecords } from "../../api/apiRecords";
import { useEffect, useState } from "react";
import { RecordData } from "../../types/RecordTypes";
import styles from "../../styles/Records.module.css";

function Records() {
  const navigate = useNavigate();

  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 24;

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  const fetchRecords = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllRecords(page, pageSize);
      const { data, meta } = response;

      if (!data || !meta) throw new Error("Invalid response format");

      setRecords(data);
      setTotalPages(meta.totalPages);
    } catch (err) {
      console.error("Error fetching records:", err);
      setError("기록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.page}>
      <MoveLeftTitle title="Records" page="/" />

      <div className={styles.scrollArea}>
        {loading ? (
          <div className={styles.statusMessage}>불러오는 중...</div>
        ) : error ? (
          <div className={styles.statusMessage}>{error}</div>
        ) : (
          <>
            <div className={styles.list}>
              {records.map((item) => (
                <MediumCard
                  key={item.id}
                  imageUrl={item.imageUrl[0]}
                  title={item.updatedAt}
                  id={item.id}
                  likeCount={item.likeCount}
                  commentCount={item.commentCount}
                  onClick={handleCardClick}
                />
              ))}
            </div>

            <div className={styles.pagination}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={styles.pageButton}
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ""}`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={styles.pageButton}
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Records;
