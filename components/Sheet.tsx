'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import { useSheet, useSheetDispatch } from '@/contexts/SheetContext';

export interface ISheetProps {}

export default function Sheet(props: ISheetProps) {
  const sheet = useSheet();
  const dispatch = useSheetDispatch();

  if (!dispatch || !sheet || !sheet.cells) return [];

  const list: ReactNode[] = [];
  const cells = sheet.cells;
  let itr = 0;
  for (const row of cells) {
    itr++;
    const cellBlocks = [];
    for (const cell of row) {
      cellBlocks.push(
        <div
          key={'c_' + cell.id}
          contentEditable
          className={`flex w-[4rem] h-[2rem] truncate outline-none ${
            sheet.selectedCell === cell.id
              ? 'border-[#1A73E8] border-2'
              : 'border'
          }`}
          onClick={() => setSelectedCell(cell.id)}
        >
          {cell.value}
        </div>
      );
    }
    list.push(
      <div className="flex" key={'row_' + itr}>
        {...cellBlocks}
      </div>
    );
  }

  function setSelectedCell(id: string) {
    if (!dispatch) return;
    dispatch({ type: 'UPDATE_SELECTED_CELL', payload: id });
  }

  return list;
}
