import * as React from 'react';
import { BarChart } from '@mui/x-charts';

export default function HorizontalBars({ data, label, color}) {
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
      };

    const seriesData = [
      {
        data: data?.map((item) => (item[label] > 0 ? parseInt(item[label], 10) : 0)),
        label,
        color,
      },
    ];
    const maxData = Math.ceil(Math.max(...seriesData[0].data));
    const tickInterval = Math.ceil(maxData / 10);
    const chartMargins = { right: 50, bottom: 30, left: 80 };
  
    return (
      <div className="flex items-center">
        <div>
          <BarChart
            width={300}
            height={250}
            dataset={data?.map((item) => ({
              city: item.city,
              displayCity: truncateText(item.city, 10),
              count: item[label],
            }))}
            margin={chartMargins}
            layout="horizontal"
            tooltip={{ trigger: 'axis' }}
            slotProps={{
              legend: {
                labelStyle: {
                  marginBottom: 2,
                  fontSize: '0.875rem',
                },
              },
              
            }}
            xAxis={[
              {
                scaleType: 'linear',
                min: 0,
                max: maxData,
                interval: tickInterval,
                tickLabelStyle: {
                  width: '80px',
                  padding: '5px',
                  fontWeight: 'bold',
                },
              },
            ]}
            sx={{
              '.MuiMarkElement-root': {
                scale: '0',
              },
              '.MuiChartsAxis-directionX .MuiChartsAxis-tick': {
                stroke: 'none',
              },
              '.MuiChartsLegend-mark': {
                width: '18px',
                height: '18px',
              },
              '.MuiTypography-root': {
                margin: 0,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: '0.00938em',
              }
            }}
            yAxis={[
              {
                scaleType: 'band',
                dataKey: 'displayCity',
                tickLabelStyle: {
                  width: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                },
              },
            ]}
            series={seriesData || []}
          />
        </div>
      </div>
    );
  }