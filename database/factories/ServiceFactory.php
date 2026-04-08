<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'team_id' => Team::factory(),
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(),
            'service_type' => 'timeslot',
            'price' => $this->faker->randomFloat(2, 10, 200),
            'settings' => ['duration_minutes' => 60],
            'allowed_modes' => ['online', 'offline'],
            'is_active' => true,
        ];
    }
}
