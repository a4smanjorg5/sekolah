<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EntrantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nama' => $this->faker->name(),
            'nik' => $this->faker->randomNumber(9),
            'jk' => ['l', 'p'][rand(0, 1)],
            't4_lahir' => $this->faker->address(),
            'tgl_lahir' => '2001-10-05',
            'agama' => 'protestan',
            'alamat' => $this->faker->address(),
            'nama_ayah' => $this->faker->name(),
            'ayah_masih_hidup' => '1',
            'nama_ibu' => $this->faker->name(),
            'ibu_masih_hidup' => 1,
            'alamat_wali' => $this->faker->address(),
        ];
    }
}
