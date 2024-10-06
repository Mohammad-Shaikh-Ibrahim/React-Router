import { useRouteLoaderData } from 'react-router-dom'
import EditForm from '../components/EventForm.jsx'
export default function EditEventPage() {
    const data = useRouteLoaderData('event-detail');
    const event = data.event;
    return (
        <>
            <EditForm event={event} />
        </>
    );
}