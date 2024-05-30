'use client';
import {
  SheetAction,
  useSheet,
  useSheetDispatch
} from '@/contexts/SheetContext';
import { useDebounce } from '@/hooks/useDebounce';
import { CellProps, Sheet } from '@/types';
import * as React from 'react';
import { AiOutlineFunction } from 'react-icons/ai';
export interface IAddressBarProps {}

export default function AddressBar(props: IAddressBarProps) {
  const sheet = useSheet();
  const dispatch = useSheetDispatch();

  const [addressBarInput, setAddressBarInput] = React.useState<string>('');

  React.useEffect(() => {
    if (sheet?.selectedCell) {
      setAddressBarInput(sheet.selectedCell.value);
    }
  }, [sheet?.selectedCell]);

  const handleDebouncedInput = useDebounce((input: string, cell: CellProps) => {
    handleValueInput(input, cell);
  }, 500);

  if (!sheet) return null;

  return (
    <div className="flex items-center w-full h-full bg-white p">
      <div className="w-[8rem] h-full">
        {sheet && sheet.selectedCell && <div>{sheet.selectedCell.id}</div>}
      </div>
      <div className="h-[60%] w-0 border"></div>
      <div className="flex flex-1 h-full items-center">
        <div>
          <AiOutlineFunction className="text-xl text-slate-500" />
        </div>
        <div className="flex-1 h-full">
          <input
            value={addressBarInput}
            className="w-full h-full outline-none ml-2"
            type="text"
            onChange={e => {
              setAddressBarInput(e.target.value);
              handleDebouncedInput(e.target.value, sheet.selectedCell);
            }}
          />
        </div>
      </div>
    </div>
  );

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
}
