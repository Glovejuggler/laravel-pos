<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'payment'];

    protected $appends = ['price'];

    public function items(): HasMany
    {
        return $this->hasMany(SoldItem::class);
    }

    public function getPriceAttribute()
    {
        return $this->items->sum('item.price');
    }
}
