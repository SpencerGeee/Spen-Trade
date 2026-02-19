import Pusher from "pusher"; // Changed from PusherServer to Pusher
import PusherClient from "pusher-js";

const pusherOptions = {
    appId: process.env.PUSHER_APP_ID || "app-id",
    key: process.env.NEXT_PUBLIC_PUSHER_KEY || "key",
    secret: process.env.PUSHER_SECRET || "secret",
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1",
    useTLS: true,
};

export const pusherServer = new Pusher(pusherOptions);

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_KEY || "key",
    {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "mt1",
    }
);
