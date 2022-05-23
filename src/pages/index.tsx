import * as React from 'react';
import dynamic from 'next/dynamic';
const LineChart = dynamic(() => import('@/components/LineChart'), { ssr: false });
import TickerPairList from '@/components/TicketPairList';

export default function HomePage() {
  return (
    <main className='bg-zinc-700'>
      <section className='w-full text-white'>
        <div className='flex w-full flex-col lg:flex-row'>
          <div className='left-panel box-border flex w-full items-center justify-center p-4'>
            <div className='w-full rounded-2xl bg-dark p-2'>
              <LineChart/>
            </div>
          </div>
          <div className='right-panel box-border flex w-full items-start justify-start p-4'>
            <div className='w-full rounded-2xl bg-dark p-2'>
              <TickerPairList />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
