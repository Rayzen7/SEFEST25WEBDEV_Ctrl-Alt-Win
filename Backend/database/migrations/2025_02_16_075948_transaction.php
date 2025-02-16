<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignid('doctor_id')->nullable()->constrained('doctors')->cascadeOnDelete();
            $table->foreignid('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('doctor_name');
            $table->string('user_name');
            $table->string('doctor_image');
            $table->string('doctor_specialist');
            $table->string('disease_complaints');
            $table->string('no_phone');
            $table->enum('status', ['pending', 'accepted'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
