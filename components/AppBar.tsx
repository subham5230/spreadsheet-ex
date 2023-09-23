import * as React from 'react';
import { LuFileSpreadsheet } from 'react-icons/lu';

export interface IAppBarProps {}

export default function AppBar(props: IAppBarProps) {
  return (
    <div className="flex px-4 py-2">
      <div className="w-10">
        <LuFileSpreadsheet className="w-full h-full text-[#00AC47]" />
      </div>
      <div>
        <div className="text-[18px] font-[500] pl-2">Spreadsheet EX</div>
        <div className="flex gap-1 text-sm">
          <button className="rounded hover:bg-slate-200 px-2 py-[2px]">
            Home
          </button>
          <button className="rounded hover:bg-slate-200 px-2 py-[2px]">
            File
          </button>
          <button className="rounded hover:bg-slate-200 px-2 py-[2px]">
            Insert
          </button>
          <button className="rounded hover:bg-slate-200 px-2 py-[2px]">
            Layout
          </button>
        </div>
      </div>
    </div>
  );
}
