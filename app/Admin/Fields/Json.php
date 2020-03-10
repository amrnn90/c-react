<?php

namespace App\Admin\Fields;

class Json extends Field
{

  protected $fields = [];
  protected $fieldsCallback = null;

  public function init($resource, $parentField = null)
  {
    parent::init($resource, $parentField);

    $this->getFields()->each(function ($field) use ($resource) {
      $field->init($resource, $this);
    });
  }

  public function structure()
  {
    return parent::structure() + [
      'fields' => $this->getFields()->map->structure()->all()
    ];
  }

  public function structureForModel($model)
  {
    return array_merge(parent::structureForModel($model), [
      'fields' => $this->getFields()->map->structureForModel($model),
    ]);
  }

  public function fields($callback)
  {
    $this->fieldsCallback = $callback;
    return $this;
  }

  public function getFields()
  {
    if (!!$this->fields) return $this->fields;

    $this->fields = collect(($this->fieldsCallback)());

    return $this->fields;
  }

  public function getChildNestedName($child)
  {
    return "{$this->nestedName()}.{$child->name()}";
  }

  public function getViewValue($model, $path)
  {
    $data = parent::getViewValue($model, $path);

    if (!$data) return $data;

    $data = is_string($data) ? json_decode($data) : (object) $data;

    $this->getFields()->each(function ($field) use ($model, $path, &$data) {
      $data->{$field->name()} = $field->getViewValue($model, $field->nestedName());
    }); 

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

    $result = [];

    $this->getFields()->each(function ($field) use ($model, $value,  $method, &$result) {
      $result[$field->name()] = $field->{"get{$method}Value"}($model, $field->nestedName(), data_get($value, $field->name()));
    });

    return $result;
  }

  public function getCreateRules()
  {
    $rules = parent::getCreateRules();

    $this->getFields()->each(function ($field) use (&$rules) {
      $rules = array_merge($rules, $field->getCreateRules());
    });

    return $rules;
  }

  public function getUpdateRules()
  {
    $rules = parent::getUpdateRules();

    $this->getFields()->each(function ($field) use (&$rules) {
      $rules = array_merge($rules, $field->getUpdateRules());
    });

    return $rules;
  }
}
