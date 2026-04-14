import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ExtendedFormValues } from '../hooks/use-service-form';
import { Plus, Trash2 } from 'lucide-react';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { FieldLabel as ShadcnFieldLabel } from '@/components/ui/field'; // Renamed to avoid conflict

interface ServiceFormDeliveryConfigProps {
    form: UseFormReturn<ExtendedFormValues>;
}

export function ServiceFormDeliveryConfig({
    form,
}: ServiceFormDeliveryConfigProps) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'settings_array',
    });

    return (
        <Card id="delivery">
            <CardHeader>
                <CardTitle>Delivery & Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormField
                    control={form.control}
                    name="allowed_modes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Allowed Modes</FormLabel>
                            <div className="flex flex-wrap gap-6">
                                {['online', 'in_person', 'phone', 'hybrid'].map(
                                    (mode) => (
                                        <Field
                                            key={mode}
                                            orientation="horizontal"
                                            className="items-center gap-2"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={
                                                        field.value?.includes(
                                                            mode,
                                                        ) ?? false
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) => {
                                                        const updated = checked
                                                            ? [
                                                                  ...(field.value ||
                                                                      []),
                                                                  mode,
                                                              ]
                                                            : (
                                                                  field.value ||
                                                                  []
                                                              ).filter(
                                                                  (v: string) =>
                                                                      v !==
                                                                      mode,
                                                              );
                                                        field.onChange(updated);
                                                    }}
                                                />
                                            </FormControl>
                                            <ShadcnFieldLabel className="font-normal capitalize">
                                                {mode.replace('_', ' ')}
                                            </ShadcnFieldLabel>
                                        </Field>
                                    ),
                                )}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-3">
                    <FormLabel>Custom Settings</FormLabel>
                    <FormDescription>
                        Define key-value pairs for service-specific attributes.
                    </FormDescription>
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="flex animate-in gap-2 fade-in slide-in-from-top-1"
                        >
                            <Input
                                className="flex-1"
                                placeholder="Key"
                                {...form.register(
                                    `settings_array.${index}.key`,
                                )}
                            />
                            <Input
                                className="flex-1"
                                placeholder="Value"
                                {...form.register(
                                    `settings_array.${index}.value`,
                                )}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ key: '', value: '' })}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Setting
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}