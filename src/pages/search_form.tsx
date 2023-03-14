import { Card, List, ListItem, Metric, Text, TextInput } from "@tremor/react";
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

export default function SearchForm() {
    const [input, setInput] = useState('');
    const [data, setData] = useState([])

    console.log('fetch called')
    if (input.length > 3)
        fetch('http://localhost:3005/items?q=' + input).then(d => d.json()).then(d => setData(d))

    return (
        <Card className="max-w-xs mx-auto">
            <TextInput icon={SearchIcon} placeholder="Search..." onChange={e => setInput(e.target.value as string)}></TextInput>
            {input.length > 0 && <List>
                {(data as any[]).filter(x => x.name.startsWith(input)).map((item) => (
                    <ListItem key={item.name}>
                        <span>{item.name}</span>
                        <span>{item.price_per}</span>
                    </ListItem>
                ))}
            </List>}
        </Card>
    )
}