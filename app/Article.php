<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Article extends Model
{
    use HasTranslations;
    protected $guarded = [];

    public $translatable = ['title', 'body'];
}
