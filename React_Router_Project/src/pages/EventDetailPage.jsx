
import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from '../components/EventItem'

export default function EventDetaiPage() {
    const data = useRouteLoaderData('event-detail');

    return (
        <>
            <EventItem event={data.event} />
        </>
    );
}

export async function loader({ request, params }) {
    const id = params.eventId;

    const response = await fetch('http://localhost:8081/events/' + id);

    if (!response.ok) {
        throw json(
            { message: "Could Not Fetch Details For Selected Events !" },
            { status: 500 }
        )
    } else {
        return response;
    }
    
}

export async function action({params,request}){
    const eventId= params.eventId
    const response = await fetch('http://localhost:8081/events/' + eventId,{
        method: request.method,
    });

    if (!response.ok) {
        throw json(
            { message: "Could Not Delete Events !" },
            { status: 500 }
        )
    }
    return redirect('/events')
}