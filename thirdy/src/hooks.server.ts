import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const ip = event.getClientAddress();
    console.log('Client IP:', ip);
    
    return resolve(event);
};
    