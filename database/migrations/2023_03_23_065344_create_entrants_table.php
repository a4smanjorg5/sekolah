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
            $table->id();
            $table->string('nama');
            $table->unsignedBigInteger('nik')->unique();
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
            $table->string('kerja_ayah')->nullable();
            $table->unsignedBigInteger('hasil_ayah')->default(0);
            $table->string('nama_ibu');
            $table->boolean('ibu_masih_hidup');
            $table->string('telp_ibu', 14)->nullable();
            $table->string('kerja_ibu')->nullable();
            $table->unsignedBigInteger('hasil_ibu')->default(0);
            $table->string('nama_wali')->nullable();
            $table->string('telp_wali', 14)->nullable();
            $table->string('kerja_wali')->nullable();
            $table->unsignedBigInteger('hasil_wali')->default(0);
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
