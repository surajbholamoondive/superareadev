import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { COLORS } from '@/text'
const CommonLineChart = ({ data, yDataKeys, sortedData }) => {
const getColorBasedOnIndex = (index) => {
return COLORS[index % COLORS.length];
  };

  const seriesData = yDataKeys.map((key, index) => ({
    data: sortedData.map((item) => (item[key] && parseInt(item[key], 10))),
    color: getColorBasedOnIndex(index),
  }));

  const chartMargins = { right: 50, bottom: 30, left: 60 };
  const maxData = Math.max(...seriesData.flatMap(series => series.data));
  const tickInterval = Math.ceil(maxData / 10);

  return (
    <div className={`flex items-center -ml-12 `}>
      <div className='flex h-[30px] -rotate-90 items-end text-[14px]'></div>
      <div className='ml-2 mt-2 text'>
        <LineChart
          width={700}
          height={400}
          series={seriesData}
          margin={chartMargins}
          tooltip={{ trigger: "axis" }}
          xAxis={[
            {
              scaleType: 'point',
              data: data,
              id: 'quarters',
              tickInterval: "auto",
             tickLabelStyle: {
                fontSize: 12,
                fontFamily: 'Poppins, Arial, Helvetica, sans-serif',
                fill: 'black',
                fontWeight: 'bold',
              },
            },
          ]}
          sx={{
            '.MuiMarkElement-root': {
              scale: '0',
            },
            '.MuiChartsAxis-directionX .MuiChartsAxis-tick': {
              stroke: 'none'
            }
          }}
          yAxis={[
            {
              tickLabelStyle: {
                fontSize: 12,
                fontFamily: 'Poppins, Arial, Helvetica, sans-serif',
                fill: 'black',
                fontWeight: 'bold',
              },
              tickInterval: tickInterval
            },
          ]}
        />
      </div>
    </div>
  );
};
export default CommonLineChart;

