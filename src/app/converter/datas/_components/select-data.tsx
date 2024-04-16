import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "~/shared/components/select";
import { Label } from "~/shared/components/label";
import { Data, DATA_LABELS } from '../_lib/convert-data';

interface SelectBaseProps {
    label: string,
    value: Data,
    onChange: (value: Data) => void,
}

export function SelectData({ label, value, onChange }: SelectBaseProps) {

    function handleSelectBase(value: string): void {
        onChange(value as Data)
    }

    return (<>
        <Label>{label}</Label>
        <Select
            value={value}
            onValueChange={handleSelectBase}
        >
            <SelectTrigger>
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                { DATA_LABELS.map((data, i) =>  <SelectItem value={data.type} key={i} >{data.label}</SelectItem>)}
            </SelectContent>
        </Select>
    </>)
}