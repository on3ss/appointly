<?php

namespace App\Tables\Schemas;

use App\Tables\Columns\BadgeColumn;
use App\Tables\Columns\BooleanColumn;
use App\Tables\Columns\CurrencyColumn;
use App\Tables\Columns\TextColumn;
use App\Tables\Core\AbstractTableSchema;
use App\Tables\Filters\SelectFilter;
use App\Tables\Filters\TextFilter;

class ServiceTableSchema extends AbstractTableSchema
{
    protected function define(): void
    {
        // Columns
        $this->addColumn(
            TextColumn::make('name')
                ->label('Service Name')
                ->sortable()
                ->searchable()
        );
        $this->addColumn(
            BadgeColumn::make('service_type')
                ->label('Type')
        );
        $this->addColumn(
            CurrencyColumn::make('price')
                ->label('Price')
                ->currency('INR')
                ->sortable()
        );
        $this->addColumn(
            BooleanColumn::make('is_active')
                ->label('Status')
                ->sortable()
        );

        // Filters
        $this->addFilter(
            TextFilter::make('name')
                ->label('Name')
        );
        $this->addFilter(
            SelectFilter::make('service_type')
                ->label('Service Type')
                ->options([
                    ['label' => 'Timeslot', 'value' => 'timeslot'],
                    ['label' => 'Queue', 'value' => 'queue'],
                ])
        );
        $this->addFilter(
            SelectFilter::make('is_active')
                ->label('Status')
                ->options([
                    ['label' => 'Active', 'value' => '1'],
                    ['label' => 'Inactive', 'value' => '0'],
                ])
        );

        // Actions
        $this->setActions(['edit' => true, 'delete' => true]);

        // Default sorting
        $this->defaultSort('created_at', 'desc');
    }
}
