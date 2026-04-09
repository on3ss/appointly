<?php

namespace App\Repositories\Eloquent;

use App\Models\Service;
use App\Models\Team;
use App\Repositories\Contracts\ServiceRepositoryInterface;
use App\Tables\Schemas\ServiceTableSchema;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ServiceRepository implements ServiceRepositoryInterface
{
    public function getForTeam(Team $team, ServiceTableSchema $schema, array $options = []): LengthAwarePaginator
    {
        $baseQuery = Service::query()->where('team_id', $team->id);

        $query = QueryBuilder::for($baseQuery);

        $schema->applyToQuery($query);

        return $query
            ->paginate($options['per_page'] ?? 10)
            ->appends($options);
    }
}