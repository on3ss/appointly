import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { MultiSelectFilter } from "./multi-select"
import { FilterChip } from "./filter-chip"
import { FilterIcon } from "lucide-react"
import { Label } from "./ui/label"

export type FilterDefinition = {
    key: string
    label: string
    type: "text" | "select" | "multi-select" | "checkbox" | "date"
    options?: { label: string; value: string }[]
}

interface DataTableFiltersProps {
    filters: Record<string, any>
    setFilters: (next: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => void
    filterDefinitions: FilterDefinition[]
    basePath: string
}

export function DataTableFilters({
    filters,
    setFilters,
    filterDefinitions,
}: DataTableFiltersProps) {
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                        <FilterIcon className="h-4 w-4" />
                        Filters
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" alignOffset={4} className="w-[500px] max-h-[600px] overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        {filterDefinitions.map((filter) => (
                            <div key={filter.key} className="flex flex-col gap-1">
                                {filter.type !== "checkbox" && (
                                    <label className="text-sm font-medium">{filter.label}</label>
                                )}

                                {filter.type === "text" && (
                                    <Input
                                        value={filters[filter.key] ?? ""}
                                        placeholder={filter.label}
                                        onChange={(e) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                [filter.key]: e.target.value,
                                            }))
                                        }
                                    />
                                )}

                                {filter.type === "select" && (
                                    <Select
                                        value={filters[filter.key] ?? ""}
                                        onValueChange={(val) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                [filter.key]: val,
                                            }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={`Select ${filter.label}`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filter.options?.map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}

                                {filter.type === "multi-select" && (
                                    <MultiSelectFilter
                                        label={filter.label}
                                        value={filters[filter.key] ?? []}
                                        options={filter.options ?? []}
                                        onChange={(next) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                [filter.key]: next,
                                            }))
                                        }
                                    />
                                )}

                                {filter.type === "checkbox" && (
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            checked={!!filters[filter.key]}
                                            onCheckedChange={(checked) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    [filter.key]: checked === true,
                                                }))
                                            }
                                        />
                                        <div className="grid gap-2">
                                            <Label>{filter.label}</Label>
                                        </div>
                                    </div>
                                )}

                                {filter.type === "date" && (
                                    <Input
                                        type="date"
                                        value={filters[filter.key] ?? ""}
                                        onChange={(e) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                [filter.key]: e.target.value,
                                            }))
                                        }
                                    />
                                )}
                            </div>
                        ))}

                        <div className="flex justify-between items-center pt-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setFilters({})}
                            >
                                Reset filters
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            <div>
                {Object.entries(filters).some(([_, v]) => v && v.length !== 0) && (
                    <div className="flex gap-2 flex-wrap">
                        {Object.entries(filters).map(([key, val]) => {
                            if (!val || (Array.isArray(val) && val.length === 0)) return null

                            const def = filterDefinitions.find((f) => f.key === key)
                            const values = Array.isArray(val) ? val : [val]

                            return values.map((v) => {
                                const label =
                                    def?.options?.find((opt) => opt.value === v)?.label ??
                                    (typeof v === "boolean" ? (v ? "Yes" : "No") : v)

                                return (
                                    <FilterChip
                                        key={`${key}-${v}`}
                                        label={def?.label ?? key}
                                        value={label}
                                        onRemove={() => {
                                            const newVal = { ...filters }

                                            if (Array.isArray(newVal[key])) {
                                                const remaining = newVal[key].filter((item: string) => item !== v)
                                                if (remaining.length) {
                                                    newVal[key] = remaining
                                                } else {
                                                    delete newVal[key]
                                                }
                                            } else {
                                                delete newVal[key]
                                            }

                                            setFilters(newVal)
                                        }}
                                    />
                                )
                            })
                        })}

                        <button
                            onClick={() => setFilters({})}
                            className="text-sm text-muted-foreground underline ml-2 cursor-pointer"
                        >
                            Clear all
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}