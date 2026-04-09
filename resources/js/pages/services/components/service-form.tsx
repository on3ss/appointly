import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, ServiceFormValues } from "../service-schema";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Team } from "@/types";

function ModeCheckboxGroup({
    field,
    options,
}: {
    field: any;
    options: { value: string; label: string }[];
}) {
    return (
        <div className="flex flex-wrap gap-4">
            {options.map((option) => (
                <FormItem
                    key={option.value}
                    className="flex flex-row items-start space-x-2 space-y-0"
                >
                    <FormControl>
                        <Checkbox
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                                const updated = checked
                                    ? [...(field.value || []), option.value]
                                    : (field.value || []).filter((v: string) => v !== option.value);
                                field.onChange(updated);
                            }}
                        />
                    </FormControl>
                    <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
            ))}
        </div>
    );
}

export default function ServiceForm({
    onSubmit,
    defaultValues,
    errors,
    teams,
}: {
    onSubmit: (data: ServiceFormValues) => void;
    defaultValues: ServiceFormValues;
    errors?: Partial<Record<keyof ServiceFormValues, string>>;
    teams: Team[];
}) {
    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema) as any,
        defaultValues,
    });

    // Apply server-side validation errors
    useEffect(() => {
        if (!errors) return;
        for (const [field, message] of Object.entries(errors)) {
            form.setError(field as keyof ServiceFormValues, {
                type: "server",
                message: message!,
            });
        }
    }, [errors, form]);

    const serviceTypes = [
        { value: "consultation", label: "Consultation" },
        { value: "workshop", label: "Workshop" },
        { value: "maintenance", label: "Maintenance" },
        { value: "delivery", label: "Delivery" },
        { value: "other", label: "Other" },
    ];

    const allowedModesOptions = [
        { value: "online", label: "Online" },
        { value: "in_person", label: "In Person" },
        { value: "phone", label: "Phone" },
        { value: "hybrid", label: "Hybrid" },
    ];

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => onSubmit(data))}
                className="max-w-4xl space-y-6"
            >
                {/* Basic Info */}
                <div className="grid lg:grid-cols-2 gap-4">
                    <FormField
                        name="team_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Team</FormLabel>
                                <Select
                                    onValueChange={(val) => field.onChange(parseInt(val))}
                                    value={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a team" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {teams.map((team) => (
                                            <SelectItem key={team.id} value={team.id.toString()}>
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Premium Cleaning" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="service_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service Type</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {serviceTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="lg:col-span-2">
                        <FormField
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Brief description of the service"
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <FormField
                            name="rich_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Detailed Description (Rich Text)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Full HTML or Markdown description"
                                            className="min-h-[120px]"
                                            {...field}
                                            value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        You can replace this with a rich text editor.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Delivery & Configuration */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Delivery & Configuration</h3>
                    <FormField
                        name="allowed_modes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Allowed Modes</FormLabel>
                                <FormControl>
                                    <ModeCheckboxGroup field={field} options={allowedModesOptions} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="settings"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Settings (JSON)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='{"key": "value"}'
                                        className="font-mono text-sm"
                                        {...field}
                                        value={field.value as string}
                                    />
                                </FormControl>
                                <FormDescription>Enter a valid JSON object.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Location & Contact */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Location & Contact</h3>
                    <div className="grid lg:grid-cols-2 gap-4">
                        <FormField
                            name="location_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value ?? ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                name="latitude"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Latitude</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="any"
                                                {...field}
                                                value={field.value ?? ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="longitude"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Longitude</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="any"
                                                {...field}
                                                value={field.value ?? ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            name="contact_phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value ?? ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="contact_email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} value={field.value ?? ""} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Boolean Switches */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Options</h3>
                    <FormField
                        name="is_recurring_allowed"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div>
                                    <FormLabel>Recurring Allowed</FormLabel>
                                    <FormDescription>
                                        Customers can book on a recurring basis.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="requires_membership"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div>
                                    <FormLabel>Requires Membership</FormLabel>
                                    <FormDescription>Only members can book.</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="is_active"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div>
                                    <FormLabel>Active</FormLabel>
                                    <FormDescription>Inactive services are hidden.</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="mt-6 cursor-pointer"
                    disabled={form.formState.isSubmitting}
                >
                    Save
                </Button>
            </form>
        </Form>
    );
}