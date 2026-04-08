export interface Service {
    id: number;
    name: string;
    service_type: 'queue' | 'timeslot';
    price: number;
    is_active: boolean;
}