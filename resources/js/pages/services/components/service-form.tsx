import { router } from '@inertiajs/react';
import { Form } from '@/components/ui/form';
import { ServiceFormValues } from '../service-schema';
import { Team } from '@/types';
import { useServiceForm } from '../hooks/use-service-form';
import { ServiceFormSidebar } from './service-form-sidebar';
import { ServiceFormBasicInfo } from './service-form-basic-info';
import { ServiceFormDeliveryConfig } from './service-form-delivery-config';
import { ServiceFormLocation } from './service-form-location';
import { ServiceFormVisibility } from './service-form-visibility';
import { ServiceFormFooter } from './service-form-footer';

interface ServiceFormProps {
    defaultValues: ServiceFormValues;
    teams: Team[];
    errors?: Partial<Record<keyof ServiceFormValues, string>>;
    cancelHref?: string;
    onSubmit: (data: ServiceFormValues) => void;
}

export default function ServiceForm({
    defaultValues,
    teams,
    errors: serverErrors,
    cancelHref,
    onSubmit,
}: ServiceFormProps) {
    const { form, isSubmitting, handleSubmit } = useServiceForm({
        defaultValues,
        serverErrors,
        onSubmit,
    });

    const handleCancel = () => {
        if (cancelHref) {
            router.visit(cancelHref);
        } else {
            window.history.back();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col gap-8 lg:flex-row">
                    <ServiceFormSidebar />

                    <div className="flex-1 space-y-8 pb-24">
                        <ServiceFormBasicInfo form={form} teams={teams} />
                        <ServiceFormDeliveryConfig form={form} />
                        <ServiceFormLocation form={form} />
                        <ServiceFormVisibility form={form} />
                    </div>
                </div>

                <ServiceFormFooter
                    isSubmitting={isSubmitting}
                    onCancel={handleCancel}
                />
            </form>
        </Form>
    );
}
