import { Table } from "@tanstack/react-table"
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ServerPagination {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
    onPageChange: (page: number) => void
    onPerPageChange?: (perPage: number) => void
}

interface DataTablePaginationProps<TData> {
    table: Table<TData>,
    pagination: ServerPagination
}

export function DataTablePagination<TData>({
    table,
    pagination,
}: DataTablePaginationProps<TData>) {
    const {
        currentPage,
        lastPage,
        perPage,
        total,
        onPageChange,
        onPerPageChange,
    } = pagination

    const paginationRange = getPaginationRange(currentPage, lastPage)

    return (
        <div className="flex items-center justify-between px-2 my-4 flex-wrap gap-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                    <>
                        {table.getFilteredSelectedRowModel().rows.length} row(s) selected.
                    </>
                ) : (
                    <>
                        Showing {(currentPage - 1) * perPage + 1} to{" "}
                        {Math.min(currentPage * perPage, total)} of {total} results.
                    </>
                )}
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${perPage}`}
                        onValueChange={(value) => onPerPageChange?.(Number(value))}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={perPage} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[5, 10, 15, 20, 30, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-1">
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {paginationRange.map((page, index) =>
                        page === "..." ? (
                            <span
                                // FIX HERE: Use a unique key for "..."
                                // Combine index with a distinct string to avoid conflicts with page numbers
                                key={`ellipsis-${index}`}
                                className="px-2 text-sm text-muted-foreground"
                            >
                                ...
                            </span>
                        ) : (
                            <Button
                                key={page} // This is correct, page numbers are unique
                                variant={page === currentPage ? "default" : "outline"}
                                className="h-8 w-8 p-0"
                                onClick={() => onPageChange(Number(page))}
                            >
                                {page}
                            </Button>
                        )
                    )}

                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(lastPage)}
                        disabled={currentPage === lastPage}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

function getPaginationRange(current: number, total: number): (number | string)[] {
    const delta = 2 // Number of pages around the current page
    const range: (number | string)[] = []
    const left = Math.max(2, current - delta)
    const right = Math.min(total - 1, current + delta)

    range.push(1)

    if (left > 2) {
        range.push("...")
    }

    for (let i = left; i <= right; i++) {
        range.push(i)
    }

    if (right < total - 1) {
        range.push("...")
    }

    if (total > 1) {
        range.push(total)
    }

    return range
}