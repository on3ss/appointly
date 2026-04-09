<?php

namespace App\Tables\Contracts;

interface Column
{
    public function getName(): string;

    public function getLabel(): string;

    public function isSortable(): bool;

    public function isSearchable(): bool;

    public function isToggleable(): bool;

    public function getAlignment(): ?string;

    public function getWidth(): ?string;

    public function toArray(): array;
}
