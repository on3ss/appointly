import { buttonVariants } from '@/components/ui/button';
import Heading from '@/components/heading';
import { Team } from '@/types';
import { Service } from '@/types/resource';
import { PaginatedResponse } from '@/types/response';
import { Head, Link } from '@inertiajs/react';
import { create, index } from '@/routes/services';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { filterDefinitions } from './filter-definitions';

interface IndexProps {
    currentTeam: Team;
    services: PaginatedResponse<Service>;
    filters: Record<string, any>;
}

export default function Index({ currentTeam, services, filters }: IndexProps) {
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

                <div className="my-4 flex items-center justify-end">
                    <Link
                        href={create({ current_team: currentTeam.slug })}
                        className={buttonVariants({
                            variant: 'default',
                            size: 'sm',
                        })}
                    >
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

Index.layout = (props: { currentTeam: { name: string; slug: string } }) => ({
    breadcrumbs: [
        {
            title: 'Services',
            href: index({ current_team: props.currentTeam.slug }),
        },
    ],
});
