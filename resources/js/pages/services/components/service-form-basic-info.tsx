import { UseFormReturn } from 'react-hook-form';
import { ExtendedFormValues } from '../hooks/use-service-form';
import { Team } from '@/types';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TiptapEditor } from '@/components/tiptap-editor';

interface ServiceFormBasicInfoProps {
    form: UseFormReturn<ExtendedFormValues>;
    teams: Team[];
}

export function ServiceFormBasicInfo({
    form,
    teams,
}: ServiceFormBasicInfoProps) {
    return (
        <Card id="basic">
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="team_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Team</FormLabel>
                                <Select
                                    onValueChange={(val) =>
                                        field.onChange(parseInt(val))
                                    }
                                    value={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a team" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {teams.map((team) => (
                                            <SelectItem
                                                key={team.id}
                                                value={team.id.toString()}
                                            >
                                                {team.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g., Premium Consulting"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="service_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="consultation">
                                            Consultation
                                        </SelectItem>
                                        <SelectItem value="workshop">
                                            Workshop
                                        </SelectItem>
                                        <SelectItem value="maintenance">
                                            Maintenance
                                        </SelectItem>
                                        <SelectItem value="delivery">
                                            Delivery
                                        </SelectItem>
                                        <SelectItem value="other">
                                            Other
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                                            {new Intl.NumberFormat(undefined, {
                                                style: 'currency',
                                                currency: 'USD',
                                                minimumFractionDigits: 0,
                                            })
                                                .format(0)
                                                .replace(/\d/g, '')
                                                .trim()}
                                        </span>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="pl-7"
                                            value={field.value ?? ''}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                field.onChange(
                                                    value === ''
                                                        ? null
                                                        : parseFloat(value),
                                                );
                                            }}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Brief summary..."
                                    {...field}
                                    value={field.value ?? ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rich_description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Detailed Description</FormLabel>
                            <FormControl>
                                <TiptapEditor
                                    value={field.value || ''}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );
}
