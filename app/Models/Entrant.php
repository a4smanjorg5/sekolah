<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrant extends Model
{
    use HasFactory;

    public function resmi()
    {
        return $this->hasOne(Student::class, 'nik', 'nik');
    }

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tgl_lahir' => 'datetime',
        'ayah_masih_hidup' => 'boolean',
        'ibu_masih_hidup' => 'boolean',
    ];
}
