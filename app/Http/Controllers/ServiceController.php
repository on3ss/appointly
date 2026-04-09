<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Tables\ServiceTable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ServiceController extends Controller
{
    public function index()
    {
        $table = ServiceTable::define();

        $query = QueryBuilder::for(Service::class)
            ->where('team_id', auth()->user()->currentTeam->id);

        $query = $table->applyToQuery($query);

        $services = $query
            ->paginate(request()->input('per_page', 10))
            ->appends(request()->query());

        return Inertia::render('services/index', [
            'services' => $services,
            'table' => $table->toArray(),   // Pass as 'table' instead of 'tableSchema'
            'filters' => request()->input('filter', []),
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
