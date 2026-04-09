<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ServiceController extends Controller
{
    public function index()
    {
        $services = QueryBuilder::for(Service::class)
            ->where('team_id', auth()->user()->currentTeam->id)
            ->allowedFilters(
                AllowedFilter::partial('name'),
                AllowedFilter::exact('service_type'),
                AllowedFilter::exact('allowed_modes'),
                AllowedFilter::partial('contact_phone'),
                AllowedFilter::partial('contact_email'),
                AllowedFilter::exact('is_active'),
            )
            ->allowedSorts('name', 'price', 'allowed_modes', 'is_active')
            ->defaultSort('created_at')
            ->paginate(request()->input('per_page'))
            ->appends(request()->query());

        return Inertia::render('services/index', [
            'services' => $services
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'service_type' => 'required|in:queue,timeslot',
            'price' => 'required|numeric|min:0',
            // ... other rules
        ]);

        $team = auth()->user()->currentTeam;
        $validated['team_id'] = $team->id;

        Service::create($validated);

        // Include current_team in the redirect
        return redirect()->route('services.index', ['current_team' => $team->id])
            ->with('success', 'Service created.');
    }

    public function update(Request $request, Service $service)
    {
        $this->authorize('update', $service);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            // ... same rules as store
        ]);

        $service->update($validated);

        // Include current_team in the redirect
        return redirect()->route('services.index', ['current_team' => auth()->user()->currentTeam->id])
            ->with('success', 'Service updated.');
    }

    public function destroy(Service $service)
    {
        $this->authorize('delete', $service);
        $service->delete();

        // Include current_team in the redirect
        return redirect()->route('services.index', ['current_team' => auth()->user()->currentTeam->id])
            ->with('success', 'Service deleted.');
    }
}