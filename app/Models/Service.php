<?php

namespace App\Models;

use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'team_id',
    'name',
    'description',
    'rich_description',
    'service_type',
    'price',
    'settings',
    'allowed_modes',
    'location_address',
    'latitude',
    'longitude',
    'contact_phone',
    'contact_email',
    'is_recurring_allowed',
    'requires_membership',
    'is_active',
])]
class Service extends Model
{
    /** @use HasFactory<ServiceFactory> */
    use HasFactory, SoftDeletes;

    protected $casts = [
        'settings' => 'array',
        'allowed_modes' => 'array',
        'is_recurring_allowed' => 'boolean',
        'requires_membership' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
