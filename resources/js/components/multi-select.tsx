import { useMemo } from "react"
import { Button } from "./ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import { ChevronDown, Check } from "lucide-react"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandInput,
    CommandEmpty,
} from "./ui/command"
import { cn } from "@/lib/utils"

interface Option {
    label: string
    value: string
}

interface MultiSelectFilterProps {
    label: string
    value: string[]
    options: Option[]
    onChange: (next: string[]) => void
}

export function MultiSelectFilter({
    label,
    value,
    options,
    onChange,
}: MultiSelectFilterProps) {
    const selected = useMemo(() => new Set(value ?? []), [value])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-label={`Multi-select ${label}`}
                    className="justify-between"
                >
                    {value?.length ? `${value.length} selected` : `Select ${label}`}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0">
                <Command>
                    <CommandInput placeholder={`Search ${label}...`} />
                    <CommandEmpty>No options found.</CommandEmpty>
                    <CommandGroup className="max-h-48 overflow-y-auto">
                        {options.map((opt) => {
                            const isSelected = selected.has(opt.value)
                            return (
                                <CommandItem
                                    key={opt.value}
                                    onSelect={() => {
                                        const next = new Set(value ?? [])
                                        if (next.has(opt.value)) {
                                            next.delete(opt.value)
                                        } else {
                                            next.add(opt.value)
                                        }
                                        onChange(Array.from(next))
                                    }}
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            isSelected ? "bg-primary text-primary-foreground" : ""
                                        )}
                                    >
                                        {isSelected && <Check className="h-3 w-3" />}
                                    </div>
                                    <span>{opt.label}</span>
                                </CommandItem>
                            )
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
