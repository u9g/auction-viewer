import { LineChart, Card, List, ListItem, TextInput } from "@tremor/react";
import { SearchIcon } from '@heroicons/react/solid'
import { useState } from "react";

// const items = [{
//     name: 'abc',
//     price: 2500
// },
// {
//     name: 'abcd',
//     price: 5000
// },
// {
//     name: 'abcde',
//     price: 7500
// }]

const numfmt = (number: number) => {
    const oneB = 1_000_000_000
    const oneM = 1_000_000
    const oneK = 1_000
    const fmt = (c: number) => `$${(number / c).toFixed(0)}`
    if (number > oneB) {
        return fmt(oneB) + 'b'
    } else if (number > oneM) {
        return fmt(oneM) + 'm'
    } else if (number > oneK) {
        return fmt(oneK) + 'k'
    }
    return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export default function SearchForm() {
    const [input, setInput] = useState('');
    const [data, setData] = useState<any[]>([])
    const [lastFetched, setLastFetched] = useState('')

    if (lastFetched != input && input.length > 3) {
        console.log('fetch called')
        fetch('/api/items?q=' + input, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(d => d.json())
            .then(d => setData(d))
            .then(() => setLastFetched(input)!)
            .then(console.log(data)!)
    }

    return (
        <Card className="max-w-xl mx-auto">
            {input.length > 0 && <LineChart
                data={data.map((x, ix) => ({ Date: ix, price: x.price_per }))}
                index="Date"
                categories={["price"]}
                colors={["blue"]}
                valueFormatter={numfmt}
                yAxisWidth={40}
                showLegend={false}
                className="h-60"
            />}
            <TextInput icon={SearchIcon} placeholder="Search..." onChange={e => setInput(e.target.value as string)}></TextInput>
            {input.length > 0 && <List>
                {(data as any[]).map((item, ix) => (
                    <ListItem key={ix}>
                        <span>{item.name}</span>
                        <span>{numfmt(+item.price_per)}</span>
                    </ListItem>
                ))}
            </List>}
        </Card>
    )
}