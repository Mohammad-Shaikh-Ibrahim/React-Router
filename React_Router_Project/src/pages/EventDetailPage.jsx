// Import necessary hooks and components
import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from '../components/EventItem';

export default function EventDetailPage() {
    // Correct use of useRouteLoaderData
    const data = useRouteLoaderData('event-detail');

    return (
        <>
            {/* Render the event item */}
            <EventItem event={data.event} />
        </>
    );
}

// Loader function to fetch event details
export async function loader({ params }) {
    const id = params.eventId;

    // Fetch event details from the backend
    const response = await fetch('http://localhost:8081/events/' + id);

    // Handle non-OK responses properly
    if (!response.ok) {
        throw json(
            { message: "Could Not Fetch Details For Selected Event!" },
            { status: 500 }
        );
    }

    // Return parsed JSON data
    const data = await response.json();
    return { event: data };
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
