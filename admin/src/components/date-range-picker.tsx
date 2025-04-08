"\"use client";

import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';

export function DatePickerWithRange({
  dateRange,
  setDateRange,
}: {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[300px] justify-start text-left font-normal',
            !dateRange?.from && 'text-muted-foreground'
          )}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              `${format(dateRange.from, 'LLL dd, y')} - ${format(dateRange.to, 'LLL dd, y')}`
            ) : (
              format(dateRange.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <CalendarComponent
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
