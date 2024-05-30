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
    500
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
    if (cell.rowIndex < 0 || cell.colIndex < 0) return;

    const payload: SheetAction = {
      type: 'UPDATE_SELECTED_CELL',
      payload: cell
    };
    dispatch(payload);
  }

  return list;
}
