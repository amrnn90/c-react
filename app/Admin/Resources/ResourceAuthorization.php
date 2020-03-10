<?php

namespace App\Admin\Resources;

use Illuminate\Contracts\Auth\Access\Gate;

trait ResourceAuthorization
{
    public function abilities()
    {
        return [
            'access' => $this->canAccess(),
            'create' => $this->canCreate()
        ];
    }

    public function abilitiesForModel($model)
    { 
        return [
            'update' => $this->canUpdate($model),
            'force_delete' => $this->canForceDelete($model),
            'delete' => $this->canDelete($model),
            'restore' => $this->canRestore($model),
        ];
    }

    public function canAccess($doAuthorize = false)
    {
        return $this->can('viewAny', null, $doAuthorize);
    }

    public function canCreate($doAuthorize = false)
    {
        return $this->can('create', null, $doAuthorize);
    }

    public function canView($model, $doAuthorize = false)
    {
        return $this->can('view', $model, $doAuthorize);
    }

    public function canUpdate($model, $doAuthorize = false)
    {
        return $this->can('update', $model, $doAuthorize);
    }

    public function canForceDelete($model, $doAuthorize = false)
    {
        return $this->can('forceDelete', $model, $doAuthorize);
    }

    public function canDelete($model, $doAuthorize = false)
    {
        return $this->can('delete', $model, $doAuthorize);
    }

    public function canRestore($model, $doAuthorize = false)
    {
        return $this->can('restore', $model, $doAuthorize);
    }

    protected function can($ability, $model = null, $doAuthorize = false)
    {
        $method = $doAuthorize ? 'authorize' : 'allows';
        $model = $model ?? $this->model;

        return app(Gate::class)->$method($ability, $model);
    }
}
