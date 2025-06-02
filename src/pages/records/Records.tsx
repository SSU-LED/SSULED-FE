import { useNavigate } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import MediumCard from "../../components/card/MediumCard";
import { fetchAllRecords } from "../../api/apiRecords";
import { useEffect, useState } from "react";
import { RecordData } from "../../types/RecordTypes";
import styles from "../../styles/Records.module.css";

function Records() {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetchAllRecords(1, 24);
        if (!response || !response.data) {
          throw new Error("No data returned from API");
        }
        setRecords(response.data);
        console.log("Fetched records:", response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
        setRecords([]);
        setError("Failed to fetch records. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log("error", error);
  }

  return (
    <div className={styles.page}>
      <MoveLeftTitle title="Records" page="/" />
      <div className={styles.scrollArea}>
        <div className={styles.list}>
          {records?.map((item, index) => (
            <MediumCard
              key={index}
              imageUrl={item.imageUrl[0]}
              title={item.updatedAt}
              id={item.id}
              likeCount={item.likeCount}
              commentCount={item.commentCount}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Records;
