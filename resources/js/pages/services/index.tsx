import { buttonVariants } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Team } from '@/types';
import { Service } from '@/types/resource';
import { PaginatedResponse } from '@/types/response';
import { Head, Link } from '@inertiajs/react';
import { create, index } from '@/routes/services';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

interface IndexProps {
    team: Team;
    services: PaginatedResponse<Service>;
    filters: Record<string, any>
}

export default function Index({ team, services, filters }: IndexProps) {
    const filterDefinitions = [
        {
            key: "name",
            label: "Name",
            type: "text" as const,
        },
        {
            key: "service_type",
            label: "Service Type",
            type: "text" as const
        }
    ]

    return (
        <>
            <Head title="Services" />
            <div className="mx-6 py-10">
                <div className="mb-6">
                    <Heading
                        variant="small"
                        title="Services"
                        description={`Manage the services offered by ${team.name}.`}
                    />
                </div>

                <div className="flex items-center justify-end my-4">
                    <Link href={create({ current_team: team.slug })} className={buttonVariants({ variant: "default", size: "sm" })}>
                        Create new
                    </Link>
                </div>

                <DataTable
                    columns={columns}
                    paginatedData={services}
                    filters={filters}
                    filterDefinitions={filterDefinitions}
                />
            </div>
        </>
    );
}

Index.layout = (props: { team: { name: string; slug: string } }) => ({
    breadcrumbs: [
        {
            title: 'Services',
            href: index({ current_team: props.team.slug }),
        },
    ],
});