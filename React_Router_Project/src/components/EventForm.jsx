/* eslint-disable react/prop-types */


import { Form, useNavigate, useNavigation, useActionData, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';
  function cancelHandler() {
    navigate('..')
  }

  return (
    <Form
      method={method}
      className={classes.form}>
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
      </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={event ? event.title : ''}
          required
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={event ? event.image : ''}
          required
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ''}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          defaultValue={event ? event.description : ''}
          required
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;


export async function action({ request, params }) {
  const method = request.method;
  // Await the form data
  const formData = await request.formData();

  // Extract event data from the form
  const eventData = {
    title: formData.get('title'),
    image: formData.get('image'),
    date: formData.get('date'),
    description: formData.get('description'),
  };

  let url = 'http://localhost:8081/events';

  if (method === 'PATCH') {
    const eventId = params.eventId;
    url = 'http://localhost:8081/events/' + eventId;
  }

  // Send a POST request to add the event
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  // Handle the case when the response is not OK
  if (!response.ok) {
    throw json({ message: 'Could Not Save Event' }, { status: 500 });
  }

  // Redirect to the events list page after successful creation
  return redirect('/events');
}
