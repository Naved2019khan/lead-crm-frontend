import { parseISO, format, differenceInMinutes } from 'date-fns';
// Returns: "2025-July-30"
export function getDateReadableFormate(date: string): string {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'dd MMMM yyyy'); 
}

export function generateDate(date: string): string {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'dd MMMM yyyy'); 
}

// Returns: "14:05 PM"  (⚠️ see below)
export function getTimeReadableFormate(date: string): string {
  const parsedDate = parseISO(date);
  return format(parsedDate, 'HH:mm a');
}

export const differenceOfTiming = (startTime, endTime) => {
  const start = parseISO(startTime);
  const end = parseISO(endTime);
  const totalMinutes = differenceInMinutes(end, start);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};