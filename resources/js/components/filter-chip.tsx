import { X } from 'lucide-react';

interface FilterChipProps {
    label: string;
    value: string;
    onRemove: () => void;
}

export function FilterChip({ label, value, onRemove }: FilterChipProps) {
    return (
        <div className="flex items-center gap-1 rounded bg-muted px-2 py-1 text-sm">
            <span className="text-muted-foreground">
                {label}: {value}
            </span>
            <button
                onClick={onRemove}
                className="text-xs text-red-500"
                title="Remove filter"
                aria-label={`Remove filter ${label}`}
            >
                <X className="h-3 w-3" />
            </button>
        </div>
    );
}
