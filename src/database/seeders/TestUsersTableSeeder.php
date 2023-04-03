<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class TestUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users_table = new \App\Models\User([

            'name' => "test",
            'email'=> "test12@gftd.works",
            'password' => Hash::make('test'),
         ]);
         $users_table->save();
    }
}
