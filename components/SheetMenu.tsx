import * as React from 'react';
import { BiCopy } from 'react-icons/bi';
import { FiScissors } from 'react-icons/fi';

export interface ISheetMenuProps {}

export default function SheetMenu(props: ISheetMenuProps) {
  return (
    <div className="bg-[#EDF2FA] rounded-full h-full flex gap-x-2 items-center px-4 mx-4">
      <button>
        <BiCopy />
      </button>
      <button>
        <FiScissors />
      </button>
    </div>
  );
}
