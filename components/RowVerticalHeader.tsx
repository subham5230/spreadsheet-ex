import { INITIAL_ROWS } from '@/types';
import * as React from 'react';

export interface IRowVerticalHeaderProps {}

export default function RowVerticalHeader(props: IRowVerticalHeaderProps) {
  const list: React.ReactNode[] = [];

  for (let i = 0; i < INITIAL_ROWS; i++) {
    list.push(
      <div
        key={'row_header_' + i}
        className="border flex justify-center items-center h-[2rem] bg-white"
      >
        {i + 1}
      </div>
    );
  }

  return list;
}
