import { cn } from '@/lib/utils';
import { Info, Settings, MapPin, Globe } from 'lucide-react';

interface SidebarNavProps {
    className?: string;
}

export function ServiceFormSidebar({ className }: SidebarNavProps) {
    const sections = [
        {
            id: 'basic',
            label: 'Basic Info',
            icon: <Info className="h-4 w-4" />,
        },
        {
            id: 'delivery',
            label: 'Configuration',
            icon: <Settings className="h-4 w-4" />,
        },
        {
            id: 'location',
            label: 'Location',
            icon: <MapPin className="h-4 w-4" />,
        },
        {
            id: 'visibility',
            label: 'Visibility',
            icon: <Globe className="h-4 w-4" />,
        },
    ];

    return (
        <aside className={cn('hidden lg:block lg:w-64', className)}>
            <nav className="sticky top-24 space-y-1">
                {sections.map(({ id, label, icon }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                        {icon}
                        {label}
                    </a>
                ))}
            </nav>
        </aside>
    );
}
