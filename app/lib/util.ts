import { chartDataType } from "./type";

export function formatToTimeAgo(date: string) {
    const dayInMs = 1000 * 60 * 60 * 24;
    const time = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = Math.round((time - now) / dayInMs);

    const formatter = new Intl.RelativeTimeFormat("ko");

    return formatter.format(diff, "days");
}

export function generateChartData({work, friend, education, individual, social}: chartDataType) {
    return [
        {
            "id": "업무",
            "label": "업무",
            "value": work,
        },
        {
            "id": "지인",
            "label": "지인",
            "value": friend,
        },
        {
            "id": "개인",
            "label": "개인",
            "value": individual,
        },
        {
            "id": "교육",
            "label": "교육",
            "value": education,
        },
        {
            "id": "사회활동",
            "label": "사회활동",
            "value": social,
        },
    ]
}

export const createDaysData = (year: number, month: number) => {
    const prevMonthLD = new Date(year, month, 0).getDate(); // 지난 달의 마지막 날
    const curMonthLD = new Date(year, month + 1, 0).getDate(); // 현재 달의 마지막 날
    const startDow = new Date(year, month).getDay();

    return [prevMonthLD, curMonthLD, startDow];
}

export const createCalendar = (prevMonthLD: number, startDow: number, curMonthLD: number) => {
    let calendar = [];
    for (let i = prevMonthLD - startDow + 1; i <= prevMonthLD; i++) calendar.push(i); // 이전 달의 날짜
    for (let i = 1; i <= curMonthLD; i++) calendar.push(i); // 현재 달의 날짜
    let i = 1;
    while (calendar.length < 42) { // 다음 달의 날짜
        calendar.push(i++);
    }
    return calendar;
}

export const density = (count: number) => {
    switch (count) {
        case 0: return ""
        case 1: return "bg-green-200"
        case 2: return "bg-green-300"
        case 3: return "bg-green-400"
        case 4: return "bg-green-500"
        case 5: return "bg-green-600"
        case 6: return "bg-red-200"
        case 7: return "bg-red-300"
        case 8: return "bg-red-400"
        case 9: return "bg-red-500"
        case 10: return "bg-red-600"
        case 11: return "bg-red-700"
        case 12: return "bg-red-800"
        default: return "bg-violet-500"
    }
}