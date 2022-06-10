export const findOnRows = (rows, key, value) => {
	return rows.find(({ [key]: rowValue }) => rowValue === value) || false
}

export default findOnRows
