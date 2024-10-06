import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function NewEventPage() {
    return (
        <>
            <EventForm />
        </>
    );
}

export async function action({request, params}) {
    const data = request.formData();
    const enteredData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
    }
    const response = await fetch('http://localhost:8081/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enteredData)
    });

    if (!response.ok) {
        throw json({ message: 'Could Not Save Event' }, { status: 500 })
    }
    return redirect('/events');
}