<?php

namespace App\Models;

use App\Models\Costing;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'pic', 'category_id'];

    protected $appends = ['cost'];

    public function costing(): HasMany
    {
        return $this->hasMany(Costing::class);
    }

    public function getCostAttribute()
    {
        return $this->costing->sum('cost');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
