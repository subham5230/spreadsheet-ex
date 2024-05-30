'use client';
import * as React from 'react';
import { ReactNode } from 'react';
import {
  useSheet,
  useSheetDispatch,
  SheetAction
} from '@/contexts/SheetContext';
import { CellProps, Sheet } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import { Cell } from './Cell';

export interface ISheetProps {}

export default function SheetMain(props: ISheetProps) {
  const sheet = useSheet();
  const dispatch = useSheetDispatch();
  const handleDebouncedCellInput = useDebounce(
    (input: string, cell: CellProps) => {
      handleValueInput(input, cell);
    },
    100
  );

  if (!dispatch || !sheet || !sheet.cells) return [];

  const list: ReactNode[] = [];
  const cells = sheet.cells;
  let itr = 0;

  for (const row of cells) {
    itr++;
    const cellBlocks = [];
    for (const cell of row) {
      cellBlocks.push(
        <div key={'con_' + cell.id}>
          <Cell
            cell={cell}
            setSelectedCell={setSelectedCell}
            handleDebouncedCellInput={handleDebouncedCellInput}
            selectedCell={sheet.selectedCell}
          />
        </div>
      );
    }
    list.push(
      <div className="flex" key={'row_' + itr}>
        {...cellBlocks}
      </div>
    );
  }

  function setSelectedCell(cell: CellProps) {
    if (!dispatch) return;
    dispatch({ type: 'UPDATE_SELECTED_CELL', payload: cell });
  }

  function handleValueInput(input: string, cell: CellProps) {
    const cellCopy: CellProps = { ...cell };
    cellCopy.value = input;

    updateSelectedCellProps(cellCopy);
  }

  function updateSelectedCellProps(cell: CellProps) {
    if (!dispatch) return;
    if (!sheet) return;

    const sheetCopy: Sheet = { ...sheet };

    if (!sheetCopy) return;

    if (cell.rowIndex < 0 || cell.colIndex < 0) return;

    sheetCopy.cells[cell.rowIndex][cell.colIndex] = cell;

    sheetCopy.selectedCell = cell;

    const payload: SheetAction = {
      type: 'UPDATE_SHEET_AND_SELECTED_CELL',
      payload: sheetCopy
    };
    dispatch(payload);
  }

  return list;
}
