import { useEffect, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, ServiceFormValues } from '../service-schema';

export interface SettingsArrayItem {
    key: string;
    value: string;
}

export interface ExtendedFormValues extends ServiceFormValues {
    settings_array: SettingsArrayItem[];
}

// Helper: Transform settings JSON ↔ array
const parseSettingsToArray = (
    settingsJson: string | null,
): SettingsArrayItem[] => {
    if (!settingsJson) return [];
    try {
        const parsed = JSON.parse(settingsJson);
        return Object.entries(parsed).map(([key, value]) => ({
            key,
            value: String(value),
        }));
    } catch {
        return [];
    }
};

export const settingsArrayToJson = (array: SettingsArrayItem[]): string => {
    const obj = array.reduce<Record<string, string>>((acc, { key, value }) => {
        if (key.trim()) acc[key] = value;
        return acc;
    }, {});
    return JSON.stringify(obj);
};

interface UseServiceFormProps {
    defaultValues: ServiceFormValues;
    serverErrors?: Partial<Record<keyof ServiceFormValues, string>>;
    onSubmit: (data: ServiceFormValues) => void;
}

export function useServiceForm({
    defaultValues,
    serverErrors,
    onSubmit,
}: UseServiceFormProps) {
    const preppedValues = useMemo<ExtendedFormValues>(() => {
        const settingsArray = parseSettingsToArray(
            defaultValues.settings ?? '{}',
        );
        return {
            ...defaultValues,
            settings_array: settingsArray,
        };
    }, [defaultValues]);

    const form = useForm<ExtendedFormValues>({
        resolver: zodResolver(serviceSchema) as any,
        defaultValues: preppedValues,
    });

    const fieldArray = useFieldArray({
        control: form.control,
        name: 'settings_array',
    });

    useEffect(() => {
        if (!serverErrors) return;
        for (const [field, message] of Object.entries(serverErrors)) {
            form.setError(field as keyof ServiceFormValues, {
                type: 'server',
                message: message!,
            });
        }
    }, [serverErrors, form]);

    const handleFormSubmit = (data: ExtendedFormValues) => {
        const { settings_array, ...rest } = data;
        const finalData: ServiceFormValues = {
            ...rest,
            settings: settingsArrayToJson(settings_array),
        };
        onSubmit(finalData);
    };

    return {
        form,
        fieldArray,
        isSubmitting: form.formState.isSubmitting,
        handleSubmit: form.handleSubmit(handleFormSubmit),
    };
}
