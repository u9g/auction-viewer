import { LineChart, Card, List, ListItem, TextInput, Table, TableRow, TableCell, Text, Badge, TableHead, TableHeaderCell, DropdownItem, Dropdown, Col, Grid, MultiSelectBox, MultiSelectBoxItem, Divider, SelectBoxItem, Toggle, ToggleItem } from "@tremor/react";
import { ArrowNarrowDownIcon, ArrowNarrowRightIcon, ArrowNarrowUpIcon, CalculatorIcon, SearchIcon, StatusOnlineIcon } from '@heroicons/react/solid'
import { useState } from "react";
import PriceChart from "./price_chart";
import { numfmt } from "@/utils";

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
    const [itemsToShow, setItemsToShow] = useState<any[]>([])
    const [lastFetched, setLastFetched] = useState('')
    const [prevFilterSet, setPrevFilterSet] = useState(new Set() as Set<string>)
    const [shouldFetch, setShouldFetch] = useState(false)

    if ((lastFetched != input && input.length > 3) || shouldFetch) {
        console.log('fetch called')
        const params: Record<string, string> = {
            q: input
        }
        if (prevFilterSet.has('heroic_slots')) {
            params.slotType = 'heroic'
        } else if (prevFilterSet.has('normal_slots')) {
            params.slotType = 'normal'
        }
        fetch('/api/items?' + new URLSearchParams(params), {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(d => d.json())
            .then(d => setItemsToShow(d))
            .then(() => setLastFetched(input)!)
            .then(() => shouldFetch && setShouldFetch(false))
            .then(console.log({itemsToShow})!)
    }

    return (
        <Card className="mt-6 w-1/2">
            {itemsToShow.length > 0 && <PriceChart data={itemsToShow} />}
            <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
                <Col numColSpan={1} numColSpanLg={2}>
                    <TextInput icon={SearchIcon} placeholder="Search..." onChange={e => setInput(e.target.value)}></TextInput>
                </Col>
                <MultiSelectBox
                    onValueChange={(newFilters) => {
                        const newFilterSet = new Set(newFilters)
                        if (newFilterSet.has('normal_slots') && prevFilterSet.has('heroic_slots')) {
                            newFilterSet.delete('heroic_slots')
                        } else if (newFilterSet.has('heroic_slots') && prevFilterSet.has('normal_slots')) {
                            newFilterSet.delete('normal_slots')
                        }

                        setPrevFilterSet(newFilterSet)
                        setShouldFetch(true)
                    }}
                    value={Array.from(prevFilterSet)}
                >
                    <SelectBoxItem value="_disabled_slots" disabled={true} text="Slots" />
                    <MultiSelectBoxItem value="heroic_slots" text="Heroic Slots"/>
                    <MultiSelectBoxItem value="normal_slots" text="Normal Slots" />

                </MultiSelectBox>
            </Grid>
            {/* For info about div: https://github.com/tremorlabs/tremor/issues/75#issuecomment-1327380036 */}
            {itemsToShow.length > 0 && <div className="[&_>_div]:max-h-[42rem] [&_th]:bg-white">
                <Table className="max-h-[50vh]">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell className="min-w-2/5">Name</TableHeaderCell>
                            <TableHeaderCell className="min-w-1/4">Seller</TableHeaderCell>
                            <TableHeaderCell className="min-w-1/4">Buyer</TableHeaderCell>
                            <TableHeaderCell>Price (ea.)</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    {(itemsToShow as any[]).map((item, ix) => (
                        <TableRow key={ix}>
                            <TableCell>{item.name} {item.amount > 1 && <Badge>{item.amount}</Badge>}</TableCell>
                            <TableCell>
                                <Badge color="emerald" icon={ArrowNarrowUpIcon}>{item.seller}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge color="red" icon={ArrowNarrowDownIcon}>{item.buyer}</Badge>
                            </TableCell>
                            <TableCell>
                                <Text>{numfmt(+item.price_per)}</Text>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>}
        </Card>
    )
}