<?php

namespace App\Tables;

use Illuminate\Contracts\Support\Arrayable;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class Table implements Arrayable
{
    /** @var Column[] */
    protected array $columns = [];

    /** @var Filter[] */
    protected array $filters = [];

    protected array $actions = [];
    protected array $bulkActions = [];
    protected array $defaultHiddenColumns = [];
    protected string|array $defaultSort = ['created_at' => 'desc'];

    public static function make(): static
    {
        return new static();
    }

    public function columns(array $columns): self
    {
        $this->columns = $columns;
        return $this;
    }

    public function filters(array $filters): self
    {
        $this->filters = $filters;
        return $this;
    }

    public function actions(array $actions): self
    {
        $this->actions = $actions;
        return $this;
    }

    public function bulkActions(array $bulkActions): self
    {
        $this->bulkActions = $bulkActions;
        return $this;
    }

    public function defaultSort(string|array $column, string $direction = 'desc'): self
    {
        if (is_string($column)) {
            $this->defaultSort = [$column => $direction];
        } else {
            $this->defaultSort = $column;
        }
        return $this;
    }

    public function defaultHiddenColumns(array $columns): self
    {
        $this->defaultHiddenColumns = $columns;
        return $this;
    }

    /**
     * Get all sortable column keys.
     */
    public function getSortableColumns(): array
    {
        return array_values(array_filter(array_map(
            fn(Column $col) => $col->isSortable() ? $col->getName() : null,
            $this->columns
        )));
    }

    /**
     * Get all searchable column keys.
     */
    public function getSearchableColumns(): array
    {
        return array_values(array_filter(array_map(
            fn(Column $col) => $col->isSearchable() ? $col->getName() : null,
            $this->columns
        )));
    }

    /**
     * Build Spatie AllowedFilter instances from defined filters + searchable columns.
     */
    public function getAllowedFilters(): array
    {
        $filters = [];

        // Add explicit filters
        foreach ($this->filters as $filter) {
            $filters[] = $filter instanceof Filter
                ? $filter->toAllowedFilter()
                : AllowedFilter::partial($filter);
        }

        // Add searchable columns as partial filters
        foreach ($this->getSearchableColumns() as $column) {
            $filters[] = AllowedFilter::partial($column);
        }

        return $filters;
    }

    /**
     * Apply table configuration to a QueryBuilder instance.
     */
    public function applyToQuery(QueryBuilder $query): QueryBuilder
    {
        return $query
            ->allowedFilters(...$this->getAllowedFilters())
            ->allowedSorts(...$this->getSortableColumns())
            ->defaultSort(array_key_first($this->defaultSort));
    }

    /**
     * Convert table definition to array for frontend.
     */
    public function toArray(): array
    {
        return [
            'columns' => array_map(fn(Column $col) => $col->toArray(), $this->columns),
            'filters' => array_map(fn(Filter $filter) => $filter->toArray(), $this->filters),
            'actions' => (object) $this->actions,
            'bulkActions' => $this->bulkActions,
            'defaultSort' => [
                'key' => array_key_first($this->defaultSort),
                'direction' => reset($this->defaultSort),
            ],
            'defaultHiddenColumns' => $this->defaultHiddenColumns,
        ];
    }
}