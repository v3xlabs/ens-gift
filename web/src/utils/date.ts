// Formatter for "Today" and "Yesterday" etc
const relative = new Intl.RelativeTimeFormat('en-GB', { numeric: 'auto' });
// Formatter for dates, e.g. "Mon, 31 May 2021"
const long = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
});

export const getRelativeUnit = (
    diff: number
): [Intl.RelativeTimeFormatUnit, number] => {
    const absDiff = Math.abs(diff);

    switch (true) {
        case absDiff < 60_000:
            return ['second', diff / 1000];
        case absDiff < 3_600_000:
            return ['minute', diff / 60_000];
        case absDiff < 86_400_000:
            return ['hour', diff / 3_600_000];
        case absDiff < 604_800_000:
            return ['day', diff / 86_400_000];
        case absDiff < 2_592_000_000:
            return ['week', diff / 604_800_000];
        case absDiff < 31_536_000_000:
            return ['month', diff / 2_592_000_000];
        default:
            return ['year', diff / 31_536_000_000];
    }
};

/**
 * Returns a string representation of the given date, formatted as a relative date.
 * Automatically adjusts between the most appropriate unit depending on the difference between the given date and the current date.
 * Like seconds, minutes, hours, days, weeks, months, years, etc.
 * @param date Date to format to
 */
export const formatRelativeDate = (date: Date) => {
    const diff = date.getTime() - Date.now();

    // To make it adjust to the most appropriate unit, we need to manually decide which unit to use
    // and then calculate the value for that unit. We can't use the built-in `Intl.RelativeTimeFormat` for this.
    // We need to do it with an absolute value, so we can't use the `diff` variable directly.
    const [unit, unitedDiff] = getRelativeUnit(diff);

    // Now we can use the `Intl.RelativeTimeFormat` to format the date
    return relative.format(Math.round(unitedDiff), unit);
};

/**
 * Returns both a full date and a relative date, formatted as a string in an object
 * @param date Date to format to
 */
export const formatFullAndRelativeDate = (date: Date) => {
    return {
        full: long.format(date),
        relative: formatRelativeDate(date),
    };
};
