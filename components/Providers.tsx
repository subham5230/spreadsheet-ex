import * as React from 'react';
import { SheetProvider } from '@/contexts/SheetContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SheetProvider>{children}</SheetProvider>;
}
