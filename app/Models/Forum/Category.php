<?php

namespace App\Models\Forum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    public function topics()
    {
        return $this->hasMany(Topic::class);
    }

    public function threads()
    {
        return $this->hasManyThrough(Thread::class, Topic::class);
    }

    protected $table = 'forum_categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
    ];
}
