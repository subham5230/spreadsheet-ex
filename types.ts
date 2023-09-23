export const INITIAL_ROWS = 100;

export const INITIAL_COLS = 26;

export type CellProps = {
  id: string;
  value: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  textAlign: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
};

export type SheetRow = CellProps[];

export type Sheet = {
  selectedCell: string | null;
  cells: SheetRow[];
};
