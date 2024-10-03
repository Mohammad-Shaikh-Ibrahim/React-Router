import { useParams } from "react-router-dom";

export default function EventDetaiPage() {
    const params = useParams();

    return (
        <>
            <h1>The EventsDetail Page</h1>
            <p>Event Id: {params.eventId}</p>
        </>
    );
}