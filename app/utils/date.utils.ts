export function formatBlogDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Fallback for invalid dates

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }).toLowerCase();
    const year = date.getFullYear();
    const weekday = date.toLocaleString('default', { weekday: 'short' }).toLowerCase();

    const suffix = (d: number) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${day}${suffix(day)} ${month} ${year}, ${weekday}`;
}
