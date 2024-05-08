<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'payment'];

    protected $appends = ['price', 'quantity', 'gross', 'cost'];

    public function items(): HasMany
    {
        return $this->hasMany(SoldItem::class);
    }

    public function getPriceAttribute()
    {
        return $this->items->sum('item.price');
    }

    public function getQuantityAttribute()
    {
        return $this->items->sum('quantity');
    }

    public function getGrossAttribute()
    {
        return $this->items->sum('price');
    }

    public function getCostAttribute()
    {
        return $this->items->sum('cost');
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%');
            });
        })->when($filters['date'] ?? null, function ($query, $date) {
            $date = $date ? Carbon::parse($date) : today();
            $query->whereDate('deleted_at', $date);
        });
    }
}
