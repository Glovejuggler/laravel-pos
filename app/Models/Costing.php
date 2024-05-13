<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Costing extends Model
{
    use HasFactory;

    public $fillable = ['name', 'cost', 'item_id'];

    public function sold(): HasMany
    {
        return $this->hasMany(SoldItem::class, 'item_id', 'item_id');
    }
}
