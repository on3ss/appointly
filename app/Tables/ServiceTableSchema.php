<?php

namespace App\Tables;

class ServiceTableSchema
{
    public static function get(): array
    {
        return [
            'columns' => [
                [
                    'key' => 'name',
                    'label' => 'Name',
                    'sortable' => true,
                    'filterable' => true,
                    'filterType' => 'text', // 'text', 'select', 'boolean'
                ],
                [
                    'key' => 'service_type',
                    'label' => 'Service Type',
                    'sortable' => false,
                    'filterable' => true,
                    'filterType' => 'select',
                    'filterOptions' => [
                        ['label' => 'Timeslot', 'value' => 'timeslot'],
                        ['label' => 'Queue', 'value' => 'queue'],
                    ],
                    // Custom cell rendering handled on frontend via type
                    'cellType' => 'badge',
                ],
                [
                    'key' => 'price',
                    'label' => 'Price',
                    'sortable' => true,
                    'filterable' => false,
                    'cellType' => 'currency',
                ],
                [
                    'key' => 'is_active',
                    'label' => 'Status',
                    'sortable' => true,
                    'filterable' => true,
                    'filterType' => 'select',
                    'filterOptions' => [
                        ['label' => 'Active', 'value' => '1'],
                        ['label' => 'Inactive', 'value' => '0'],
                    ],
                    'cellType' => 'boolean',
                ],
            ],
            // Actions column is special – maybe separate config
            'actions' => [
                'edit' => true,
                'delete' => true,
            ],
            'defaultSort' => ['key' => 'created_at', 'direction' => 'desc'],
        ];
    }
}