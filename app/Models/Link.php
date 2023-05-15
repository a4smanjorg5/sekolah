<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class Link extends Model
{
    use HasFactory;

    public function updateIcon(UploadedFile $icon)
    {
        tap($this->icon_path, function ($previous) use ($icon) {
            $this->forceFill([
                'icon_path' => $icon->storePublicly(
                    'icons', ['disk' => DISK_STORAGE]
                ),
            ])->save();

            if ($previous) {
                Storage::disk(DISK_STORAGE)->delete($previous);
            }
        });
    }

    public function getIconUrlAttribute()
    {
        return Storage::disk(DISK_STORAGE)->url($this->icon_path);
    }

    /**
     * The accessors to append to the model's array form
     *
     * @var array
     */
    protected $appends = [
        'icon_url',
    ];
}
