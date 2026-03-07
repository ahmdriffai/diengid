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
        Schema::create('properties', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('host_id')->constrained('host_profiles')->onDelete('cascade');
            $table->string('name');
            $table->string('address');
            $table->text('description');
            $table->string('image_url')->nullable();
            $table->float('lat')->nullable();
            $table->float('lng')->nullable();
            $table->enum('type', ['homestay', 'villa', 'guesthost'])->default('homestay');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
