<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntrantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entrants', function (Blueprint $table) {
            $table->unsignedBigInteger('nik')->primary();
            $table->string('nama');
            $table->enum('jk', ['l', 'p']);
            $table->string('t4_lahir');
            $table->date('tgl_lahir');
            $table->enum('agama', [
                'islam',
                'protestan',
                'katolik',
                'buddha',
                'hindu',
            ]);
            $table->string('alamat');
            $table->string('nama_ayah');
            $table->boolean('ayah_masih_hidup');
            $table->string('telp_ayah', 14)->nullable();
            $table->string('nama_ibu');
            $table->boolean('ibu_masih_hidup');
            $table->string('telp_ibu', 14)->nullable();
            $table->string('nama_wali')->nullable();
            $table->string('telp_wali', 14)->nullable();
            $table->string('alamat_wali');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entrants');
    }
}
