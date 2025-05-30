import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import GroupTabsbar from "../../components/GroupTabsbar";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { apiClient } from "../../api/apiClient";

// 그룹 등수 정보를 받아오는 예시 함수 (API 호출)
const fetchGroupRanking = async () => {
  // API 호출 또는 데이터 처리 로직 (여기서는 더미 데이터)
  return {
    rank: 1, // 예시: 그룹 등수 1등
    groupName: "SSULED", // 그룹 이름
  };
};

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

const generateThreeMonthData = (startDate: Date, endDate: Date) => {
  const data = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    data.push({
      date: new Date(d).toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5),
    });
  }

  return data;
};

interface ThreeMonthHeatmapProps {
  groupId: number;
}

export function ThreeMonthHeatmap({groupId}: ThreeMonthHeatmapProps) {
  const [startDate, setStartDate] = useState(subDays(new Date(), 89));
  const [endDate, setEndDate] = useState(new Date());
  const [values, setValues] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    setValues(generateThreeMonthData(startDate, endDate));
  }, [startDate, endDate]);

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

  useEffect(() => {
    console.log("CalendarHeatmap values:", values);
  }, [values]);


  useEffect(() => {
      const getGroupStreaks = async () => {
        try {
          const response = await apiClient.get(`/statistics/group/streaks`, {
            params: {
              groupId: groupId,
              year: startDate.getFullYear(),
              quarter: Math.floor(startDate.getMonth() / 3) + 1,
            },
          });

          const apiData = response.data.data;
  
          const converted = apiData.map((item: { day: string; value: number }) => ({
            date: item.day,
            count: item.value,
          }));
          
          setValues(converted);
        } catch (error) {
          console.error("그룹 게시물 불러오기 실패:", error);
        }
      };
  
      if (groupId) {
        getGroupStreaks();
      }
    }, [groupId, startDate]);

  return (
    <div style={{ marginTop: 20, width: '100%' }}>
      <div style={navStyle}>
        <button onClick={goToPrevQuarter} style={arrowBtnStyle}>←</button>
        <span style={{ fontWeight: 500 }}>{startDate.toISOString().slice(0,10)} ~ {endDate.toISOString().slice(0,10)}</span>
        <button onClick={goToNextQuarter} style={arrowBtnStyle}>→</button>
      </div>

      <div style={{ marginTop: 10 }}>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          classForValue={(value) => {
            if (!value || value.count === 0) return 'color-empty';
            return `color-github-${value.count}`;
          }}
          showWeekdayLabels
          tooltipDataAttrs={(value: any) => ({
            'data-tip': `${value.date} - 활동: ${value.count}`,
          })}
        />
      </div>
    </div>
  );
}

function GroupFeeds() {
  const [ranking, setRanking] = useState<{ rank: number; groupName: string } | null>(null);
  const [group, setGroup] = useState<MyGroup | null>(null);

  // 그룹 등수 정보 가져오기
  useEffect(() => {
    const getRanking = async () => {
      const rankData = await fetchGroupRanking();
      setRanking(rankData);
    };

    getRanking();
  }, []);

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
          {ranking && (
            <div style={rankingStyle}>
              <h2>Current Rank 🏆</h2>
              <p>
                <span style={{ color: "#4CAF50" }}>{ranking.groupName}</span> 의 현재 등수는{" "}
                <span style={{ color: "#FF9800" }}>{ranking.rank} 등</span> 입니다.
              </p>
            </div>
          )}

          <h2 style={{marginTop: "50px"}}>Streak 🎖️</h2>
          <div style={{ height: 200 }}>
            {group && <ThreeMonthHeatmap groupId={group.id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupFeeds;

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