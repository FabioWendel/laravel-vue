<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class RoleMiddleware
{
    public function handle($request, Closure $next, ...$roles)
    {
        Log::error('AQUI');
        // Verifica se o usuário está autenticado
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Verifica se o usuário possui uma das roles permitidas
        if (!in_array($request->user()->role, $roles)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}
