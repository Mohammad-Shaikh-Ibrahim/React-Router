import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
    const data = useLoaderData();
    const events = data.events;

    // if (data.isError) {
    //     return <p>{data.message}</p>
    // }
    return (
        <>
            <EventsList events={events} />
        </>
    );
}

export default EventsPage;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    //in this function you can use any Browser api like : localStorge,...  
    //but you cant use hooks like : useState,...

    const response = await fetch('http://localhost:8081/events');

    if (!response.ok) {
        // return { isError: true, message: 'Could Not Fetch Events.' }
        throw {message: 'Could Not Fetch Events.'}
    } else {
        // const resData = await response.json();
        // const res = new Response('any data', { status: 201 });
        // return res;

        return response;
    }
}