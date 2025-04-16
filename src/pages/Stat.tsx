import React from "react";
import MediumTitle from "../components/title/MediumTitle";
import { ResponsiveCalendar } from '@nivo/calendar'
import data from "../store/dummyData"
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import PeriodTabsbar from "../components/PeriodTabsbar";

const timeData = [
    { hour: '00', count: 2 },
    { hour: '01', count: 1 },
    { hour: '08', count: 10 },
    { hour: '12', count: 14 },
    { hour: '15', count: 8 },
    { hour: '20', count: 6 },
    // ... (24시간 기준)
  ];

  const preferenceData = [
    { id: '가슴', label: '가슴', value: 30 },
    { id: '등', label: '등', value: 20 },
    { id: '하체', label: '하체', value: 25 },
    { id: '코어', label: '코어', value: 5 },
    { id: '어깨&팔', label: '어깨&팔', value: 5 },
    { id: '유산소', label: '유산소', value: 10 },
    { id: '기타', label: '기타', value: 5 },
  ];

function GroupFeeds() {

  return (
    <div style={pageStyle}>
      <style>{responsiveCSS}</style>

    <div className="header-wrapper">
        <MediumTitle>Stat</MediumTitle>
    </div>
      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div>
          <h2>Streak 🎖️</h2>
          <div style={{ height: 200 }}>
            <ResponsiveCalendar
              data={data}
              from="2016-07-01"
              to="2016-07-30"
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
        <div>
          <PeriodTabsbar />
          <div>
              <h3>시간대 분석 🕐</h3>
              <div style={{ height: 200 }}>
                  <ResponsiveBar
                  data={timeData}
                  keys={['count']}
                  indexBy="hour"
                  margin={{ top: 20, right: 30, bottom: 40, left: 40 }}
                  padding={0.3}
                  colors={{ scheme: 'set2' }}
                  axisBottom={{ legend: '시간대', legendPosition: 'middle', legendOffset: 32 }}
                  axisLeft={{ legend: '활동 수', legendPosition: 'middle', legendOffset: -40 }}
                  />
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

`;
