import { buttonVariants } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Team } from '@/types';
import { Service } from '@/types/resource';
import { PaginatedResponse } from '@/types/response';
import { Head, Link } from '@inertiajs/react';
import { create, index } from '@/routes/services';
import { ResourceTable } from '@/components/resource-table';
import { TableSchema } from '@/types/table-schema';

interface IndexProps {
    currentTeam: Team;
    services: PaginatedResponse<Service>;
    table: TableSchema;
    filters: Record<string, any>;
}

export default function Index({ currentTeam, services, table, filters }: IndexProps) {
    return (
        <>
            <Head title="Services" />
            <div className="mx-6 py-10">
                <div className="mb-6">
                    <Heading
                        variant="small"
                        title="Services"
                        description={`Manage the services offered by ${currentTeam.name}.`}
                    />
                </div>

                <ResourceTable
                schema={table}
                data={services}
                filters={filters}
                actionButtons={
                    <Link href={create({ current_team: currentTeam.slug })} className={buttonVariants()}>
                        Create new
                    </Link>
                }
            />
            </div>
        </>
    );
}

Index.layout = (props: { currentTeam: { name: string; slug: string } }) => ({
    breadcrumbs: [
        {
            title: 'Services',
            href: index({ current_team: props.currentTeam.slug }),
        },
    ],
});
