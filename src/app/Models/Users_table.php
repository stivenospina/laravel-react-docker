<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users_table extends Model
{


    protected $table = 'users_table';

    public function messages()
    {
        return $this->hasMany(Messages::class);
    }

}
