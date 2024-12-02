"use client"

import { ResponsivePie } from "@nivo/pie";
import { useMemo } from "react";

interface Props {
    typeCount: {
        work: number,
        friend: number,
        individual: number,
        education: number,
        social: number
    },
    colors: string[]
}

const MyResponsivePie = ({ typeCount, colors }: Props) => {
    const data = useMemo(() => [
        {
            "id": "업무",
            "label": "업무",
            "value": typeCount.work,
        },
        {
            "id": "지인",
            "label": "지인",
            "value": typeCount.friend,
        },
        {
            "id": "개인",
            "label": "개인",
            "value": typeCount.individual,
        },
        {
            "id": "교육",
            "label": "교육",
            "value": typeCount.education,
        },
        {
            "id": "사회활동",
            "label": "사회활동",
            "value": typeCount.social,
        },
    ], [typeCount]);
    return (
    <>
        <ResponsivePie
            data={data}
            margin={{ top: 10, right: 80, bottom: 80, left: 80 }}
            colors={colors}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 60,
                    itemHeight: 100,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    </>
)}

export default MyResponsivePie