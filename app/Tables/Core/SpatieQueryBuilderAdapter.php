<?php

namespace App\Tables\Core;

use App\Tables\Contracts\QueryBuilderAdapter;
use App\Tables\Contracts\TableSchema;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class SpatieQueryBuilderAdapter implements QueryBuilderAdapter
{
    public function apply(Builder $baseQuery, TableSchema $schema): QueryBuilder
    {
        $query = QueryBuilder::for($baseQuery);

        // Collect allowed filters from explicit filters + searchable columns
        $allowedFilters = [];
        foreach ($schema->getFilters() as $filter) {
            $allowedFilters[] = $filter->toAllowedFilter();
        }
        foreach ($schema->getColumns() as $column) {
            if ($column->isSearchable()) {
                $allowedFilters[] = AllowedFilter::partial($column->getName());
            }
        }

        // Collect sortable columns
        $sortable = [];
        foreach ($schema->getColumns() as $column) {
            if ($column->isSortable()) {
                $sortable[] = $column->getName();
            }
        }

        $defaultSort = $schema->getDefaultSort();
        $defaultSortColumn = array_key_first($defaultSort);

        return $query
            ->allowedFilters(...$allowedFilters)
            ->allowedSorts(...$sortable)
            ->defaultSort($defaultSortColumn);
    }
}
