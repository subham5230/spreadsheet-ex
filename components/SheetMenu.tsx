'use client';

import {
  SheetAction,
  useSheet,
  useSheetDispatch
} from '@/contexts/SheetContext';
import * as React from 'react';
import { BiCopy } from 'react-icons/bi';
import { FiScissors } from 'react-icons/fi';
import { MdContentPaste } from 'react-icons/md';
import { FaBold } from 'react-icons/fa6';
import { FaItalic } from 'react-icons/fa6';
import { FaUnderline } from 'react-icons/fa6';
import { FaStrikethrough } from 'react-icons/fa6';
import { FaAlignLeft } from 'react-icons/fa';
import { FaAlignCenter } from 'react-icons/fa6';
import { FaAlignRight } from 'react-icons/fa6';
import { TbLetterA } from 'react-icons/tb';
import { BsPaintBucket } from 'react-icons/bs';
import { Dropdown } from './ui/Dropdown';
import {
  CellProps,
  FontFamily,
  FontFamilyOptions,
  FontSize,
  FontSizeOptions,
  TextAlign
} from '@/types';
import { ColorPicker } from './ui/ColorPicker';
import { useDebounce } from '@/hooks/useDebounce';

export interface ISheetMenuProps {}

export default function SheetMenu(props: ISheetMenuProps) {
  React.useState(false);
  const sheet = useSheet();
  const dispatch = useSheetDispatch();

  const debounce = useDebounce((fn: (...args: any) => void) => {
    fn();
  }, 500);

  if (!sheet) return null;

  const textColorTrigger = (
    <div className="rounded-md text-[15px]">
      <TbLetterA />
      <div
        className="h-1 border border-black"
        style={{ backgroundColor: sheet.selectedCell?.textColor || '#000' }}
      ></div>
    </div>
  );

  const backgroundColorTrigger = (
    <div className="rounded-md text-[15px]">
      <BsPaintBucket />
      <div
        className="h-1 border border-black"
        style={{
          backgroundColor: sheet.selectedCell?.backgroundColor || '#fff'
        }}
      ></div>
    </div>
  );

  return (
    <div className="bg-[#EDF2FA] rounded-full h-full flex gap-x-4 items-center px-4 mx-4">
      <button>
        <BiCopy />
      </button>
      <button>
        <FiScissors />
      </button>
      <button>
        <MdContentPaste />
      </button>
      <div>
        <Dropdown
          options={FontFamilyOptions}
          selected={sheet.selectedCell?.fontFamily || FontFamilyOptions[0]}
          onChange={updateCellFontFamily}
          type="FontFamily"
        />
      </div>
      <div>
        <Dropdown
          options={FontSizeOptions}
          selected={sheet.selectedCell?.fontSize || '16'}
          onChange={updateCellFontSize}
          type="FontSize"
        />
      </div>
      <button
        onClick={toggleBold}
        className="rounded-md text-sm w-[30px] h-[30px] flex items-center justify-center"
        style={sheet.selectedCell?.isBold ? { backgroundColor: '#ccd5db' } : {}}
      >
        <FaBold />
      </button>
      <button
        onClick={toggleItalic}
        className="rounded-md text-sm w-[30px] h-[30px] flex items-center justify-center"
        style={
          sheet.selectedCell?.isItalic ? { backgroundColor: '#ccd5db' } : {}
        }
      >
        <FaItalic />
      </button>
      <button
        onClick={toggleUnderline}
        className="rounded-md text-sm w-[30px] h-[30px] flex items-center justify-center"
        style={
          sheet.selectedCell?.isUnderline ? { backgroundColor: '#ccd5db' } : {}
        }
      >
        <FaUnderline />
      </button>
      <button
        onClick={toggleStrikethrough}
        className="rounded-md text-sm w-[30px] h-[30px] flex items-center justify-center"
        style={
          sheet.selectedCell?.isStrikethrough
            ? { backgroundColor: '#ccd5db' }
            : {}
        }
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => setTextAlign('left')}
        className="rounded-md text-sm w-[30px] h-[30px] flex items-center justify-center"
        style={
          sheet.selectedCell?.textAlign === 'left'
            ? { backgroundColor: '#ccd5db' }
            : {}
        }
      >
        <FaAlignLeft />
      </button>
      <button
        onClick={() => setTextAlign('center')}
        className="rounded-md text-sm w-[30px] h-[30px] flex items-center justify-center"
        style={
          sheet.selectedCell?.textAlign === 'center'
            ? { backgroundColor: '#ccd5db' }
            : {}
        }
      >
        <FaAlignCenter />
      </button>
      <button
        onClick={() => setTextAlign('right')}
        className="rounded-md text-sm w-[30px] h-[30px] flex items-center justify-center"
        style={
          sheet.selectedCell?.textAlign === 'right'
            ? { backgroundColor: '#ccd5db' }
            : {}
        }
      >
        <FaAlignRight />
      </button>
      <ColorPicker
        triggerComponent={textColorTrigger}
        color={sheet.selectedCell?.textColor || '#000'}
        onChange={color => {
          debounce(() => setTextColor(color));
        }}
      />

      <ColorPicker
        triggerComponent={backgroundColorTrigger}
        color={sheet.selectedCell?.backgroundColor || '#fff'}
        onChange={color => {
          debounce(() => setBackgroundColor(color));
        }}
      />
    </div>
  );

  function toggleBold() {
    if (!sheet) return;
    if (!sheet.selectedCell) return;
    updateSelectedCellProps({
      ...sheet.selectedCell,
      isBold: !sheet.selectedCell.isBold
    });
  }

  function toggleItalic() {
    if (!sheet) return;
    if (!sheet.selectedCell) return;
    updateSelectedCellProps({
      ...sheet.selectedCell,
      isItalic: !sheet.selectedCell.isItalic
    });
  }

  function toggleUnderline() {
    if (!sheet) return;
    if (!sheet.selectedCell) return;
    updateSelectedCellProps({
      ...sheet.selectedCell,
      isUnderline: !sheet.selectedCell.isUnderline
    });
  }

  function toggleStrikethrough() {
    if (!sheet) return;
    if (!sheet.selectedCell) return;
    updateSelectedCellProps({
      ...sheet.selectedCell,
      isStrikethrough: !sheet.selectedCell.isStrikethrough
    });
  }

  function setTextAlign(alignment: TextAlign) {
    if (!sheet) return;
    if (!sheet.selectedCell) return;
    updateSelectedCellProps({ ...sheet.selectedCell, textAlign: alignment });
  }

  function updateCellFontFamily(fontFamily: FontFamily) {
    if (!sheet) return;
    if (!sheet.selectedCell) return;
    updateSelectedCellProps({ ...sheet.selectedCell, fontFamily });
  }

  function updateCellFontSize(fontSize: FontSize) {
    if (!sheet) return;
    if (!sheet.selectedCell) return;
    updateSelectedCellProps({ ...sheet.selectedCell, fontSize });
  }

  function setTextColor(color: string) {
    if (!sheet) return;
    if (!sheet.selectedCell) return;
    updateSelectedCellProps({ ...sheet.selectedCell, textColor: color });
  }

  function setBackgroundColor(color: string) {
    if (!sheet) return;
    if (!sheet.selectedCell) return;
    updateSelectedCellProps({ ...sheet.selectedCell, backgroundColor: color });
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
