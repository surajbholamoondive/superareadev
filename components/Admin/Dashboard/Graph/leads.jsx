import React from 'react'
import { COLORS, ENQUIRED, VIEWED, WISHLISTED } from '@/text'
import { LineChart } from '@mui/x-charts/LineChart'

const LeadsLineChart = ({ data, yDataKeys, sortedData }) => {
  const leadKeys = {
    totalWishlisted: WISHLISTED,
    totalViewed: VIEWED,
    totalEnquired: ENQUIRED,
  }
  const getColorBasedOnIndex = (index) => {
    return COLORS[index % COLORS.length]
  }
  const seriesData = yDataKeys.map((key, index) => {
    const keyValue = sortedData.some((item) => item[key] > 0)
    return {
      data: sortedData.map((item) =>
        item[key] > 0 ? parseInt(item[key], 10) : ''
      ),
      label: keyValue ? leadKeys[key] : '',
      color: keyValue ? getColorBasedOnIndex(index) : 'white',
    }
  })
  const chartMargins = { right: 50, bottom: 30, left: 60 }
  const maxData = Math.max(...seriesData.flatMap((series) => series.data))
  const tickInterval = Math.ceil(maxData / 10)

  return (
    <div className={`flex items-center -ml-12 `}>
      <div className="ml-2 mt-2">
        <LineChart
          width={700}
          height={400}
          series={seriesData}
          margin={chartMargins}
          tooltip={{ trigger: 'axis' }}
          slotProps={{
            legend: {
              labelStyle: {
                marginBottom: 2,
                fontSize: "0.875rem",
              },
            },
          }}
          xAxis={[
            {
              scaleType: 'point',
              data: data,
              id: 'quarters',
              tickLabelStyle: {
                width: '60px',
                padding:'5px',
                fontWeight: 'bold'
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
            },
          }}
          yAxis={[
            {
              tickLabelStyle: {
                fill: 'black',
                fontWeight: 'bold',
              },
              tickInterval: tickInterval,
            },
          ]}
        />
      </div>
    </div>
  )
}
export default LeadsLineChart
