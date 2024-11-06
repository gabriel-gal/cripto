import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CartesianGrid, Line, LineChart, XAxis, Tooltip, YAxis } from "recharts"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { getGraficoCripto } from "@/controllers/Cripto"
import { useFormatX } from "./hooks/useFormatX"
import CustomTool from "./hooks/useCustomTool"
import { useEffect, useState } from "react"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

interface IGraficoProps { id?: string }

export default function Grafico({ id }: IGraficoProps) {

    const [data, setData] = useState([])
    const [day, setDay] = useState<string>("1")

    const handleChange = (event: any) => { setDay(event.target.value) }
    useEffect(() => { fetchData(day) }, [day, id])

    const fetchData = async (thisDay: string) => {
        const resp = await getGraficoCripto(id || "bitcoin", thisDay)
        const transformedData = resp.map((array: any) => ({
            date: new Date(array[0]),
            priceClose: array[4]
        }));
        setData(transformedData)
    }

    return (
        <Card>
            <CardHeader className="pt-2 flex flex-row w-full items-center justify-between">
                <div>
                    <CardTitle>Gráfico da Cripto</CardTitle>
                    <CardDescription>{day === "1" ? "há 1 dia atrás" : `há ${day} dias atrás`}</CardDescription>
                </div>
                <FormControl className="w-36">
                    <InputLabel id="demo-simple-select-label">Dias atrás</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={day}
                        label="Dias atrás"
                        onChange={handleChange}
                    >
                        <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"7"}>7</MenuItem>
                        <MenuItem value={"14"}>14</MenuItem>
                        <MenuItem value={"30"}>30</MenuItem>
                        <MenuItem value={"90"}>90</MenuItem>
                        <MenuItem value={"180"}>180</MenuItem>
                        <MenuItem value={"365"}>365</MenuItem>
                    </Select>
                </FormControl>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid stroke="#b4b4b4" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(date) => useFormatX(date, day)}
                        />
                        <YAxis
                            dataKey="priceClose"
                            tickLine={false}
                            axisLine={false}
                            width={80}
                            tickMargin={8}
                            domain={['auto', 'auto']}
                            tickFormatter={(value) =>
                                new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(value)
                            }
                        />
                        <Tooltip content={<CustomTool />} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="priceClose"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card >
    )
}