export function formatToTimeAgo(date: string) {
    const dayInMs = 1000 * 60 * 60 * 24;
    const time = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = Math.round((time - now) / dayInMs);

    const formatter = new Intl.RelativeTimeFormat("ko");

    return formatter.format(diff, "days");
}

interface chartDataType {
    work: number
    friend: number
    individual: number
    education: number
    social: number
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