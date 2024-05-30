'use client';
import {
  Dispatch,
  createContext,
  useContext,
  useReducer,
  ReactNode
} from 'react';

import { CellProps, FontFamilyOptions, Sheet, SheetRow } from '@/types';

interface SheetProviderProps {
  children: ReactNode;
}

export type SheetAction =
  | { type: 'UPDATE_SHEET'; payload: SheetRow[] }
  | { type: 'UPDATE_SELECTED_CELL'; payload: CellProps };

type ActionHandler = {
  [key: string]: (sheet: Sheet, actionPayload: any) => Sheet; // Replace 'any' with a more specific type if possible
};

const SheetContext = createContext<Sheet | null>(null);

const SheetDispatchContext = createContext<Dispatch<SheetAction> | null>(null);

export function SheetProvider({ children }: SheetProviderProps) {
  const [sheet, dispatch] = useReducer(sheetReducer, intialSheet);

  return (
    <SheetContext.Provider value={sheet}>
      <SheetDispatchContext.Provider value={dispatch}>
        {children}
      </SheetDispatchContext.Provider>
    </SheetContext.Provider>
  );
}

export function useSheet() {
  return useContext(SheetContext);
}

export function useSheetDispatch() {
  return useContext(SheetDispatchContext);
}

const actionHandlers: ActionHandler = {
  UPDATE_SHEET: updateSheet,
  UPDATE_SELECTED_CELL: updateSelectedCell
};

function sheetReducer(sheet: Sheet, action: SheetAction): Sheet {
  const handler = actionHandlers[action.type];

  if (handler) {
    return handler(sheet, action.payload);
  }

  return sheet;
}

// Function to update the entire sheet
function updateSheet(sheet: Sheet, actionPayload: Sheet): Sheet {
  return actionPayload;
}

// Function to update only the selectedCell
function updateSelectedCell(sheet: Sheet, actionPayload: CellProps): Sheet {
  // Replace 'any' with the actual type of selectedCell
  const cellsCopy = [...sheet.cells];
  cellsCopy[actionPayload.rowIndex][actionPayload.colIndex] = {
    ...cellsCopy[actionPayload.rowIndex][actionPayload.colIndex],
    ...actionPayload
  };

  return {
    ...sheet,
    cells: cellsCopy,
    selectedCell: actionPayload
  };
}

const intialSheet = {
  selectedCell: null,
  cells: generateNewSheet()
};

function generateNewSheet(): SheetRow[] {
  const initialCell: CellProps = {
    id: '',
    rowIndex: 0,
    colIndex: 0,
    value: '',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
    textAlign: 'left',
    fontSize: '16',
    fontFamily: FontFamilyOptions[0],
    textColor: '#000000',
    backgroundColor: '#FFFFFF'
  };

  const sheet: SheetRow[] = [];

  for (let i = 0; i < 100; i++) {
    const Row: SheetRow = [];
    for (let j = 0; j < 26; j++) {
      Row.push({
        ...initialCell,
        id: `${String.fromCharCode(j + 65)}${i + 1}`,
        rowIndex: i,
        colIndex: j
      });
    }
    sheet.push(Row);
  }

  return sheet;
}
