import { useEffect, useState } from "react";
import MediumTitle from "../components/title/MediumTitle";
import { ResponsivePie } from "@nivo/pie";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, addDays } from "date-fns";
import { apiClient } from "../api/apiClient";

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
        <button onClick={goToPrevQuarter} style={arrowBtnStyle}>
          ←
        </button>
        <span style={{ fontWeight: 500 }}>
          {startDate.toISOString().slice(0, 10)} ~{" "}
          {endDate.toISOString().slice(0, 10)}
        </span>
        <button onClick={goToNextQuarter} style={arrowBtnStyle}>
          →
        </button>
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

const Stat = () => {
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);

  useEffect(() => {
    const { year, quarter } = getCurrentYearAndQuarter();
    const getStatistics = async () => {
      try {
        const res = await apiClient.get("/statistics/user/stats", {
          params: { year, quarter },
        });
        console.log(res);
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
  ];

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

  return (
    <div style={pageStyle}>
      <style>{responsiveCSS}</style>
      <div className="header-wrapper">
        <MediumTitle>Stat</MediumTitle>
      </div>

      <div className="no-scrollbar" style={scrollAreaStyle}></div>
      <div>
        <div>
          <h2 style={{ marginTop: "0px" }}>Streak 🎖️</h2>
          <div style={{ height: 200 }}>
            <ThreeMonthHeatmap values={heatmapValues} />
          </div>
        </div>

        <div>
          <h3 style={{ marginTop: "100px" }}>선호도 분석 💗</h3>
          <div style={{ height: 250 }}>
            <ResponsivePie
              data={rawPartData}
              margin={{ top: 30, right: 100, bottom: 30, left: 100 }}
              innerRadius={0.5}
              padAngle={1}
              cornerRadius={2}
              colors={{ scheme: "paired" }}
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
        </div>

        <div style={{ marginBottom: 80 }}>
          <h3>시간대 분석 🕐</h3>
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
                <div style={{ width: 50 }}>{item.emoji}</div>
                <div style={{ width: 100 }}>{item.label}</div>
                <div style={{ width: 60 }}>{item.commits} commits</div>
                <div
                  style={{
                    flex: 1,
                    marginLeft: 8,
                    marginRight: 8,
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

const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  overflowY: "scroll",
  padding: "0px 25px",
};

const scrollAreaStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  padding: "16px",
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
    color: #FFB6C1;
  }
`;
const navStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
};

const arrowBtnStyle: React.CSSProperties = {
  background: "white",
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "4px 10px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background 0.2s",
};
