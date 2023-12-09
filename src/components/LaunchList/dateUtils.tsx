export function getDate(est_date: {year: any, month: number, day: any}) {
    var date = new Date(est_date.year, est_date.month - 1, est_date.day)

    return date.toDateString()
}

export function getTimeTillLaunch(estimatedDate: string | undefined): string {
    if (estimatedDate) {
        //"2023-10-26T03:14Z"
        var date = new Date(estimatedDate)
        var today = new Date(Date.now());

        var difference = date.getTime() - today.getTime();
        //var diffDate = new Date(difference)

        var seconds = Math.floor(difference / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        return difference <= 0 ? 'Right Now!' : `${days}d:${hours}h:${minutes}m:${seconds}s`;
    }
    return ''
}