export const INITIAL_ROWS = 100;

export const INITIAL_COLS = 26;

export type CellProps = {
  id: string;
  rowIndex: number;
  colIndex: number;
  value: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  textAlign: TextAlign;
  fontSize: FontSize;
  fontFamily: FontFamily;
  textColor: string;
  backgroundColor: string;
};

export type SheetRow = CellProps[];

export type Sheet = {
  selectedCell: CellProps | null;
  cells: SheetRow[];
};

export type FontFamily =
  | 'Arial'
  | 'Verdana'
  | 'Tahoma'
  | 'Roboto'
  | 'Helvetica'
  | 'Sans-serif'
  | 'Serif'
  | 'Monospace';

export const FontFamilyOptions: FontFamily[] = [
  'Arial',
  'Verdana',
  'Tahoma',
  'Roboto',
  'Helvetica',
  'Sans-serif',
  'Serif',
  'Monospace'
];

export type FontSize = '12' | '14' | '16' | '18' | '20' | '22';

export const FontSizeOptions: FontSize[] = ['12', '14', '16', '18', '20', '22'];

export type TextAlign = 'left' | 'center' | 'right';
