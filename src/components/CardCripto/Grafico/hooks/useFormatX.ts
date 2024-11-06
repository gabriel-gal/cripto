import { format } from 'date-fns';

export const useFormatX = (date: Date, day: string) => {
    if (day === "1") return format(date, "HH:mm");
    if (day === "7" || day === "14") return format(date, "dd/MM");
    return format(date, "dd/MM/yy");
};