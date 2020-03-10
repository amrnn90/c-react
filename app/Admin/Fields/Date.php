<?php

namespace App\Admin\Fields;

class Date extends Field
{

  protected function defaultOptions() 
  {
    return [
      'enableTime' => false,
      // 'altInput' => true,
      // 'altFormat' => "j-n-Y - H:i",
    ];
  }

  public function enableTime()
  {
    $this->addOption('enableTime', true);
    return $this;
  }

  public function format($format)
  {
    $this->addOption('altFormat', $format);
    return $this;
  }
}
