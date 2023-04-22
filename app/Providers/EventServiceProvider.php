<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    protected function logModel($act, $model)
    {
        if (get_class($model) != 'App\Models\Audit') {
            $user = request()->user();
            if ($user && !(
                get_class($user) == get_class($model) && $user->getKey() == $model->getKey()
            )) {
                $q = sprintf('SHOW INDEX FROM %s;', $model->getTable());
                $q = array_map(function($q) use($model) {
                    return $q->Column_name . ':' . $model->{$q->Column_name};
                }, DB::select($q));
                $user->audits()->create([
                    'action' => sprintf(
                        '%s %s(%s)', $act,
                        get_class($model), implode(',', $q)
                    ),
                ]);
            }
        }
    }

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        Event::listen('eloquent.created: *', function ($eventName, $data) {
            $this->logModel('membuat', $data[0]);
        });
        Event::listen('eloquent.updated: *', function ($eventName, $data) {
            $this->logModel('memperbarui', $data[0]);
        });
        Event::listen('eloquent.deleted: *', function ($eventName, $data) {
            $this->logModel('menghapus', $data[0]);
        });
    }
}
