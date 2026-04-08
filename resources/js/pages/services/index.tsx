import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Plus, Pencil, Trash2, LayoutGrid, List } from 'lucide-react';

// Wayfinder & Types
import {
    index as servicesIndex,
    create as servicesCreate,
    edit as servicesEdit,
    destroy as servicesDestroy
} from '@/routes/services';
import { Team } from '@/types';

// shadcn/ui components
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Service {
    id: number;
    name: string;
    service_type: 'queue' | 'timeslot';
    price: number;
    is_active: boolean;
}

interface PaginatedData<T> {
    data: T[];
}

interface IndexProps {
    team: Team;
    services: PaginatedData<Service>;
}

export default function Index({ team, services }: IndexProps) {

    const handleDelete = (id: number) => {
        const route = servicesDestroy({ current_team: team.id, service: id });
        router.visit(route.url, { method: route.method });
    };

    return (
        <>
            <Head title="Services" />
            <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">


                {/* Header Section: Uses semantic text-foreground */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Services</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage the service catalog for <span className="font-medium text-foreground">{team.name}</span>.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button asChild>
                            <Link href={servicesCreate(team.id).url}>
                                <Plus className="mr-2 h-4 w-4" /> Create Service
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Main Content Card: Shadcn cards handle their own borders/bg in dark mode */}
                <Card className="border-border bg-card">
                    <CardHeader>
                        <CardTitle>Service Inventory</CardTitle>
                        <CardDescription>
                            All services currently registered to your team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[250px]">Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {services.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground italic">
                                            No services found. Get started by creating one.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    services.data.map((service: Service) => (
                                        <TableRow key={service.id} className="group border-border">
                                            <TableCell className="font-medium text-foreground">
                                                {service.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="capitalize">
                                                    {service.service_type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                ${(service.price / 1).toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={service.is_active ? "default" : "secondary"}>
                                                    {service.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-[160px]">
                                                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={servicesEdit({ current_team: team.id, service: service.id }).url}>
                                                                <Pencil className="mr-2 h-4 w-4" /> Edit Details
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <button className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-destructive hover:text-destructive-foreground text-destructive">
                                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                                </button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete service?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will permanently remove <span className="font-semibold">{service.name}</span>.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(service.id)}
                                                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                                    >
                                                                        Confirm Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}