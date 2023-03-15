import { numfmt } from "@/utils";
import { LineChart } from "@tremor/react";

export default function PriceChart({data}: {data: any[]}) {
    return <LineChart
        data={data.map((x) => {
            const dateObj = new Date(x.timestamp) 
            const datePart = dateObj.toLocaleDateString()
            const timePart = dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            return { date: datePart + ' ' + timePart, price: x.price_per }
        })}
                index="date"
                categories={["price"]}
                colors={["blue"]}
                valueFormatter={numfmt}
                yAxisWidth={40}
                showLegend={false}
                className="h-60"
            />
}