import * as React from 'react';
import { BiCopy } from 'react-icons/bi';

export interface ISheetMenuProps {}

export default function SheetMenu(props: ISheetMenuProps) {
  return (
    <div className="bg-[#EDF2FA] rounded-full h-full flex items-center px-4 mx-4">
      <BiCopy />
    </div>
  );
}
