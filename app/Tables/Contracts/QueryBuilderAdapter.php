<?php

namespace App\Tables\Contracts;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;

interface QueryBuilderAdapter
{
    public function apply(Builder $baseQuery, TableSchema $schema): QueryBuilder;
}
