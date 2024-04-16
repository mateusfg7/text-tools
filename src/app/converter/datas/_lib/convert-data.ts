export type Data = 'JSON' | 'CSV'

export const DATA_LABELS: Array<{ type: Data, label: string }> = [
    { type: 'JSON', label: 'JSON' },
    { type: 'CSV', label: 'CSV' },
]

function jsonToCsv(input: string): string {
    let json = JSON.parse(input)
    const headers = Object.keys(json[0]);
    let csv = headers.join(',') + '\n';

    json.forEach((obj: any) => {
        const values = headers.map(header => {
            let value = obj[header];
            if (typeof value === 'string' && value.includes(',')) {
                value = `"${value}"`;
            }
            return value;
        })

        csv += values.join(',') + '\n';
    });

    return csv;
}

function csvToJson(input: string): string {
    const rows = input.split('\n')
    const headers = rows[0].split(',')
    const json: any = []
    rows.shift()

    rows.map((row) => {
        const fields = row.split(',')

        if (fields.length === headers.length) {
            const obj: any = {}

            for (let i = 0; i < headers.length; i++) {
                obj[headers[i]] = fields[i];
            }

            json.push(obj);
        }
    })

    return JSON.stringify(json, null, 4)
}

export function convertDatas(input: string, from: Data, to: Data): string {

    if (from === to) return input

    if (from === 'JSON' && to === 'CSV') {
        try {
            return jsonToCsv(input)
        } catch (e) {
            throw new Error("The input is not a valid JSON.")
        }
    }

    if (from === 'CSV' && to === 'JSON') {
        try {
            return csvToJson(input)
        } catch (e) {
            throw new Error("The input is not a valid CSV.")
        }
    }

    return ''
}