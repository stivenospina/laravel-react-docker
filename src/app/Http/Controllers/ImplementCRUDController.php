<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Messages;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ImplementCRUDController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        /*
        $messages_list = Messages::orderBy('created_at','desc')->paginate(5);
        */

        $messages_list = User::with(['message' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])->paginate(1);

        /*

	return response()->json([
		'name' => 'atsushi',
		'email' => 'test@gftd.works',
	],200);
	*/
	return response()->json(
		$messages_list, 200
    );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
         $store = new \App\Models\Messages;
         $store->body = $request->body;
         $store->user_id = auth()->user()->id;
         $store->save();
         return response()->json($store,201);


    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //


        $messages_list = User::find(auth()->user()->id)->message()->orderBy('created_at','desc')->paginate(5);


        return response()->json(
            $messages_list, 200
        );

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function delete(Request $request)
    {
        $post =  Messages::find($request->id);

        $post->delete();

        $posts = Messages::all();
        return $posts;


    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

    }
}
