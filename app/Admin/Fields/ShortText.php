<?php

namespace App\Admin\Fields;

use Illuminate\Support\Arr;

class ShortText extends Field
{
  public function structure()
  {
    return array_merge(parent::structure(), [
      'translatable' => $this->isTranslatable(),
    ]);
  }

  public function getViewValue($model, $path)
  {
    if (!$this->checkCanView($model)) return null;
    
    return $this->isTranslatable() ? json_decode(data_get($model->getAttributes(), $path)) : data_get($model, $path);
  }

  protected function isTranslatable()
  {
    return in_array($this->nestedName(), data_get($this->resource->model(), 'translatable', []));
  }
}
