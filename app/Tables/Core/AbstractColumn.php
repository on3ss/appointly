<?php

namespace App\Tables\Core;

use App\Tables\Contracts\Column;

abstract class AbstractColumn implements Column
{
    protected string $name;

    protected ?string $label = null;

    protected bool $sortable = false;

    protected bool $searchable = false;

    protected bool $toggleable = true;

    protected ?string $align = null;

    protected ?string $width = null;

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

    public function isSortable(): bool
    {
        return $this->sortable;
    }

    public function isSearchable(): bool
    {
        return $this->searchable;
    }

    public function isToggleable(): bool
    {
        return $this->toggleable;
    }

    public function getAlignment(): ?string
    {
        return $this->align;
    }

    public function getWidth(): ?string
    {
        return $this->width;
    }

    // Fluent setters (return $this for chaining)
    public function label(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function sortable(bool $condition = true): static
    {
        $this->sortable = $condition;

        return $this;
    }

    public function searchable(bool $condition = true): static
    {
        $this->searchable = $condition;

        return $this;
    }

    public function toggleable(bool $condition = true): static
    {
        $this->toggleable = $condition;

        return $this;
    }

    public function align(string $align): static
    {
        $this->align = $align;

        return $this;
    }

    public function width(string $width): static
    {
        $this->width = $width;

        return $this;
    }

    abstract public function getCellType(): string;

    public function toArray(): array
    {
        return array_filter([
            'key' => $this->getName(),
            'label' => $this->getLabel(),
            'sortable' => $this->isSortable(),
            'searchable' => $this->isSearchable(),
            'toggleable' => $this->isToggleable(),
            'align' => $this->getAlignment(),
            'width' => $this->getWidth(),
            'cellType' => $this->getCellType(),
        ]);
    }
}
