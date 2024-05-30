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
        style={{
          border: 'none',
          outline: 'none',
          borderRadius: '0px',
          padding: '0px',
          margin: '0px',
          fontStyle: props.cell.isItalic ? 'italic' : 'normal',
          textDecoration: handleTextDecoration(),
          fontWeight: props.cell.isBold ? 'bold' : 'normal',
          fontSize: props.cell.fontSize + 'px',
          color: props.cell.textColor,
          backgroundColor: props.cell.backgroundColor,
          textAlign: props.cell.textAlign as 'left' | 'center' | 'right',
          fontFamily: props.cell.fontFamily
        }}
        value={cellValue}
        onClick={() => props.setSelectedCell(props.cell)}
        onChange={e => {
          setCellValue(e.target.value);
          props.handleDebouncedCellInput(e.target.value, props.cell);
        }}
      />
    </div>
  );

  function handleTextDecoration() {
    if (props.cell.isStrikethrough && props.cell.isUnderline) {
      return 'line-through underline';
    } else if (props.cell.isStrikethrough) {
      return 'line-through';
    } else if (props.cell.isUnderline) {
      return 'underline';
    } else {
      return 'none';
    }
  }
}
