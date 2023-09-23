'use client';
import ColumnHorizontalHeader from '@/components/ColumnHorizontalHeader';
import RowVerticalHeader from '@/components/RowVerticalHeader';
import Sheet from '@/components/Sheet';

export default function Home() {
  return (
    <div className=" min-w-fit border">
      <div className="h-[2rem] flex  sticky z-20 top-0">
        <div className="h-[2rem] min-w-[2rem] bg-slate-200"></div>
        <div className="flex">
          <ColumnHorizontalHeader />
        </div>
      </div>
      <div className="flex">
        <div className="w-[2rem] sticky left-0 z-10">
          <RowVerticalHeader />
        </div>
        <div>
          <Sheet />
        </div>
      </div>
    </div>
  );
}
