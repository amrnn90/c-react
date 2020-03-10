<?php

namespace App\Admin\Fields;

use stdClass;

class JsonArray extends Field
{
  protected $templateField;
  protected $templateFieldCallback;


  public function init($resource, $parentField = null)
  {
    parent::init($resource, $parentField);

    $this->getTemplateField()->init($resource, $this);
  }

  public function structure()
  {
    return parent::structure() + [
      'template_field' => $this->getTemplateField()->structure()
    ];
  }

  public function structureForModel($model)
  {
    return array_merge(parent::structureForModel($model), [
      'template_field' => $this->getTemplateField()->structureForModel($model),
    ]);
  }


  public function templateField($callback)
  {
    $this->templateFieldCallback = $callback;
    return $this;
  }

  public function getTemplateField()
  {
    if (!!$this->templateField) return $this->templateField;

    $this->templateField =  ($this->templateFieldCallback)();

    return $this->templateField;
  }

  public function getChildNestedName($child)
  {
    return "{$this->nestedName()}.*";
  }

  public function getViewValue($model, $path)
  {
    $data = parent::getViewValue($model, $path);

    if (!$data) return $data;

    $data = is_string($data) ? json_decode($data, true) : (array) $data;

    for ($i = 0; $i < count($data); $i++) {
      $itemPath = $path . '.' . $i;
      $data[$i] = $this->getTemplateField()->getViewValue($model, $itemPath);
    }

    return $data;
  }



  public function getCreateValue($model, $path, $value)
  {
    return $this->getMutationValue($model, $path, $value, 'create');
  }


  public function getUpdateValue($model, $path, $value)
  {
    return $this->getMutationValue($model, $path, $value, 'update');
  }

  public function getMutationValue($model, $path, $value, $method)
  {
    if (!$this->checkCanSet($model)) return data_get($model, $path);

    $value = $value ?? [];
    
    $result = [];

    for ($i = 0; $i < count($value); $i++) {
      $itemPath = $path . '.' . $i;
      $result[$i] = $this->getTemplateField()->{"get{$method}Value"}($model, $itemPath, data_get($value, $i));
    }

    return $result;
  }

  public function getCreateRules()
  {
    $rules = parent::getCreateRules();

    $rules = array_merge($rules, $this->getTemplateField()->getCreateRules());

    return $rules;
  }

  public function getUpdateRules()
  {
    $rules = parent::getUpdateRules();

    $rules = array_merge($rules, $this->getTemplateField()->getUpdateRules());

    return $rules;
  }

}
