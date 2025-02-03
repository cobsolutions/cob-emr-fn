export interface Day {
    dayName: string,
    dayNumber: number,
    selected: boolean
}
export var WeekDays: Day[] = [
    {
        dayName: 'Mon', dayNumber: 2, selected: false
    },
    {
        dayName: 'Tue', dayNumber: 3, selected: false
    },
    {
        dayName: 'Wed', dayNumber: 4, selected: false
    },
    {
        dayName: 'Thu', dayNumber: 5, selected: false
    },
    {
        dayName: 'Fri', dayNumber: 6, selected: false
    },
    {
        dayName: 'Sat', dayNumber: 7, selected: false
    },
    {
        dayName: 'Sun', dayNumber: 1, selected: false
    },
]