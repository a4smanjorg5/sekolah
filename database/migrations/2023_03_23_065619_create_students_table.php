<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            // $table->unsignedBigInteger('nik')->unique();
            $table->foreignId('nik')
                    ->unique()
                    ->constrained('entrants', 'nik')
                    ->restrictOnUpdate()
                    ->cascadeOnDelete();
            $table->foreignId('genrwork')->default(0);
            $table->unsignedInteger('tahun');
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
        Schema::dropIfExists('students');
    }
}
