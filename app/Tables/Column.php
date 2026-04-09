<?php

namespace App\Tables;

use Illuminate\Contracts\Support\Arrayable;

class Column implements Arrayable
{
    protected string $name;
    protected ?string $label = null;
    protected bool $sortable = false;
    protected bool $searchable = false;
    protected bool $toggleable = true;
    protected ?string $align = null;
    protected ?string $width = null;
    protected ?string $cellType = null; // 'text', 'badge', 'currency', 'boolean'

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public static function make(string $name): static
    {
        return new static($name);
    }

    public function label(string $label): self
    {
        $this->label = $label;
        return $this;
    }

    public function sortable(bool $condition = true): self
    {
        $this->sortable = $condition;
        return $this;
    }

    public function searchable(bool $condition = true): self
    {
        $this->searchable = $condition;
        return $this;
    }

    public function toggleable(bool $condition = true): self
    {
        $this->toggleable = $condition;
        return $this;
    }

    public function align(string $align): self
    {
        $this->align = $align;
        return $this;
    }

    public function width(string $width): self
    {
        $this->width = $width;
        return $this;
    }

    public function badge(): self
    {
        $this->cellType = 'badge';
        return $this;
    }

    public function currency(): self
    {
        $this->cellType = 'currency';
        return $this;
    }

    public function boolean(): self
    {
        $this->cellType = 'boolean';
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getLabel(): string
    {
        return $this->label ?? str($this->name)->title()->toString();
    }

    public function isSortable(): bool
    {
        return $this->sortable;
    }

    public function isSearchable(): bool
    {
        return $this->searchable;
    }

    public function toArray(): array
{
    return array_filter([
        'key' => $this->name,
        'label' => $this->getLabel(),
        'sortable' => $this->sortable,
        'searchable' => $this->searchable,
        'toggleable' => $this->toggleable,
        'align' => $this->align,
        'width' => $this->width,
        'cellType' => $this->cellType,
    ], fn($value) => $value !== null);
}
}