import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import GroupTabsbar from "../../components/GroupTabsbar";
import { ResponsiveCalendar } from '@nivo/calendar'
import data from "../../store/dummyData"
import { useState, useEffect } from "react";

// 그룹 등수 정보를 받아오는 예시 함수 (API 호출)
const fetchGroupRanking = async () => {
  // API 호출 또는 데이터 처리 로직 (여기서는 더미 데이터)
  return {
    rank: 1, // 예시: 그룹 등수 1등
    groupName: "슈레딩거 고양이는 슈레드 치즈를 좋아해", // 그룹 이름
  };
};

function GroupFeeds() {
  const [ranking, setRanking] = useState<{ rank: number; groupName: string } | null>(null);

  // 그룹 등수 정보 가져오기
  useEffect(() => {
    const getRanking = async () => {
      const rankData = await fetchGroupRanking();
      setRanking(rankData);
    };

    getRanking();
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
      <MoveLeftTitle title="My Group" page="/group" />
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
            <ResponsiveCalendar
              data={data}
              from="2015-03-01"
              to="2016-07-12"
              emptyColor="#eeeeee"
              colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              yearSpacing={40}
              monthBorderColor="#ffffff"
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
              legends={[
              { 
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
              }]}
            />
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
