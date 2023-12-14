import * as React from 'react';
import ResizableTextarea, { TextareaAutosizeProps } from 'react-textarea-autosize';

import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaAutosizeProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <ResizableTextarea
        className={cn(
          'flex min-h-[40px] w-full rounded-md border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-[-2px] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
