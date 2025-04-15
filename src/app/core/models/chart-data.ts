export interface PieChartData {
    name: string,
    label: string,
    value: number
}

export interface LineChartData{
    name: string,
    series: {
        name: string,
        value: number
    }
}