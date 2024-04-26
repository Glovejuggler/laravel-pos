<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoldItem extends Model
{
    use HasFactory;

    protected $fillable = ['transaction_id', 'item_id', 'quantity'];

    protected $appends = ['item'];

    public function getItemAttribute()
    {
        return Item::find($this->item_id);
    }
}
