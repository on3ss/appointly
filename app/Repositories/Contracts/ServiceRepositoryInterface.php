<?php

namespace App\Repositories\Contracts;

use App\Models\Team;
use App\Tables\Schemas\ServiceTableSchema;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ServiceRepositoryInterface
{
    public function getForTeam(Team $team, ServiceTableSchema $schema, array $options = []): LengthAwarePaginator;
}