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

                'body'=> "Hello",
                'user_id'=> "1",

            ]
            );
            $messages->save();
        $messages = new \App\Models\Messages(
            [
                'body' => "World",
                'user_id' => "1",
            ]
            );
            $messages->save();
    }
}
