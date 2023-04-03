<?php

namespace App\Http\Controllers;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Validator;

class AuthController extends Controller
{
    use AuthenticatesUsers;
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:2',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        } else {
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=>$token,
                'message'=>'Registerd Successfully'
            ]);
        }
    }
    /**
     * ログイン
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function login(Request $request)
    {
        // バリデーション
        $this->validateLogin($request);
        $result = false;
        $status = 401;
        $message = 'ユーザが見つかりません';
        $user = null;
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            // Success
            $request->session()->regenerate();
            $result = true;
            $status = 200;
            $message = 'OK';
            $user = Auth::user();
            // ※古いトークン削除&新しいトークン生成
            $user->tokens()->where('name', 'token-name')->delete();
            $token = $user->createToken('token-name')->plainTextToken;
        }
        return response()->json(['result' => $result, 'status' => $status, 'user' => $user, 'message' => $message]);
    }


    /**
     * ログアウト
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();
        //$request->session()->invalidate();
        //$request->session()->regenerateToken();



        $result = true;
        $status = 200;
        $message = 'ログアウトしました';
        return response()->json(['result' => $result, 'status' => $status, 'message' => $message]);
    }

    }
