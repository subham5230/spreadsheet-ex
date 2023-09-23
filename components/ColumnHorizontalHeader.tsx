import { INITIAL_COLS } from '@/types';
import * as React from 'react';

export interface IColumnHorizontalHeaderProps {}

export default function ColumnHorizontalHeader(
  props: IColumnHorizontalHeaderProps
) {
  const list: React.ReactNode[] = [];

  for (let i = 0; i < INITIAL_COLS; i++) {
    list.push(
      <div
        key={'col_header_' + i}
        className="border flex w-[4rem] justify-center items-center bg-white"
      >
        {String.fromCharCode(i + 65)}
      </div>
    );
  }

  return list;
}
