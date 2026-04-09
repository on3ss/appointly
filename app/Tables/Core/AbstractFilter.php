<?php

namespace App\Tables\Core;

use App\Tables\Contracts\Filter;
use Spatie\QueryBuilder\AllowedFilter;

abstract class AbstractFilter implements Filter
{
    protected string $name;

    protected ?string $label = null;

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getLabel(): string
    {
        return $this->label ?? str($this->name)->title();
    }

    public function label(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    abstract public function getType(): string;

    abstract public function getOptions(): ?array;

    abstract public function toAllowedFilter(): AllowedFilter;

    public function toArray(): array
    {
        return array_filter([
            'key' => $this->getName(),
            'label' => $this->getLabel(),
            'type' => $this->getType(),
            'options' => $this->getOptions(),
        ]);
    }
}
