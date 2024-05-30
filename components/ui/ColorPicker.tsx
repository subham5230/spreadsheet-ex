import * as React from 'react';
import { HexColorPicker } from 'react-colorful';

export interface IColorPickerProps {
  triggerComponent: React.ReactNode;
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker(props: IColorPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const Trigger = props.triggerComponent;
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
    <div className="relative flex items-center justify-center" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>{Trigger}</button>
      {isOpen && (
        <div className="absolute top-[calc(100%+5px)] -left-4 z-[100] shadow-lg p-4 rounded-md bg-white border border-gray-300">
          <HexColorPicker color={props.color} onChange={props.onChange} />
        </div>
      )}
    </div>
  );
}
