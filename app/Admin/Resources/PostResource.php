<?php

namespace App\Admin\Resources;

use App\Admin\Fields\Date;
use App\Admin\Fields\ShortText;
use App\Admin\Fields\LongText;
use App\Admin\Fields\Boolean;
use App\Admin\Fields\Image;
use App\Admin\Fields\Json;
use App\Admin\Fields\JsonArray;
use App\Post;
use Str;

class PostResource
{
    use ResourceAuthorization;

    protected $model = Post::class;
    protected $titleField = 'title';
    protected $fields = null;
    protected $fieldsMap = [];

    public function __construct()
    {
        $this->getFields();
    }

    public static function make()
    {
        return new static();
    }

    public function structure()
    {
        return [
            'name' => $this->name(),
            'label' => $this->label(),
            'path' => $this->path(),
            'api_urls' => $this->apiUrls(),
            'title_field' => $this->titleField,
            'abilities' => $this->abilities(),
            'fields' => $this->getFields()->map->structure()->all(),
        ];
    }

    public function name()
    {
        return Str::snake(class_basename(self::class));
    }

    public function label()
    {
        return Str::plural(Str::title(class_basename($this->model)));
    }

    public function getField($name)
    {
        return $this->fieldsMap[$name];
    }

    public function index()
    {
        $result = $this->scope($this->model()->query()->latest())->paginate();

        $items = collect($result->items());

        $items =  $items->map(function ($item) {
            return $this->show($item);
        });

        $result->setCollection(collect($items));

        return $result;
    }

    public function show($model)
    {
        return [
            'abilities' => $this->abilitiesForModel($model),
            'api_urls' => $this->modelApiUrls($model),
            'id' => $this->getModelId($model),
            'fields' => $this->getFields()->map(function ($field) use ($model) {
                return array_merge($field->structureForModel($model), [
                    'data' => $field->getViewValue($model, $field->nestedName()),
                ]);
            })
        ];
    }


    public function find($id)
    {
        return $this->model()->find($id);
    }

    public function findOrFail($id)
    {
        return $this->model()->findOrFail($id);
    }

    public function destroy($model)
    {
        return $model->delete();
    }

    public function validateCreate($request)
    {
        $rules = [];
        $this->getFields()->each(function ($field) use (&$rules) {
            $rules = array_merge($rules, $field->getCreateRules());
        });

        return $request->validate($rules);
    }

    public function validateUpdate($request)
    {
        $rules = [];
        $this->getFields()->each(function ($field) use (&$rules) {
            $rules = array_merge($rules, $field->getUpdateRules());
        });

        return $request->validate($rules);
    }

    public function store($request)
    {
        $model = $this->model();

        $this->getFields()->each(function ($field) use ($request, $model) {
            // $field->createDataForModel($request->get($field->name()), $model);
            $model->{$field->name()} = $field->getCreateValue($model, $field->nestedName(), $request->get($field->name()));
        });

        $model->save();

        return $model;
    }

    public function update($model, $request)
    {
        $this->getFields()->each(function ($field) use ($request, $model) {
            // $field->updateDataForModel($request->get($field->name()), $model);
            $model->{$field->name()} = $field->getUpdateValue($model, $field->nestedName(), $request->get($field->name()));
        });

        $model->save();

        return $model;
    }

    protected function fields()
    {
        return [
            ShortText::make('title')
                ->rules('required')
                ->canView(function ($user, $post) {
                    return true;
                }),
            ShortText::make('trans'),

            LongText::make('body')
                ->rules('required|min:10')
                ->canSet(function () {
                    return true;
                }),

            Date::make('published_at')
                // ->label('Publish Date')
                ->rules('required'),
            // ->enableTime()
            // ->format("Y-m")

            Boolean::make('featured')
                ->rules('present'),

            Image::make('image')
                ->multiple(),
            // ->rules('required')

            Json::make('sections')
                ->fields(function () {
                    return [
                        JsonArray::make('lisss')
                            ->templateField(function () {
                                return ShortText::make('');
                            }),

                        Date::make('scheduled_at')
                            ->canSet(function () {
                                return true;
                            }),

                        Image::make('thumbs')
                            ->rules('required'),
                    ];
                }),
            JsonArray::make('listo')
                ->templateField(function () {
                    return ShortText::make('hola')
                        ->rules('required');
                }),
        ];
    }

    public function getFields()
    {
        if (!!$this->fields) return $this->fields;

        $this->fields = collect($this->fields())->map(function ($field) {
            $field->init($this);
            return $field;
        });

        return $this->fields;
    }

    public function addToFieldsMap($name, $field)
    {
        $this->fieldsMap[$name] = $field;
    }

    protected function path()
    {
        return Str::snake(Str::pluralStudly(class_basename($this->model)));
    }

    protected function apiUrls()
    {
        return [
            'base_path' => route('admin.api.index', $this->name()),
            'index' => route('admin.api.index', $this->name()),
            'store' => route('admin.api.store', $this->name()),
        ];
    }

    protected function modelApiUrls($model)
    {
        return [
            'show' => route('admin.api.show', [$this->name(), $model]),
            'update' => route('admin.api.update', [$this->name(), $model]),
            'delete' => route('admin.api.destroy', [$this->name(), $model]),
        ];
    }

    public function model()
    {
        return (new $this->model);
    }

    protected function scope($query)
    {
        return $query;
    }

    protected function getModelId($model)
    {
        return $model->getAttribute($model->getKeyName());
    }
}
