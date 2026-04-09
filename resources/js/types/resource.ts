export interface ServiceSettings {
    // Timeslot-specific
    duration_minutes?: number;
    buffer_minutes?: number;
    max_advance_days?: number;
    // Queue-specific
    average_service_duration?: number;
    max_queue_capacity?: number;
    auto_assign_token?: boolean;
    // Additional custom fields
    [key: string]: unknown;
}

export interface Service {
    id: number;
    team_id: number;
    name: string;
    description: string | null;
    rich_description: string | null;
    service_type: 'queue' | 'timeslot';
    price: number;
    settings: ServiceSettings | null;
    allowed_modes: ('online' | 'offline')[];
    location_address: string | null;
    latitude: number | null;
    longitude: number | null;
    contact_phone: string | null;
    contact_email: string | null;
    is_recurring_allowed: boolean;
    requires_membership: boolean;
    is_active: boolean;
    created_at: string; // ISO datetime
    updated_at: string;
    deleted_at: string | null;
    // Optional fields from Spatie Media Library (accessors)
    cover_url?: string | null;
    gallery_urls?: string[];
}
