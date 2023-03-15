export const numfmt = (number: number) => {
	const oneB = 1_000_000_000
	const oneM = 1_000_000
	const oneK = 1_000
	const fmt = (c: number) =>
		`$${(number / c).toFixed(+(number / c).toFixed() === number / c ? 0 : 2)}`
	if (number >= oneB) {
		return fmt(oneB) + "b"
	} else if (number >= oneM) {
		return fmt(oneM) + "m"
	} else if (number >= oneK) {
		return fmt(oneK) + "k"
	}
	return "$ " + Intl.NumberFormat("us").format(number).toString()
}
