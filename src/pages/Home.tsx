import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LargeCard from "../components/card/LargeCard";
import MoveRightTitle from "../components/title/MoveRightTitle";
import SmallCard from "../components/card/SmallCard";
import { CardProps } from "../types/CardProps";
import { fetchAllRecords, fetchPopularRecords } from "../api/apiRecords";

import styles from "../styles/Home.module.css";
import layoutStyles from "../styles/Layout.module.css";

function Home() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<CardProps[]>([]);
  const [popularRecords, setPopularRecords] = useState<CardProps[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loading = loadingRecords || loadingPopular;

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetchAllRecords(1, 24);
        setRecords(response?.data ?? []);
      } catch (error) {
        console.error("Error fetching records:", error);
        setError("Failed to fetch records. Please try again later.");
      } finally {
        setLoadingRecords(false);
      }
    };

    const fetchPopular = async () => {
      try {
        const response = await fetchPopularRecords(1, 24);
        setPopularRecords(response?.data ?? []);
      } catch (error) {
        console.error("Error fetching popular records:", error);
        setError("Failed to fetch popular records. Please try again later.");
      } finally {
        setLoadingPopular(false);
      }
    };

    fetchRecords();
    fetchPopular();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) console.log("error", error);

  return (
    <div className={layoutStyles.layout}>
      <div className={styles.headerWrapper}>
        <div className={styles.mainTitle}>Home</div>
        <MoveRightTitle
          title="Records"
          subtitle="Show all Records"
          to="/records"
        />
      </div>

      <div className={styles.scrollableContent}>
        <div className={styles.imageScrollContainer}>
          <div className={styles.imageCardGrid}>
            {records.length === 0 ? (
              <LargeCard
                id={-1}
                imageUrl={""}
                title="기록 없음"
                likeCount={0}
                commentCount={0}
                onClick={() => { }}
              />
            ) : (
              records.map((item, index) => (
                <LargeCard
                  key={index}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  likeCount={item.likeCount}
                  commentCount={item.commentCount}
                  onClick={handleCardClick}
                />
              ))
            )}
          </div>
        </div>

        <div className={styles.subTitle}>인기 게시물</div>

        <div className={styles.smallCardList}>
          {popularRecords.map((item, index) => (
            <SmallCard
              key={index}
              id={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              content={item.content || ""}
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

export default Home;
