import { CellProps } from '@/types';
import * as React from 'react';

export interface ICellProps {
  cell: CellProps;
  selectedCell: CellProps | null;
  setSelectedCell: (cell: CellProps) => void;
  handleDebouncedCellInput: (input: string, cell: CellProps) => void;
}

export function Cell(props: ICellProps) {
  const [cellValue, setCellValue] = React.useState(props.cell.value);

  React.useEffect(() => {
    setCellValue(props.cell.value);
  }, [props.cell.value]);

  return (
    <div
      key={'c_' + props.cell.id}
      className={`flex w-[4rem] h-[2rem] truncate relative outline-none ${
        props.selectedCell?.id === props.cell.id
          ? 'border-[#1A73E8] border-2'
          : 'border'
      }`}
    >
      <input
        className="w-full h-full outline-none bg-transparent"
        value={cellValue}
        onClick={() => props.setSelectedCell(props.cell)}
        onChange={e => {
          setCellValue(e.target.value);
          props.handleDebouncedCellInput(e.target.value, props.cell);
        }}
      />
    </div>
  );
}
