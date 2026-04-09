<?php

namespace App\Tables\Contracts;

use Spatie\QueryBuilder\AllowedFilter;

interface Filter
{
    public function getName(): string;

    public function getLabel(): string;

    public function getType(): string;

    public function getOptions(): ?array;

    public function toAllowedFilter(): AllowedFilter;

    public function toArray(): array;
}
