import { UseFormReturn } from 'react-hook-form';
import { ExtendedFormValues } from '../hooks/use-service-form';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceFormVisibilityProps {
    form: UseFormReturn<ExtendedFormValues>;
}

export function ServiceFormVisibility({ form }: ServiceFormVisibilityProps) {
    return (
        <Card id="visibility">
            <CardHeader>
                <CardTitle>Visibility & Rules</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border bg-card p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Published</FormLabel>
                                <FormDescription>
                                    Make this service visible to the public.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="is_recurring_allowed"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border bg-card p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Recurring Allowed</FormLabel>
                                <FormDescription>
                                    Customers can book on a recurring basis.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="requires_membership"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border bg-card p-4">
                            <div className="space-y-0.5">
                                <FormLabel>Requires Membership</FormLabel>
                                <FormDescription>
                                    Only members can book this service.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    );
}
