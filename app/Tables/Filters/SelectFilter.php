<?php

namespace App\Tables\Filters;

use App\Tables\Core\AbstractFilter;
use Spatie\QueryBuilder\AllowedFilter;

class SelectFilter extends AbstractFilter
{
    public static function make(string $name): static
    {
        return new static($name);
    }

    protected array $options = [];

    public function options(array $options): static
    {
        $this->options = $options;

        return $this;
    }

    public function getType(): string
    {
        return 'select';
    }

    public function getOptions(): array
    {
        return $this->options;
    }

    public function toAllowedFilter(): AllowedFilter
    {
        return AllowedFilter::exact($this->name);
    }
}
