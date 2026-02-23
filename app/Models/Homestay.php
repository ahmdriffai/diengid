<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Homestay extends Model
{
    use HasUuids;

    protected $table = 'homestays';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];
}
