<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Messages;
class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $messages = new \App\Models\Messages(
            [
                'id'=> 1,
                'body'=> "Hello",
                'user_id' => 1,

            ]
            );
            $messages->save();
    }
}
