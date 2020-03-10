<?php

namespace App\Admin\Fields;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class Image extends Field
{
  protected function defaultOptions()
  {
    return [
      'multiple' => false,
    ];
  }

  public function init($resource, $parentField = null)
  {
    parent::init($resource, $parentField);
    $this->addOption('upload_url', route('admin.api.upload', [$this->resource->name(), $this->nestedName()]));
  }

  public function multiple()
  {
    $this->addOption('multiple', true);
    return $this;
  }

  public function getViewValue($model, $path)
  {
    $files = parent::getViewValue($model, $path);

    if (!$files) {
      return [];
    }

    $files = is_string($files) ? json_decode($files, true) : json_decode(json_encode($files), true);


    if (!isset($files[0])) {
      $files = [$files];
    }

    return collect($files ?? [])->map(function ($fileData) {
      return $fileData + ['preview' => Storage::disk($fileData['disk'])->url($fileData['path'])];
    });
  }

  public function getCreateValue($model, $path, $value)
  {
    return $this->getUpdateValue($model, $path, $value);
  }

  public function getUpdateValue($model, $path, $value)
  {
    if (!$this->checkCanSet($model)) return data_get($model, $path);

    $name = $this->name();

    $files = collect($value) ?? [];

    $files = $files->map(function ($file) {
      return Arr::only($file, ['path', 'disk', 'meta']);
    });

    return $this->options['multiple'] ? $files : ($files[0] ?? []);
  }
}
