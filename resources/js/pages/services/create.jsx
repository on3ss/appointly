import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import {
    index as servicesIndex,
    create as servicesCreate,
} from '@/routes/services';
import ServiceForm from './partials/service-form';

export default function Create() {
    return (
        <>
            <Head title="Create Service" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Create Service"
                    description="Add a new service to your provider"
                />
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <ServiceForm />
                    </div>
                </div>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Services',
            href: servicesIndex(),
        },
        {
            title: 'Create',
            href: servicesCreate(),
        },
    ],
};
