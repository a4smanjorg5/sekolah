<?php

use Illuminate\Http\Client\PendingRequest;

if (! function_exists('featured_pages')) {
    function featured_pages($name, $lazy = false)
    {
        $tampil = cache($name, []);
        if (count($tampil) > 0) {
            $tampil = App\Models\Page::findMany($tampil);
            $tampil = iterator_to_array($tampil);
            for ($i=0; $i < count($tampil); $i++) {
                $p = $tampil[$i];
                if ($lazy && $i != 0) {
                    $p->media = Inertia\Inertia::lazy(function() use($p) {
                        $media = $p->getMedia();
                        unset($p->id_media);
                        return $media;
                    });
                } else {
                    $p->media = $p->getMedia();
                    unset($p->id_media);
                }
            }
        }
        return $tampil;
    }
}

if (! function_exists('http_cache')) {
    function http_cache($method, $url, $data = null, $json = false, PendingRequest $pr = null)
    {
        $k = 'http.' . bin2hex($url);
        if ($hasil = cache($k)) {
            return $hasil;
        }
        $hasil = call_user_func([$pr ?: 'Illuminate\Support\Facades\Http', $method], $url, $data);
        if ($json) $hasil = $hasil->json();
        else $hasil = $hasil->body();
        $mins = (int)config('cache.http', 0);
        if ($mins && $hasil)
            cache([$k => $hasil], now()->addMinutes($mins));
        return $hasil;
    }
}

if (! function_exists('ig_business')) {
    function ig_business($endpoint = null, $params = [], $method = 'get')
    {
        $ig = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.ig_business.access_token'),
        ]);
        $ig_url = config('services.ig_business.prefix_url');
        $q = count($params) ? ('?' . http_build_query($params)) : '';
        if ($endpoint && preg_match('/^[0-9]+$/', $endpoint)) 
            return http_cache($method, "$ig_url$endpoint$q", null, true, $ig);
        $ig_url .= config('services.ig_business.id');
        if ($endpoint)
            return $ig->{$method}("$ig_url/$endpoint$q")->json();
        return $ig;
    }
}

if (! function_exists('ig_profile')) {
    function ig_profile($fields = 'name,username')
    {
        $ig = ig_business(config('services.ig_business.id'),
         ['fields' => $fields]);
        unset($ig['id']);
        return $ig;
    }
}

if (! function_exists('ig_media')) {
    function ig_media()
    {
        return ig_business('media', array_merge(
            ['fields' => 'media_type,media_url,thumbnail_url,caption,permalink'],
            request()->except(['access_token'])
        ));
    }
}
