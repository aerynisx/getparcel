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
        Schema::create('parcels', function (Blueprint $table) {
            $table->id();
            $table->string('parcel_id')->unique();
            $table->string('tracking_number');
            $table->string('receiver_name');
            $table->string('courier');
            $table->date('received_date');
            $table->text('description')->nullable();
            $table->string('storage_location');
            $table->string('status')->default('stored');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parcels');
    }
};
