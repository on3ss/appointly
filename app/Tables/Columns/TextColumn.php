<?php

namespace App\Tables\Columns;

use App\Tables\Core\AbstractColumn;

class TextColumn extends AbstractColumn
{
    public static function make(string $name): static
    {
        return new static($name);
    }

    public function getCellType(): string
    {
        return 'text';
    }
}
