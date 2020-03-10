<?php

namespace App\Admin\Models;

use Illuminate\Database\Eloquent\Model;

class UploadedMedia extends Model
{
    protected $guarded = [];

    public static function findByFileData($fileData)
    {
        return static::where('path', $fileData['path'])->where('disk', $fileData['disk'])->first();
    }

    public static function createByFileData($fileData)
    {
        static::create([
            'path' => $fileData['path'],
            'disk' => $fileData['disk'],
        ]);
    }

    public function attachMediable($mediable)
    {
        $this->mediable()->associate($mediable)->save();
    }

    public function mediable()
    {
        return $this->morphTo();
    }
}
