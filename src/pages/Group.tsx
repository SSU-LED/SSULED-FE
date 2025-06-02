import React, { useEffect, useState } from "react";
import MediumTitle from "../components/title/MediumTitle";
import Top3Ranking from "../components/Top3Ranking";
import SmallGroupCard from "../components/card/SmallGroupCard";
import MoveRightTitle from "../components/title/MoveRightTitle";
import PeriodTabsbar from "../components/PeriodTabsbar";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/apiClient";
import { CardProps } from "../types/CardProps";
import { AxiosError } from "axios";

interface IFGroup {
  createdAt: string;
  id: number;
  isAccessible: boolean;
  maxMember: number;
  memberCount: number;
  memberUuid: string[];
  ownerUuid: string;
  password: string | null;
  title: string;
  updatedAt: string;
}

interface RankingItem {
  groupId: number;
  groupName: string;
  rank: number;
  score: number;
  commits: number;
}

function getCurrentQuarter(): number {
  const month = new Date().getMonth();
  return Math.floor(month / 3) + 1;
}

function getQuarterFromTab(tab: string) {
  switch (tab) {
    case "이번 분기":
      return getCurrentQuarter();
    case "지난 분기":
      return getCurrentQuarter() === 1 ? 4 : getCurrentQuarter() - 1;
    default:
      return getCurrentQuarter();
  }
}

function Group() {
  const navigate = useNavigate();
  const [isJoined] = useState(true);
  const [group, setGroup] = useState<IFGroup[]>([]);
  const [rankingData, setRankingData] = useState<CardProps[]>([]);
  const [activeTab, setActiveTab] = useState("이번 분기");

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await apiClient.get("/group", {
        params: { page: 1, limit: 10 },
      });
      setGroup(res.data.data);
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const quarter = getQuarterFromTab(activeTab);
    const year = new Date().getFullYear();

    const fetchTop3 = async () => {
      try {
        const res = await apiClient.get("/statistics/group/ranking", {
          params: { quarter, year },
        });
        const top3Raw = res.data.top3 as RankingItem[];
        const formattedTop3 = top3Raw.map((item: RankingItem) => ({
          id: item.groupId,
          title: item.groupName,
          rank: item.rank,
          score: item.score,
          commits: item.commits,
          imageUrl: "",
        }));
        setRankingData(formattedTop3);
        console.log(res);
      } catch (err) {
        const e = err as AxiosError;
        console.error("Top3 랭킹 불러오기 실패", e);
        console.error("에러 응답:", e?.response?.data);
      }
    };
    fetchTop3();
  }, [activeTab]);

  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>
      <div className="header-wrapper">
        <MediumTitle>Group</MediumTitle>
        <MoveRightTitle
          title="내 그룹"
          subtitle=""
          to="/groupfeeds"
          onClick={(e) => {
            if (!isJoined) {
              e.preventDefault();
              alert("가입한 그룹이 없습니다 🥲");
            }
          }}
        />
      </div>

      <PeriodTabsbar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="scrollable-content">
        <h3>🏆명예의 전당🏆</h3>
        <Top3Ranking data={rankingData} />

        <h3 style={sectionTitleStyle}>모든 그룹</h3>
        <div className="group-card-grid">
          {group.map((item, index) => (
            <SmallGroupCard
              key={index}
              id={item.id}
              title={item.title}
              isAccessible={item.isAccessible}
              memberCount={item.memberCount || 0}
              maxMember={item.maxMember}
              onClick={() => navigate(`/newgroup/${item.id}`)}
            />
          ))}
        </div>
      </div>

      <div className="buttonPosition">
        <button
          className="floatingButtonStyle"
          onClick={() => navigate("/create-group")}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Group;

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  width: "100%",
  height: "100vh",
  padding: "0 25px",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "24px 0 12px 0",
};

const responsiveCSS = `
  .header-wrapper {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    padding: 16px 16px 8px 16px;
    border-bottom: 1px solid #eee;
  }
  .scrollable-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 16px 50px 16px;
  }
  .small-card-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }
  .group-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 16px;
  }
  .buttonPosition {
    position: relative;
    bottom: 68px;
    align-self: flex-end;
    right: 16px;
    z-index: 1000;
  }
  .floatingButtonStyle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #FFB6C1;
    color: white;
    font-size: 32px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;
