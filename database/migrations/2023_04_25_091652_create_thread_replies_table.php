<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateThreadRepliesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('thread_replies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('thread_id')
                    ->constrained('forum_threads')
                    ->restrictOnUpdate()
                    ->cascadeOnDelete();
            $table->foreignId('user_id');
            $table->string('body');
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
        Schema::dropIfExists('thread_replies');
    }
}
