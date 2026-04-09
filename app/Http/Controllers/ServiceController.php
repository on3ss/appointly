<?php

namespace App\Http\Controllers;

use App\Actions\Services\ListServices;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Request $request, ListServices $listServices)
    {
        return Inertia::render('services/index', $listServices->handle(
            $request->user()->currentTeam,
            $request->query()
        ));
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
