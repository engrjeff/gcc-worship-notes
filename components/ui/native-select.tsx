import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'flex h-9 w-full appearance-none items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm capitalize placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        <ChevronDownIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    );
  }
);
NativeSelect.displayName = 'NativeSelect';

export { NativeSelect };
