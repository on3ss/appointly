<?php

namespace App\Tables\Columns;

use App\Tables\Core\AbstractColumn;

class BooleanColumn extends AbstractColumn
{
    protected string $trueLabel = 'Active';

    protected string $falseLabel = 'Inactive';

    protected string $trueVariant = 'default';

    protected string $falseVariant = 'secondary';

    protected ?string $trueIcon = null;

    protected ?string $falseIcon = null;

    public static function make(string $name): static
    {
        return new static($name);
    }

    public function trueLabel(string $label): static
    {
        $this->trueLabel = $label;

        return $this;
    }

    public function falseLabel(string $label): static
    {
        $this->falseLabel = $label;

        return $this;
    }

    public function trueVariant(string $variant): static
    {
        $this->trueVariant = $variant;

        return $this;
    }

    public function falseVariant(string $variant): static
    {
        $this->falseVariant = $variant;

        return $this;
    }

    public function trueIcon(string $icon): static
    {
        $this->trueIcon = $icon;

        return $this;
    }

    public function falseIcon(string $icon): static
    {
        $this->falseIcon = $icon;

        return $this;
    }

    public function getCellType(): string
    {
        return 'boolean';
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'trueLabel' => $this->trueLabel,
            'falseLabel' => $this->falseLabel,
            'trueVariant' => $this->trueVariant,
            'falseVariant' => $this->falseVariant,
            'trueIcon' => $this->trueIcon,
            'falseIcon' => $this->falseIcon,
        ]);
    }
}
