<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    public $timestamps = false;

    public static function booted()
    {
        static::creating(function($model) {
            if (!is_string($model->action))
                $model->action = json_encode($model->action);
            $model->time = new \Illuminate\Support\Carbon();
            return true;
        });
        static::updating(function() {
            return false;
        });
        static::deleting(function() {
            return false;
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'action',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'time' => 'datetime',
    ];
}
