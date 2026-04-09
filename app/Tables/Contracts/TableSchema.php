<?php

namespace App\Tables\Contracts;

use Spatie\QueryBuilder\QueryBuilder;

interface TableSchema
{
    /** @return Column[] */
    public function getColumns(): array;

    /** @return Filter[] */
    public function getFilters(): array;

    public function getActions(): array;

    public function getBulkActions(): array;

    public function getDefaultSort(): array;

    public function getDefaultHiddenColumns(): array;

    public function applyToQuery(QueryBuilder $query): QueryBuilder;

    public function toArray(): array;
}
