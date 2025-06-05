import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useEffect, useState } from "react";
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
  updatedAt: string;
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

function getQuarterDateRange(
  year: number,
  quarter: number
): {
  startDate: Date;
  endDate: Date;
} {
  const startMonth = (quarter - 1) * 3;
  const rawStart = new Date(year, startMonth, 1);
  const rawEnd = new Date(year, startMonth + 3, 0);

  // KST 보정: UTC → +9시간
  const startDate = new Date(rawStart.getTime() + 9 * 60 * 60 * 1000);
  const endDate = new Date(rawEnd.getTime() + 9 * 60 * 60 * 1000);

  return { startDate, endDate };
}

export function ThreeMonthHeatmap({ values }: Props) {
  const now = new Date();
  const initialYear = now.getFullYear();
  const initialQuarter = Math.floor(now.getMonth() / 3) + 1;

  const [{ year, quarter }, setQuarterInfo] = useState({
    year: initialYear,
    quarter: initialQuarter,
  });

  const { startDate, endDate } = getQuarterDateRange(year, quarter);

  const goToPrevQuarter = () => {
    if (quarter === 1) {
      setQuarterInfo({ year: year - 1, quarter: 4 });
    } else {
      setQuarterInfo({ year, quarter: quarter - 1 });
    }
  };

  const goToNextQuarter = () => {
    if (quarter === 4) {
      setQuarterInfo({ year: year + 1, quarter: 1 });
    } else {
      setQuarterInfo({ year, quarter: quarter + 1 });
    }
  };
  return (
    <div style={{ marginTop: 20, width: "100%" }}>
      <style>
        {`
          .react-calendar-heatmap rect {
            rx: 2px;
            ry: 2px;
          }
          .react-calendar-heatmap text {
            font-size: 6px;
            fill: #999;
          }
        `}
      </style>
      <div style={navStyle}>
        <button onClick={goToPrevQuarter} style={arrowBtnStyle}>
          {"<"}
        </button>
        <span style={dateRangeTextStyle}>
          {startDate.toISOString().slice(0, 10)} ~ {endDate.toISOString().slice(0, 10)}
        </span>
        <button onClick={goToNextQuarter} style={arrowBtnStyle}>
          {">"}
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: 300 }}>
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
            classForValue={(value) => {
              if (!value || value.count === 0) return "color-empty";
              return `color-github-${value.count}`;
            }}
            showWeekdayLabels={false}
            tooltipDataAttrs={(value: any) => ({
              "data-tip": `${value.date} - 활동: ${value.count}`,
            })}
          />
        </div>
      </div>
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

function GroupStatistics({group}: { group: MyGroup | null }) {
  const [ranking, setRanking] = useState<MyGroupRank | null>(null);
  const [myGroupStat, setMyGroupStat] = useState<MyGroupStat | null>(null);

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

  return (<>
      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div>
          <div style={rankingStyle}>
            <div style={{fontSize: "20px", fontWeight: "600"}}>Current Rank 🏆</div>
            {ranking && group && (
              <p>
                <strong style={{ color: "#4CAF50" }}>{group.title}</strong>의
                현재 등수는{" "}
                <strong style={{ color: "#FF9800" }}>{ranking.rank}등</strong>
                입니다.
              </p>
            )}
          </div>
          <div style={{ marginTop: "24px", position: "sticky", fontSize: "1.2rem", fontWeight: "bold" }}>Streak 🎖️</div>
          <div style={heatmapCardStyle}>
            {group && <ThreeMonthHeatmap values={heatmapValues} />}
          </div>
        </div>
      </div>
      </>
  );
}

export default GroupStatistics;

const scrollAreaStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
};

const rankingStyle: React.CSSProperties = {
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "16px",
  marginBottom: "16px",
  textAlign: "center",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
};

const arrowBtnStyle: React.CSSProperties = {
  background: "white",
  padding: "4px 10px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background 0.2s",
  border: "none",
  outline: "none",
  fontWeight: "bold",
};


const heatmapCardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "16px",
};

const dateRangeTextStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: "16px",
};
