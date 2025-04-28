import React, { useState } from "react";
import MediumTitle from "../components/title/MediumTitle";
import { ResponsiveCalendar } from '@nivo/calendar'
import data from "../store/dummyData"
import { ResponsivePie } from '@nivo/pie';

  const preferenceData = [
    { id: '가슴', label: '가슴', value: 30 },
    { id: '등', label: '등', value: 20 },
    { id: '하체', label: '하체', value: 25 },
    { id: '코어', label: '코어', value: 5 },
    { id: '어깨&팔', label: '어깨&팔', value: 5 },
    { id: '유산소', label: '유산소', value: 10 },
    { id: '기타', label: '기타', value: 5 },
  ];

  const rawTimeRangeData = [
    { id: 1, label: "Morning", commits: 36 },
    { id: 2, label: "Daytime", commits: 200 },
    { id: 3, label: "Evening", commits: 256 },
    { id: 4, label: "Night", commits: 40 },
  ];
  
  const emojiMap: { [key: string]: string } = {
    Morning: "🌅",
    Daytime: "🌞",
    Evening: "🌇",
    Night: "🌙",
  };
  
  const totalCommits = rawTimeRangeData.reduce((sum, item) => sum + item.commits, 0);
  
  const timeRangeData = rawTimeRangeData.map(item => ({
    ...item,
    emoji: emojiMap[item.label] || "❓",  
    percent: totalCommits > 0 ? ((item.commits / totalCommits) * 100).toFixed(1) : 0,
  }));

function GroupFeeds() {
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [year, setYear] = useState(2016);

  const handlePrevQuarter = () => {
    setSelectedQuarter((prevQuarter) => {
      let newQuarter = prevQuarter === 1 ? 4 : prevQuarter - 1;
      return newQuarter;
    });
  
    setYear((prevYear) => {
      // 1분기로 돌아가면 연도 감소
      if (selectedQuarter === 1) {
        return prevYear - 1;
      }
      return prevYear;
    });
  };
  
  const handleNextQuarter = () => {
    setSelectedQuarter((prevQuarter) => {
      let newQuarter = prevQuarter === 4 ? 1 : prevQuarter + 1;
      return newQuarter;
    });
  
    setYear((prevYear) => {
      // 4분기에서 1분기로 넘어가면 연도 증가
      if (selectedQuarter === 4) {
        return prevYear + 1;
      }
      return prevYear;
    });
  };

  const getQuarterData = (quarter: number, year: number) => {
    switch (quarter) {
      case 1:
        return { from: `${year}-01-01`, to: `${year}-03-31`, label: `${year}년 1분기` };
      case 2:
        return { from: `${year}-04-01`, to: `${year}-06-30`, label: `${year}년 2분기` };
      case 3:
        return { from: `${year}-07-01`, to: `${year}-09-30`, label: `${year}년 3분기` };
      case 4:
        return { from: `${year}-10-01`, to: `${year}-12-31`, label: `${year}년 4분기` };
      default:
        return { from: `${year}-01-01`, to: `${year}-03-31`, label: `${year}년 1분기` };
    }
  };

  const { from, to, label } = getQuarterData(selectedQuarter, year);

  return (
    <div style={pageStyle}>
      <style>{responsiveCSS}</style>

    <div className="header-wrapper">
        <MediumTitle>Stat</MediumTitle>
    </div>

    <div className="no-scrollbar" style={scrollAreaStyle}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <button onClick={handlePrevQuarter}>{"<"}</button>
          <h3 style={{ margin: '0 10px' }}>현재 분기: {label}</h3>
          <button onClick={handleNextQuarter}>{">"}</button>
        </div>


      <div>
        <h2>Streak 🎖️</h2>
        <div style={{ height: 200 }}>
          <ResponsiveCalendar
            data={data}
            from={from}
            to={to}
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
              },
            ]}
          />
        </div>
      </div>

      <div>
          <h3>선호도 분석 💗</h3>
          <div style={{ height: 250 }}>
              <ResponsivePie
              data={preferenceData}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={1}
              cornerRadius={2}
              colors={{ scheme: 'paired' }}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              legends={[
                  {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  symbolSize: 18,
                  },
                ]}
              />
          </div>
        </div >

        <div style={{ marginBottom: 80 }}>    
          <div>
            <h3>시간대 분석 🕐</h3>
            <div style={{ marginTop: 20 }}>
              {timeRangeData.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ width: 24 }}>{item.id}</div>
                  <div style={{ width: 50 }}>{item.emoji}</div>
                  <div style={{ width: 100 }}>{item.label}</div>
                  <div style={{ width: 60 }}>{item.commits} commits</div>
                  <div style={{ flex: 1, marginLeft: 8, marginRight: 8, background: "#eee", height: 8, borderRadius: 4 }}>
                    <div style={{ width: `${item.percent}%`, height: "100%", background: "black", borderRadius: 4 }}></div>
                  </div>
                  <div style={{ width: 40 }}>{item.percent}%</div>
                </div>
              ))}
            </div>
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
    display: none;                  /* Chrome, Safari */
  }
  
  .image-scroll-container {
    overflow-x: auto;
    padding: 12px 0;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }
  .image-scroll-container::-webkit-scrollbar {
    display: none;
  }
  .image-scroll-container::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
  .image-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .image-card-grid {
    display: flex;
    flex-wrap: nowrap;
    gap: 12px;
  }
  .image-card-grid > * {
    flex-shrink: 0;
    min-width: 220px;
  }
  
  .small-card-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  }

  button:hover {
    background-color: transparent;
    color: #FFB6C1;
  }
`;
