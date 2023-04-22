<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    public function getMedia()
    {
        if ($this->id_media != 0) {
            $media = ig_business($this->id_media, ['fields' => 'media_url,thumbnail_url']);
            if (!array_key_exists('media_url', $media)) {
                if (empty($this->judul))
                    $this->delete();
                else {
                    $this->id_media = 0;
                    $this->save();
                }
            }
        } else $media = null;
        return $media;
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
        'id_media' => 'string',
    ];
}
