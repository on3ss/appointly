<?php

namespace App\Tables\Columns;

use App\Tables\Core\AbstractColumn;

class BadgeColumn extends AbstractColumn
{
    protected string $variant = 'outline';

    protected ?array $colorMap = null;

    protected ?string $icon = null;

    protected ?string $iconPosition = 'left'; // 'left' or 'right'

    public static function make(string $name): static
    {
        return new static($name);
    }

    public function variant(string $variant): static
    {
        $this->variant = $variant;

        return $this;
    }

    /**
     * Map values to badge colors.
     * Example: ['queue' => 'secondary', 'timeslot' => 'default']
     */
    public function colors(array $map): static
    {
        $this->colorMap = $map;

        return $this;
    }

    public function icon(string $icon, string $position = 'left'): static
    {
        $this->icon = $icon;
        $this->iconPosition = $position;

        return $this;
    }

    public function getCellType(): string
    {
        return 'badge';
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'variant' => $this->variant,
            'colorMap' => $this->colorMap,
            'icon' => $this->icon,
            'iconPosition' => $this->iconPosition,
        ]);
    }
}
