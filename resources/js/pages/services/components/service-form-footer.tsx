import { Button } from '@/components/ui/button';

interface ServiceFormFooterProps {
    isSubmitting: boolean;
    onCancel: () => void;
}

export function ServiceFormFooter({
    isSubmitting,
    onCancel,
}: ServiceFormFooterProps) {
    return (
        <div className="fixed right-0 bottom-0 left-0 z-10 border-t bg-background/80 p-4 backdrop-blur-md lg:left-64">
            <div className="mx-auto flex max-w-5xl justify-end gap-3">
                <Button type="button" variant="ghost" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving Changes...' : 'Save Service'}
                </Button>
            </div>
        </div>
    );
}
