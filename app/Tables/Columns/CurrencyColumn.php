<?php

namespace App\Tables\Columns;

use App\Tables\Core\AbstractColumn;

class CurrencyColumn extends AbstractColumn
{
    protected string $currency = 'USD';

    protected string $locale = 'en_US';

    protected ?string $prefix = null;

    protected ?string $suffix = null;

    protected int $decimals = 2;

    public static function make(string $name): static
    {
        return new static($name);
    }

    public function currency(string $currency): static
    {
        $this->currency = $currency;

        return $this;
    }

    public function locale(string $locale): static
    {
        $this->locale = $locale;

        return $this;
    }

    public function prefix(string $prefix): static
    {
        $this->prefix = $prefix;

        return $this;
    }

    public function suffix(string $suffix): static
    {
        $this->suffix = $suffix;

        return $this;
    }

    public function decimals(int $decimals): static
    {
        $this->decimals = $decimals;

        return $this;
    }

    public function getCellType(): string
    {
        return 'currency';
    }

    public function toArray(): array
    {
        return array_merge(parent::toArray(), [
            'currency' => $this->currency,
            'locale' => $this->locale,
            'prefix' => $this->prefix,
            'suffix' => $this->suffix,
            'decimals' => $this->decimals,
        ]);
    }
}
