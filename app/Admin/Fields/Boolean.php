<?php

namespace App\Admin\Fields;

class Boolean extends Field
{
  public function getCreateValue($model, $path, $value)
  {
    return $this->getUpdateValue($model, $path, $value);
  }

  public function getUpdateValue($model, $path, $value)
  {
    return !!parent::getUpdateValue($model, $path, $value);
  }
}
