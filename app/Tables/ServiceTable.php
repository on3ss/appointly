<?php

namespace App\Tables;

use App\Tables\Table;
use App\Tables\Column;
use App\Tables\Filter;

class ServiceTable
{
    public static function define(): Table
    {
        return Table::make()
            ->columns([
                Column::make('name')
                    ->label('Service Name')
                    ->sortable()
                    ->searchable(),
                Column::make('service_type')
                    ->label('Type')
                    ->badge(),
                Column::make('price')
                    ->label('Price')
                    ->sortable()
                    ->currency(),
                Column::make('is_active')
                    ->label('Status')
                    ->sortable()
                    ->boolean(),
            ])
            ->filters([
                Filter::make('name')
                    ->label('Name')
                    ->text(),
                Filter::make('service_type')
                    ->label('Service Type')
                    ->select([
                        ['label' => 'Timeslot', 'value' => 'timeslot'],
                        ['label' => 'Queue', 'value' => 'queue'],
                    ]),
                Filter::make('is_active')
                    ->label('Status')
                    ->select([
                        ['label' => 'Active', 'value' => '1'],
                        ['label' => 'Inactive', 'value' => '0'],
                    ]),
            ])
            ->actions([
                'edit' => true,
                'delete' => true,
            ])
            ->defaultSort('created_at', 'desc');
    }
}