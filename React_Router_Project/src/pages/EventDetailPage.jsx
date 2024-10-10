// Import necessary hooks and components
import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";
import EventItem from '../components/EventItem';
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventDetailPage() {
    // Correct use of useRouteLoaderData
    const { event, events } = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {(lodedEvent) => <EventItem event={lodedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(lodedEvents) => <EventsList event={lodedEvents} />}
                </Await>
            </Suspense>
        </>
    );
}

async function loadEvent(id) {
    // Fetch event details from the backend
    const response = await fetch('http://localhost:8081/events/' + id);

    // Handle non-OK responses properly
    if (!response.ok) {
        throw json(
            { message: "Could Not Fetch Details For Selected Event!" },
            { status: 500 }
        );
    } else {
        const resData = await response.json();
        return resData.event;
    }

}

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


// Loader function to fetch event details
export async function loader({ params }) {
    const id = params.eventId;

    return defer({
        event: await loadEvent(id),
        events: loadEvents(),
    })
}

// Action function to handle delete event
export async function action({ params }) {
    const eventId = params.eventId;

    // Send delete request to the backend
    const response = await fetch('http://localhost:8081/events/' + eventId, {
        method: 'DELETE', // Use DELETE method
    });


    // Handle non-OK responses
    if (!response.ok) {
        throw json(
            { message: "Could Not Delete Event!" },
            { status: 500 }
        );
    }

    // Redirect to the events page after deletion
    return redirect('/events');
}
