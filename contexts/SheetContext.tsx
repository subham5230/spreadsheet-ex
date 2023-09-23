'use client';
import {
  Dispatch,
  createContext,
  useContext,
  useReducer,
  ReactNode
} from 'react';

import { CellProps, Sheet, SheetRow } from '@/types';

interface SheetProviderProps {
  children: ReactNode;
}

type SheetAction =
  | { type: 'UPDATE_SHEET'; payload: Sheet }
  | { type: 'UPDATE_SELECTED_CELL'; payload: any }; // Replace 'any' with the actual type of selectedCell

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
function updateSelectedCell(sheet: Sheet, actionPayload: any): Sheet {
  // Replace 'any' with the actual type of selectedCell
  return {
    ...sheet,
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
    value: '',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
    textAlign: 'left',
    fontSize: 12,
    fontFamily: 'sans-serif',
    textColor: 'black',
    backgroundColor: 'white'
  };

  const sheet: SheetRow[] = [];

  for (let i = 0; i < 100; i++) {
    const Row: SheetRow = [];
    for (let j = 0; j < 26; j++) {
      Row.push({
        ...initialCell,
        id: `${String.fromCharCode(j + 65)}${i + 1}`
      });
    }
    sheet.push(Row);
  }

  return sheet;
}
