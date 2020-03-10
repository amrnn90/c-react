<?php

namespace App;

use App\Admin\Resources\PostResource;

class Admin
{
    public function structure()
    {
        return [
            'resources' => collect($this->resources())->map->structure()->all(),
            'locales' => $this->locales(),
            'base_path' => '/admin',
            'base_api_path' => '/admin/api',
            'api_urls' => $this->apiUrls()
        ] ;
    }

    public function resources()
    {
        return [
            PostResource::make(),
        ];
    }

    public function locales()
    {
        return ['en', 'ar', 'sp'];
    }

    public function getResource($name)
    {
        return collect($this->resources())->filter(function($resource) use ($name) {
            return $resource->name() == $name;
        })->first();
    }

    protected function apiUrls() {
        return [
            'logout' => route('admin.logout'),
        ];
    }
}