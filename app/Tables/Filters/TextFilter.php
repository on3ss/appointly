<?php

namespace App\Tables\Filters;

use App\Tables\Core\AbstractFilter;
use Spatie\QueryBuilder\AllowedFilter;

class TextFilter extends AbstractFilter
{
    public static function make(string $name): static
    {
        return new static($name);
    }

    public function getType(): string
    {
        return 'text';
    }

    public function getOptions(): ?array
    {
        return null;
    }

    public function toAllowedFilter(): AllowedFilter
    {
        return AllowedFilter::partial($this->name);
    }
}
