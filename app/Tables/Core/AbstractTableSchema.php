<?php

namespace App\Tables\Core;

use App\Tables\Contracts\QueryBuilderAdapter;
use App\Tables\Contracts\TableSchema;
use Spatie\QueryBuilder\QueryBuilder;

abstract class AbstractTableSchema implements TableSchema
{
    protected array $columns = [];

    protected array $filters = [];

    protected array $actions = [];

    protected array $bulkActions = [];

    protected array $defaultHiddenColumns = [];

    protected array $defaultSort = ['created_at' => 'desc'];

    protected QueryBuilderAdapter $queryAdapter;

    public function __construct(?QueryBuilderAdapter $adapter = null)
    {
        $this->queryAdapter = $adapter ?? new SpatieQueryBuilderAdapter;
        $this->define();
    }

    /**
     * Define columns, filters, actions inside this method.
     */
    abstract protected function define(): void;

    protected function addColumn(AbstractColumn $column): void
    {
        $this->columns[] = $column;
    }

    protected function addFilter(AbstractFilter $filter): void
    {
        $this->filters[] = $filter;
    }

    protected function setActions(array $actions): void
    {
        $this->actions = $actions;
    }

    protected function setBulkActions(array $bulkActions): void
    {
        $this->bulkActions = $bulkActions;
    }

    protected function defaultSort(string $column, string $direction = 'desc'): void
    {
        $this->defaultSort = [$column => $direction];
    }

    protected function hideColumnsByDefault(array $columns): void
    {
        $this->defaultHiddenColumns = $columns;
    }

    public function getColumns(): array
    {
        return $this->columns;
    }

    public function getFilters(): array
    {
        return $this->filters;
    }

    public function getActions(): array
    {
        return $this->actions;
    }

    public function getBulkActions(): array
    {
        return $this->bulkActions;
    }

    public function getDefaultSort(): array
    {
        return $this->defaultSort;
    }

    public function getDefaultHiddenColumns(): array
    {
        return $this->defaultHiddenColumns;
    }

    public function applyToQuery(QueryBuilder $query): QueryBuilder
    {
        return $this->queryAdapter->apply($query->getEloquentBuilder(), $this);
    }

    public function toArray(): array
    {
        return [
            'columns' => array_map(fn ($col) => $col->toArray(), $this->columns),
            'filters' => array_map(fn ($filter) => $filter->toArray(), $this->filters),
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
