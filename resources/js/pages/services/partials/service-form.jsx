import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ServiceForm({ service }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: service?.name || '',
        description: service?.description || '',
        rich_description: service?.rich_description || '',
        service_type: service?.service_type || 'timeslot',
        price: service?.price || '',
        settings: service?.settings || {},
        allowed_modes: service?.allowed_modes || ['online', 'offline'],
        location_address: service?.location_address || '',
        latitude: service?.latitude || '',
        longitude: service?.longitude || '',
        contact_phone: service?.contact_phone || '',
        contact_email: service?.contact_email || '',
        is_recurring_allowed: service?.is_recurring_allowed || false,
        requires_membership: service?.requires_membership || false,
        is_active: service?.is_active ?? true,
    });

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setData('service_type', newType);
        setData('settings', {}); // reset type-specific settings
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (service?.id) {
            put(route('services.update', service.id));
        } else {
            post(route('services.store'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic fields */}
            <div>
                <label className="block font-medium">Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
            </div>

            <div>
                <label className="block font-medium">Short Description</label>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows="3"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block font-medium">Service Type</label>
                <select
                    value={data.service_type}
                    onChange={handleTypeChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                    <option value="timeslot">Time Slot</option>
                    <option value="queue">Queue (Token)</option>
                </select>
            </div>

            <div>
                <label className="block font-medium">Price</label>
                <input
                    type="number"
                    step="0.01"
                    value={data.price}
                    onChange={e => setData('price', e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* Dynamic fields based on service_type */}
            {data.service_type === 'timeslot' && (
                <>
                    <div>
                        <label className="block font-medium">Duration (minutes)</label>
                        <input
                            type="number"
                            value={data.settings.duration_minutes || ''}
                            onChange={e => setData('settings', { ...data.settings, duration_minutes: e.target.value })}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Buffer (minutes)</label>
                        <input
                            type="number"
                            value={data.settings.buffer_minutes || ''}
                            onChange={e => setData('settings', { ...data.settings, buffer_minutes: e.target.value })}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                </>
            )}

            {data.service_type === 'queue' && (
                <>
                    <div>
                        <label className="block font-medium">Average Service Duration (minutes)</label>
                        <input
                            type="number"
                            value={data.settings.average_service_duration || ''}
                            onChange={e => setData('settings', { ...data.settings, average_service_duration: e.target.value })}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Max Queue Capacity</label>
                        <input
                            type="number"
                            value={data.settings.max_queue_capacity || ''}
                            onChange={e => setData('settings', { ...data.settings, max_queue_capacity: e.target.value })}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                </>
            )}

            {/* Allowed modes checkboxes */}
            <div>
                <label className="block font-medium">Allowed Modes</label>
                <div className="space-x-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={data.allowed_modes.includes('online')}
                            onChange={e => {
                                const newModes = e.target.checked
                                    ? [...data.allowed_modes, 'online']
                                    : data.allowed_modes.filter(m => m !== 'online');
                                setData('allowed_modes', newModes);
                            }}
                            className="rounded border-gray-300"
                        />
                        <span className="ml-2">Online</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={data.allowed_modes.includes('offline')}
                            onChange={e => {
                                const newModes = e.target.checked
                                    ? [...data.allowed_modes, 'offline']
                                    : data.allowed_modes.filter(m => m !== 'offline');
                                setData('allowed_modes', newModes);
                            }}
                            className="rounded border-gray-300"
                        />
                        <span className="ml-2">Offline</span>
                    </label>
                </div>
            </div>

            {/* Location fields */}
            <div>
                <label className="block font-medium">Location Address</label>
                <input
                    type="text"
                    value={data.location_address}
                    onChange={e => setData('location_address', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium">Latitude</label>
                    <input
                        type="text"
                        value={data.latitude}
                        onChange={e => setData('latitude', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label className="block font-medium">Longitude</label>
                    <input
                        type="text"
                        value={data.longitude}
                        onChange={e => setData('longitude', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
            </div>

            {/* Contact fields */}
            <div>
                <label className="block font-medium">Contact Phone</label>
                <input
                    type="tel"
                    value={data.contact_phone}
                    onChange={e => setData('contact_phone', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="block font-medium">Contact Email</label>
                <input
                    type="email"
                    value={data.contact_email}
                    onChange={e => setData('contact_email', e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* Toggles */}
            <div className="flex space-x-6">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={data.is_recurring_allowed}
                        onChange={e => setData('is_recurring_allowed', e.target.checked)}
                        className="rounded border-gray-300"
                    />
                    <span className="ml-2">Allow Recurring</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={data.requires_membership}
                        onChange={e => setData('requires_membership', e.target.checked)}
                        className="rounded border-gray-300"
                    />
                    <span className="ml-2">Requires Membership</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={e => setData('is_active', e.target.checked)}
                        className="rounded border-gray-300"
                    />
                    <span className="ml-2">Active</span>
                </label>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={processing}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
            >
                {service?.id ? 'Update' : 'Create'}
            </button>
        </form>
    );
}