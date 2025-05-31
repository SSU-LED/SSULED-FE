import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import GroupTabsbar from "../../components/GroupTabsbar";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { apiClient } from "../../api/apiClient";

interface HeatmapValue {
  date: string;
  count: number;
}

interface Props {
  values: HeatmapValue[];
}

interface MyGroup {
  id: number;
  ownerUuid: string;
  memberUuid: string[];
  title: string;
  isAccessible: boolean;
  maxMember: number;
  createdAt: string;
  updatedAt: string
}

interface MyGroupStat {
  data: {
    day: string;
    value: number;
  }[];
}

interface MyGroupRank {
  groupId: number;
  score: number;
  rank: number;
}

export function ThreeMonthHeatmap({ values }: Props) {
  const [startDate, setStartDate] = useState(subDays(new Date(), 89));
  const [endDate, setEndDate] = useState(new Date());

  const goToPrevQuarter = () => {
    const newEnd = subDays(startDate, 1);
    const newStart = subDays(newEnd, 89);
    setStartDate(newStart);
    setEndDate(newEnd);
  };

  const goToNextQuarter = () => {
    const newStart = addDays(endDate, 1);
    const newEnd = addDays(newStart, 89);
    setStartDate(newStart);
    setEndDate(newEnd);
  };

  return (
    <div style={{ marginTop: 20, width: "100%" }}>
      <div style={navStyle}>
        <button onClick={goToPrevQuarter} style={arrowBtnStyle}>←</button>
        <span style={{ fontWeight: 500 }}>
          {startDate.toISOString().slice(0, 10)} ~ {endDate.toISOString().slice(0, 10)}
        </span>
        <button onClick={goToNextQuarter} style={arrowBtnStyle}>→</button>
      </div>

      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={values}
        classForValue={(value) => {
          if (!value || value.count === 0) return "color-empty";
          return `color-github-${value.count}`;
        }}
        showWeekdayLabels
        tooltipDataAttrs={(value: any) => ({
          "data-tip": `${value.date} - 활동: ${value.count}`,
        })}
      />
    </div>
  );
}

function getCurrentYearAndQuarter(): { year: number; quarter: number } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0부터 시작함 (0 = 1월)

  const quarter = Math.floor(month / 3) + 1;

  return { year, quarter };
}

function GroupStatistics() {
  const [ranking, setRanking] = useState<MyGroupRank | null>(null);
  const [group, setGroup] = useState<MyGroup | null>(null);
  const [myGroupStat, setMyGroupStat] = useState<MyGroupStat | null>(null);

  useEffect(() => {
    const getMyGroup = async () => {
      const response = await apiClient.get("/group/user");
      console.log("MyGroup data:", response.data);
      if (response.data) {
        setGroup(response.data);
      }
    };
    getMyGroup();
  }, []);

  // 그룹 등수 정보 가져오기
  useEffect(() => {
    const { year, quarter } = getCurrentYearAndQuarter();

    const getRanking = async () => {
      if (!group) return;

      try {
        const response = await apiClient.get(`/group/ranking/${group.id}`, {
          params: { groupId: group.id, year, quarter },
        });
        console.log(response); 
        setRanking(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getRanking();
  }, [group]);

  // 그룹 스릭 가져오기
  useEffect(() => {
    const { year, quarter } = getCurrentYearAndQuarter();
    
    const getOurStatistics = async () => {
      if (!group) return;
      try {
        const res = await apiClient.get("/statistics/group/streaks", {
          params: { groupId: group.id, year, quarter },
        });
        console.log(res);
        setMyGroupStat(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOurStatistics();
  }, [group]);

  const heatmapValues =
    myGroupStat?.data?.map((d) => ({
      date: d.day,
      count: d.value,
    })) ?? [];

  return (
    <div style={pageStyle}>
      <style>
        {`
          .no-scrollbar {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE */
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari */
          }
        `}
      </style>
      <div style={headerWrapperStyle}>
        <MoveLeftTitle title="My Group" page="/group" />
        {group && (
          <div style={centerTitleStyle}>{group.title}</div>
        )}
      </div>

      <div style={barStyle}>
        <GroupTabsbar />
      </div>
      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div>
          {/* 그룹 등수 표시 */}
          <div style={rankingStyle}>
            <h2>Current Rank 🏆</h2>
            {ranking && group && (
              <p>
                <strong style={{ color: "#4CAF50" }}>{group.title}</strong>의 현재 등수는{" "}
                <strong style={{ color: "#FF9800" }}>{ranking.rank}등</strong>입니다.
              </p>
            )}
          </div>
          <h2 style={{marginTop: "50px"}}>Streak 🎖️</h2>
          <div style={{ height: 200 }}>
            {group && <ThreeMonthHeatmap values={heatmapValues} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupStatistics;

const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
};

const scrollAreaStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  padding: "16px",
};

const barStyle: React.CSSProperties = {
  padding: "0 16px 16px 16px",
};

const rankingStyle: React.CSSProperties = {
  padding: "16px",
  backgroundColor: "#f0f4f8",
  borderRadius: "8px",
  marginBottom: "16px",
  textAlign: "center",
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
};

const arrowBtnStyle: React.CSSProperties = {
  background: 'white',
  border: '1px solid #ccc',
  borderRadius: '6px',
  padding: '4px 10px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background 0.2s',
};

const headerWrapperStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 16px",
  marginBottom: "8px",
  height: "50px",
};

const centerTitleStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  fontWeight: "bold",
  fontSize: "18px",
  whiteSpace: "nowrap",
  color: "#000", 
  zIndex: 101, 
};