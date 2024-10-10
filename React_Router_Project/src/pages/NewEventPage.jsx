import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function NewEventPage() {
    return (
        <>
            <EventForm />
        </>
    );
}

export async function action({ request }) {
    // Await the form data
    const formData = await request.formData();

    // Extract event data from the form
    const eventData = {
        title: formData.get('title'),
        image: formData.get('image'),
        date: formData.get('date'),
        description: formData.get('description'),
    };

    // Send a POST request to add the event
    const response = await fetch('http://localhost:8081/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    });

    // Handle the case when the response is not OK
    if (!response.ok) {
        throw json({ message: 'Could Not Save Event' }, { status: 500 });
    }

    // Redirect to the events list page after successful creation
    return redirect('/events');
}
