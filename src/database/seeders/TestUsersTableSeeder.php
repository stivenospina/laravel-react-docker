<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Users_table;
class TestUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users_table = new \App\Models\Users_table([

            'name' => "test",
            'email'=> "test12@gftd.works",
            'password' => "test",
         ]);
         $users_table->save();
    }
}
