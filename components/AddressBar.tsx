'use client';
import { useSheet } from '@/contexts/SheetContext';
import * as React from 'react';
import { AiOutlineFunction } from 'react-icons/ai';
export interface IAddressBarProps {}

export default function AddressBar(props: IAddressBarProps) {
  const sheet = useSheet();
  return (
    <div className="flex items-center w-full h-full bg-white p">
      <div className="w-[8rem] h-full">
        {sheet && sheet.selectedCell && <div>{sheet.selectedCell}</div>}
      </div>
      <div className="h-[60%] w-0 border"></div>
      <div className="flex flex-1 h-full items-center">
        <div>
          <AiOutlineFunction className="text-xl text-slate-500" />
        </div>
        <div className="flex-1 h-full">
          <input className="w-full h-full outline-none ml-2" type="text" />
        </div>
      </div>
    </div>
  );
}
