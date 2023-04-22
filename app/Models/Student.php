<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    /**
     * Get the student's profile.
     *
     * @return \App\Models\Entrant
     */
    public function profil()
    {
        return $this->belongsTo(Entrant::class, 'nik', 'nik');
    }

    /**
     * Get the student's semester.
     *
     * @return int
     */
    public function getSemesterAttribute() {
        $s = strftime('%Y-%m');
        $y = (int)substr($s, 0, strpos($s, '-'));
        $b = (int)substr($s, strpos($s, '-') + 1);
        $s = $y - $this->tahun + floor((12-$b) / 6);
        return $s;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nik',
        'tahun',
    ];

    /**
     * The accessors to append to the model's array form
     *
     * @var array
     */
    protected $appends = [
        'semester',
    ];
}
