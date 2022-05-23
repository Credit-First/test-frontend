import { useEffect, useState } from 'react';
import { useFindTicker } from '@/hooks/useFindTicker';
import { ResponsiveLine } from '@nivo/line';

function LineChart() {
  const { getPrice, data, timestamp }: any = useFindTicker();
  const [averageTickerValue, setAverageTickerValue] = useState<any>({
    id: 'average_price',
    color: 'hsl(70, 70%, 50%)',
    data: [],
  });

  useEffect(() => {
    getPrice();
    setInterval(() => {
      getPrice();
    }, 2 * 1000);
  }, []);

  useEffect(() => {
    averageTickerValue.data.push({
      x: timestamp,
      y: data,
    });
  }, [data]);

  return (
    <div style={{ height: 400, maxWidth: '100%' }}>
      <div className='w-full text-center mt-4 font-bold text-2xl'>BTC/USD: {data}</div>
      <ResponsiveLine
        data={[averageTickerValue]}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        enableArea={true}
        theme={{ textColor: 'white' }}
        pointLabelYOffset={0}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        yFormat=' >-.2f'
        axisTop={null}
        axisRight={null}
        pointSize={10}
        useMesh={true}
        colors={['#028ee6', '#774dd7']}
        pointColor='white'
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        enableSlices="x"
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 100,
            translateY: 0, 
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
export default LineChart;
