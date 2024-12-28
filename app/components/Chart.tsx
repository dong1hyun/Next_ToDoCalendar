"use client"

import { ResponsivePie } from "@nivo/pie";
import { useMemo } from "react";
import { generateChartData } from "../lib/util";

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
    const data = useMemo(() => generateChartData(typeCount),
        [typeCount]
    );
    return (
        <div className="flex flex-col items-center">
            <div className="w-80 h-80">
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
            </div>
        </div>
    )
}

export default MyResponsivePie