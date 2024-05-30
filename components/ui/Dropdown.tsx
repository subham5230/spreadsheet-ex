import * as React from 'react';
import { IoChevronDown } from 'react-icons/io5';

export interface IDropdownProps {
  options: string[];
  selected: string;
  onChange: Function;
  type?: 'FontFamily' | 'FontSize';
}

export function Dropdown(props: IDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="bg-white px-2 rounded-md shadow-sm border border-gray-300 flex items-center gap-x-2 justify-between text-sm"
        onClick={() => setIsOpen(!isOpen)}
        style={
          props.type === 'FontFamily'
            ? { fontFamily: props.selected, width: '110px' }
            : {}
        }
      >
        {props.selected}
        <IoChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute top-[calc(100%+5px)] shadow-lg left-0 z-[250] py-2 bg-white border border-gray-200 rounded-md w-fit">
          {props.options.map(option => (
            <button
              className="text-sm py-1 px-4 hover:bg-gray-100 w-full text-left"
              key={option}
              onClick={() => {
                props.onChange(option);
                setIsOpen(false);
              }}
              style={props.type === 'FontFamily' ? { fontFamily: option } : {}}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
