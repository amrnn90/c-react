<?php

namespace App\Admin\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index($resourceName)
    {
        $resource = $this->resource($resourceName);

        $resource->canAccess(true);

        return $resource->index();
    }

    public function show($resourceName, $id)
    {
        $resource = $this->resource($resourceName);

        $model = $resource->findOrFail($id);

        $resource->canView($model, true);

        return $resource->show($model);
    }

    public function store($resourceName)
    {
        $resource = $this->resource($resourceName);

        $resource->canCreate(true);

        $resource->validateCreate(request());

        $model = $resource->store(request());

        return $resource->show($model);
    }

    public function update($resourceName, $id)
    {
        $resource = $this->resource($resourceName);

        $model = $resource->findOrFail($id);

        $resource->canUpdate($model, true);

        $resource->validateUpdate(request());

        $resource->update($model, request());

        return $resource->show($model);
    }

    public function destroy($resourceName, $id)
    {
        $resource = $this->resource($resourceName);

        $model = $resource->findOrFail($id);

        $resource->canForceDelete($model, true);

        $resource->destroy($model);

        return response()->json([
            'message' => 'Deleted Successfully', 
        ], 200);
    }
    
    public function spa()
    {
        $structure = $this->admin()->structure();
        return view('admin.index')->with('structure', $structure);
    }
}
