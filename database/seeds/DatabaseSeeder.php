<?php

use App\Post;
use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        User::firstOrCreate([
            'name' => 'amr',
            'email' => 'amr@test.com'
        ], [
            'password' => bcrypt('123123123'),
        ]);

        factory(Post::class, 10)->create();
    }
}
