<?php

namespace App\Tables;

use Illuminate\Contracts\Support\Arrayable;
use Spatie\QueryBuilder\AllowedFilter;

class Filter implements Arrayable
{
    protected string $name;
    protected string $type = 'text';
    protected ?string $label = null;
    protected ?array $options = null;
    protected bool $exact = false;

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

    public function select(array $options): self
    {
        $this->type = 'select';
        $this->options = $options;
        $this->exact = true;
        return $this;
    }

    public function text(): self
    {
        $this->type = 'text';
        return $this;
    }

    public function exact(bool $condition = true): self
    {
        $this->exact = $condition;
        return $this;
    }

    public function toAllowedFilter(): AllowedFilter
    {
        return $this->exact
            ? AllowedFilter::exact($this->name)
            : AllowedFilter::partial($this->name);
    }

    public function toArray(): array
{
    return array_filter([
        'key' => $this->name,
        'label' => $this->label ?? str($this->name)->title(),
        'type' => $this->type,
        'options' => $this->options,
    ]);
}
}