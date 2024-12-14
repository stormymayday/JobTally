import { Control } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "./ui/Input";

type CustomFormInputProps = {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
};

export function CustomFormInput({ name, control }: CustomFormInputProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="capitalize">{name}</FormLabel>
                    <FormControl>
                        <Input className="bg-background" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

type CustomFormSelectProps = {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    items: string[];
    labelText?: string;
};

export function CustomFormSelect({
    name,
    control,
    items,
    labelText,
}: CustomFormSelectProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="capitalize">
                        {labelText || name}
                    </FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl className="bg-background">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {items.map((item) => {
                                return (
                                    <SelectItem
                                        className="bg-background"
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
export default CustomFormSelect;
