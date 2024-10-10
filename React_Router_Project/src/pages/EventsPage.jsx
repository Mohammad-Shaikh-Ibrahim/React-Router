import { Await, defer, json, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
    const { events } = useLoaderData();

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
}

export default EventsPage;

async function loadEvents() {
    //in this function you can use any Browser api like : localStorge,...  
    //but you cant use hooks like : useState,...

    const response = await fetch('http://localhost:8081/events');

    if (!response.ok) {
        // return { isError: true, message: 'Could Not Fetch Events.' }
        // throw new Response(JSON.stringify({ message: 'Could Not Fetch Events.' }, { status: 500, }))
        throw json(
            { message: 'Could Not Fetch Events.' },
            { status: 500, });
    } else {
        // const resData = await response.json();
        // const res = new Response('any data', { status: 201 });
        // return res;
        const resData = await response.json();
        return resData.events;
    }
}

export function loader() {
    return defer({
        events: loadEvents(),
    })
}