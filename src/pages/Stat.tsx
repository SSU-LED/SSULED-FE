import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { apiClient } from "../api/apiClient";

import styles from "../styles/Stat.module.css";

interface HeatmapValue {
  date: string;
  count: number;
}

interface Props {
  values: HeatmapValue[];
}

interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  startDate: string;
  endDate: string;
}

interface WorkoutData {
  data: {
    date: string;
    didWorkout: boolean;
  }[];
  streakInfo: StreakInfo;
  day: {
    dawn: number;
    morning: number;
    afternoon: number;
    night: number;
  };
  exercise: {
    chest: number;
    back: number;
    legs: number;
    core: number;
    sports: number;
    shoulders_arms: number;
    cardio: number;
    other: number;
  };
}

const grayscaleColors = [
  '#f8f9fa', // 거의 흰색
  '#e9ecef',
  '#dee2e6',
  '#ced4da',
  '#adb5bd',
  '#6c757d',
  '#495057',
  '#343a40',
  '#212529', // 거의 검정
];

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

  const startDate = new Date(rawStart.getTime() + 9 * 60 * 60 * 1000);
  const endDate = new Date(rawEnd.getTime() + 9 * 60 * 60 * 1000);

  return { startDate, endDate };
}

export function ThreeMonthHeatmap({ values }: Props) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [quarter, setQuarter] = useState(
    Math.floor(new Date().getMonth() / 3) + 1
  );

  const { startDate, endDate } = getQuarterDateRange(year, quarter);

  const goToPrevQuarter = () => {
    if (quarter === 1) {
      setQuarter(4);
      setYear((prev) => prev - 1);
    } else {
      setQuarter((prev) => prev - 1);
    }
  };

  const goToNextQuarter = () => {
    if (quarter === 4) {
      setQuarter(1);
      setYear((prev) => prev + 1);
    } else {
      setQuarter((prev) => prev + 1);
    }
  };

  return (
    <div style={heatmapCardStyle}>
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
  const month = now.getMonth();
  const quarter = Math.floor(month / 3) + 1;
  return { year, quarter };
}

const Stat = () => {
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);

  useEffect(() => {
    const { year, quarter } = getCurrentYearAndQuarter();
    const getStatistics = async () => {
      try {
        const res = await apiClient.get("/statistics/user/stats", {
          params: { year, quarter },
        });
        setWorkoutData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getStatistics();
  }, []);

  if (!workoutData) return <div>Loading...</div>;

  const heatmapValues: HeatmapValue[] =
    workoutData.data?.map((d) => ({
      date: d.date,
      count: d.didWorkout ? 1 : 0,
    })) ?? [];

  const rawTimeRangeData = [
    { id: 1, label: "dawn", commits: workoutData.day?.dawn ?? 0 },
    { id: 2, label: "morning", commits: workoutData.day?.morning ?? 0 },
    { id: 3, label: "afternoon", commits: workoutData.day?.afternoon ?? 0 },
    { id: 4, label: "night", commits: workoutData.day?.night ?? 0 },
  ];

  const rawPartData = [
    { id: "가슴", value: workoutData.exercise?.chest ?? 0 },
    { id: "등", value: workoutData.exercise?.back ?? 0 },
    { id: "하체", value: workoutData.exercise?.legs ?? 0 },
    { id: "코어", value: workoutData.exercise?.core ?? 0 },
    { id: "스포츠", value: workoutData.exercise?.sports ?? 0 },
    { id: "어깨/팔", value: workoutData.exercise?.shoulders_arms ?? 0 },
    { id: "유산소", value: workoutData.exercise?.cardio ?? 0 },
    { id: "기타", value: workoutData.exercise?.other ?? 0 },
  ].filter((item) => item.value > 0);

  const emojiMap: { [key: string]: string } = {
    dawn: "🌅",
    morning: "🌞",
    afternoon: "🌇",
    night: "🌙",
  };

  const totalCommits = rawTimeRangeData.reduce(
    (sum, item) => sum + item.commits,
    0
  );

  const timeRangeData = rawTimeRangeData.map((item) => ({
    ...item,
    emoji: emojiMap[item.label] || "❓",
    percent:
      totalCommits > 0 ? ((item.commits / totalCommits) * 100).toFixed(1) : "0",
  }));

  let topTimeMessage = "당신의 활동 패턴을 분석할 수 없어요.";

  if (totalCommits > 0) {
    const topTimeRange = [...rawTimeRangeData].sort(
      (a, b) => b.commits - a.commits
    )[0];

    const timeMessageMap: { [key: string]: string } = {
      dawn: "당신은 새벽을 깨우는 닭!\n 누구보다 빠르게 하루를 시작하네요! 🐓",
      morning: "당신은 부지런한 다람쥐!\n 아침 햇살과 함께 움직이네요! 🐿️",
      afternoon: "당신은 낮의 호랑이,\n 집중력이 아주 좋아요! 🐯",
      night:
        "당신은 밤의 사냥꾼 올빼미!\n 고요한 밤, 최고의 컨디션을 발휘하네요! 🦉",
    };

    topTimeMessage = timeMessageMap[topTimeRange.label] || topTimeMessage;
  }

  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>
      <div className={styles.headerWrapper}>
        <div className={styles.mainTitle}>Stat</div>
      </div>

      <div className={styles.scrollableContent}>

        <div>
          <div className={styles.subTitle}>Streak 🎖️</div>
          <div>
            <ThreeMonthHeatmap values={heatmapValues} />
          </div>
        </div>

        <div>
          <div className={styles.subTitle}>선호도 분석 💗</div>
          {rawPartData.length === 0 ? (
            <p style={noDataStyle}>
              당신의 선호도를 분석할 수 없어요.
            </p>
          ) : (
            <div style={{ height: 250 }}>
              <ResponsivePie
                data={rawPartData}
                margin={{ top: 30, right: 100, bottom: 30, left: 100 }}
                innerRadius={0.65}
                padAngle={1}
                cornerRadius={2}
                colors={grayscaleColors}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                legends={[
                  {
                    anchor: "bottom",
                    direction: "row",
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    symbolSize: 18,
                  },
                ]}
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: 80 }}>
          <div className={styles.subTitle}>시간대 분석 🕐</div>
          <p
            style={noDataStyle}
          >
            {topTimeMessage}
          </p>

          <div style={{ marginTop: 20 }}>
            {timeRangeData.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div style={{ width: 24 }}>{item.id}</div>
                <div style={{ width: 24 }}>{item.emoji}</div>
                <div style={{ width: 80 }}>{item.label}</div>
                <div style={{ width: 80 }}>{item.commits} commits</div>
                <div
                  style={{
                    flex: 1,
                    marginLeft: 4,
                    marginRight: 4,
                    background: "#eee",
                    height: 8,
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      width: `${item.percent}%`,
                      height: "100%",
                      background: "black",
                      borderRadius: 4,
                    }}
                  ></div>
                </div>
                <div style={{ width: 40 }}>{item.percent}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  width: "100%",
  height: "100vh",
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
    padding: 0 16px 16px 16px;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .scrollable-content::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    flex: 1;
    overflow-y: auto;
    padding: 0 16px;
  }

  button {
    margin-right: 8px;
    padding: 8px 12px;
    background-color: transparent;
    color: black;
    border: none;
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
  }

  button:hover {
    color: black;
  }
`;

const navStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  marginBottom: 8,
};

const arrowBtnStyle: React.CSSProperties = {
  background: "trasparent",
  padding: "4px 10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "background 0.2s",
};

const noDataStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "30px",
  backgroundColor: "#f8f8f8",
  borderRadius: "12px",
  color: "#666",
  whiteSpace: "pre-line",
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
