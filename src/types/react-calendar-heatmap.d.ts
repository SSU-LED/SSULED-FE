declare module 'react-calendar-heatmap' {
    import * as React from 'react';
  
    export interface CalendarHeatmapValue {
      date: string;
      count?: number;
    }
  
    export interface CalendarHeatmapProps {
      startDate: Date | string;
      endDate: Date | string;
      values: CalendarHeatmapValue[];
      classForValue?: (value: CalendarHeatmapValue) => string;
      tooltipDataAttrs?: (value: CalendarHeatmapValue) => object;
      showWeekdayLabels?: boolean;
      gutterSize?: number;
      horizontal?: boolean;
    }
  
    const CalendarHeatmap: React.FC<CalendarHeatmapProps>;
    export default CalendarHeatmap;
  }
  