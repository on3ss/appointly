<?php

namespace App\Actions\Services;

use App\Models\Team;
use App\Repositories\Contracts\ServiceRepositoryInterface;
use App\Tables\Schemas\ServiceTableSchema;

class ListServices
{
    public function __construct(
        protected ServiceRepositoryInterface $repository
    ) {}

    public function handle(Team $team, array $options = []): array
    {
        $schema = new ServiceTableSchema;

        $services = $this->repository->getForTeam($team, $schema, $options);

        return [
            'services' => $services,
            'table' => $schema->toArray(),
            'filters' => $options['filter'] ?? [],
        ];
    }
}
