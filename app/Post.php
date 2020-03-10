<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Post extends Model
{
    use HasTranslations;

    protected $casts = ['featured' => 'boolean', 'image' => 'json', 'sections' => 'json', 'listo' => 'json', 'trans' => 'json'];

    public $translatable = ['trans',];
}
