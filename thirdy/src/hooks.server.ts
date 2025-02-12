import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const ip = event.getClientAddress();
    console.log('Client IP:', ip);

    // Get the User-Agent from request headers
    const userAgent = event.request.headers.get('user-agent');
    console.log('User-Agent:', userAgent);
    
    return resolve(event);
};
