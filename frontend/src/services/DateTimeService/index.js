import moment, { months } from "moment";

export const longDateTimeFormat = "D MMMM YYYY [at] HH:mm";
export const longDateFormat = "D MMMM YYYY";

export const getMonth = (n) => {
    return months(n);
}

export const getMonths = () => {
    return months();
}

export const getNextYears = (n) => {
    const year = moment().year();
    return [...Array(n).keys()].map(x => year + x);
}

export const getPastYears = (n) => {
    const year = moment().year();
    return [...Array(n).keys()].map(x => year - x - 1);
}

export const getArrayOfDaysInMonth = (month, year) => {
    if (month == null || year == null)
        return [];
    const momentMonth = month > 0 ? month : moment().month() + 1;
    const momentYear = year > 0 ? year : moment().year();
    return Array.from({ length: moment(momentYear + "-" + momentMonth, "YYYY-MM").daysInMonth() }, (_, i) => i + 1);
}

export const getDaysInMonth = (month, year) => {
    if (month == null || year == null)
        return 0;
    return moment(year + "-" + month, "YYYY-MM").daysInMonth();
}

export const getLongDate = (date) => {
    return moment.utc(date).local().format(longDateFormat);
}

export const getCurrentYear = () => {
    return moment().year();
}

export const getCurrentMonth = () => {
    return moment().month();
}

export const getDifferenceBetweenDates = (date1, date2) => {
    return moment.duration(date2.diff(date1)).format("D [d] h [h] m [m]", { trim: "all" });
}

export const getDate = (day, month, year) => {
    return moment().set({ "date": day, "month": month, "year": year }).toDate();
}