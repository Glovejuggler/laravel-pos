<?php

namespace App\Listeners;

use App\Events\OrderDone;

class NotifyPOS
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrderDone $event): void
    {
        //
    }
}
