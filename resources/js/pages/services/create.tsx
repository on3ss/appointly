import { Head, router, usePage } from '@inertiajs/react';
import Heading from '@/components/heading';
import {
    index as servicesIndex,
    create as servicesCreate,
    store,
} from '@/routes/services';
import ServiceForm from './components/service-form';
import { ServiceFormValues } from './service-schema';
import { useMemo } from 'react';
import { Team } from '@/types';

export default function Create({ currentTeam }: { currentTeam: Team }) {
    const { errors, teams } = usePage().props as {
        errors: Partial<Record<keyof ServiceFormValues, string>>;
        teams: Team[];
    };

    const defaultValues = useMemo<ServiceFormValues>(
        () => ({
            team_id: teams[0]?.id || 0,
            name: '',
            description: null,
            rich_description: null,
            service_type: '',
            price: 0,
            settings: '{}',
            allowed_modes: [],
            location_address: null,
            latitude: null,
            longitude: null,
            contact_phone: null,
            contact_email: null,
            is_recurring_allowed: false,
            requires_membership: false,
            is_active: true,
        }),
        [teams],
    );

    return (
        <>
            <Head title="Create Service" />

            <div className="space-y-6 p-4">
                <Heading
                    variant="small"
                    title="Create Service"
                    description="Add a new service to your provider"
                />
                <div className="shadow-sm sm:rounded-lg">
                    <ServiceForm
                        defaultValues={defaultValues}
                        errors={errors}
                        teams={teams}
                        // Explicitly type 'data' here:
                        onSubmit={(data: ServiceFormValues) =>
                            router.post(
                                store({ current_team: currentTeam.slug }),
                                data,
                            )
                        }
                    />
                </div>
            </div>
        </>
    );
}

Create.layout = (props: { currentTeam: { name: string; slug: string } }) => {
    return {
        breadcrumbs: [
            {
                title: 'Services',
                href: servicesIndex({ current_team: props.currentTeam.slug }),
            },
            {
                title: 'Create',
                href: servicesCreate({ current_team: props.currentTeam.slug }),
            },
        ],
    };
};
