<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\Users_table;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function() {
    Route::post('store', 'App\Http\Controllers\ImplementCRUDController@store');
    Route::post('create', 'App\Http\Controllers\ImplementCRUDController@create');
    Route::get('show/{id}', 'App\Http\Controllers\ImplementCRUDController@show');
    Route::get('test', 'App\Http\Controllers\ImplementCRUDController@index');
    Route::post('delete', 'App\Http\Controllers\ImplementCRUDController@delete');

});
