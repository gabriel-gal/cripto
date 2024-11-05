"use client"
import { CartesianGrid, Line, LineChart, XAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { getGraficoCripto } from "@/controllers/Cripto"
import { useEffect, useState } from "react"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';

// Removendo o chartData estático, pois agora vamos usar os dados dinâmicos
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

interface ComponentProps {
    test?: string; 
}

export default function Component({test} : ComponentProps) {
    const [data, setData] = useState([])
    const [day, setDay] = useState<string>("1")

    const fetchData = async (thisDay: string) => {
        const resp = await getGraficoCripto(test || "bitcoin", thisDay)
        const transformedData = resp.map((array) => ({
            date: new Date(array[0]),
            priceClose: array[4]
        }));
        setData(transformedData)
    }

    useEffect(() => {
        fetchData(day)
    }, [day, test])


    const handleChange = (event: any) => { setDay(event.target.value) }

    return (
        <Card>
            <CardHeader className="flex flex-row w-full items-center justify-between">

                <div>
                    <CardTitle>Line Chart</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
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


            </CardHeader >
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        //tickFormatter={(value) => value.slice(0, 3)} // Se necessário, ajuste o formato do tick
                        />
                        <Tooltip content={<ChartTooltipContent hideLabel />} />
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
