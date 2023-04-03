<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{

    protected $table = "messages";
    protected $primaryKey ='id';
    public function user_table()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
