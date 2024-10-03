import { Link } from "react-router-dom";


const DUMMY_EVENTS = [
    {
        id: 'e1',
        title: 'Some Event'
    },
    {
        id: 'e2',
        title: 'Another Event'
    },
]


export default function EventsPage() {
    return (
        <>
            <h1>The Events Page</h1>
            <ul>
                {DUMMY_EVENTS.map(
                    (event) => <li key={event.id}>
                        <Link to={event.id}
                        >
                            {event.title}
                        </Link>
                    </li>
                )}
            </ul>
        </>
    );
}