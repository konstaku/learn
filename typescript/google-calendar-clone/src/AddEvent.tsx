import { FormEvent, useState } from 'react';
import type { CalendarEvent, EventColor } from './Calendar';

type AddEventProps = {
  showAddEvent: Date;
  setShowAddEvent: (date: Date | null) => void;
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
};

type AddEventHeaderProps = Pick<
  AddEventProps,
  'showAddEvent' | 'setShowAddEvent'
>;

// type FormCalendarEvent = Partial<CalendarEvent>;

type FormErrors = {
  name?: string;
  date?: string;
};

export default function AddEvent({
  setShowAddEvent,
  showAddEvent,
  events,
  setEvents,
}: AddEventProps) {
  console.log('events:', events);

  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body">
        <AddEventHeader
          showAddEvent={showAddEvent}
          setShowAddEvent={setShowAddEvent}
        />
        <AddEventBody
          showAddEvent={showAddEvent}
          setShowAddEvent={setShowAddEvent}
          events={events}
          setEvents={setEvents}
        />
      </div>
    </div>
  );
}

function AddEventHeader({
  showAddEvent: date,
  setShowAddEvent,
}: AddEventHeaderProps) {
  return (
    <>
      <div className="modal-title">
        <div>Add Event</div>
        <small>{`${date.getDate()}/${
          (date.getMonth() + 1).toString().length > 1
            ? (date.getMonth() + 1).toString()
            : '0' + (date.getMonth() + 1).toString()
        }/${date.getFullYear()}`}</small>
        <button className="close-btn" onClick={() => setShowAddEvent(null)}>
          &times;
        </button>
      </div>
    </>
  );
}

function AddEventBody({
  setShowAddEvent,
  showAddEvent: date,
  events,
  setEvents,
}: AddEventProps) {
  const [name, setName] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState<EventColor>('blue');
  const [errors, setErrors] = useState<FormErrors>({});

  // const [NewEvent, setNewEvent] = useState<FormCalendarEvent>({});

  return (
    <form onSubmit={validateAndSubmitEvent}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group checkbox">
        <input
          type="checkbox"
          name="all-day"
          id="all-day"
          defaultChecked={allDay}
          onChange={() => setAllDay(!allDay)}
        />
        <label htmlFor="all-day">All Day?</label>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="start-time">Start Time</label>
          <input
            type="time"
            name="start-time"
            id="start-time"
            defaultValue={startTime}
            disabled={allDay}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-time">End Time</label>
          <input
            type="time"
            name="end-time"
            id="end-time"
            disabled={allDay}
            defaultValue={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Color</label>
        <div className="row left">
          <input
            type="radio"
            name="color"
            value="blue"
            id="blue"
            defaultChecked
            className="color-radio"
            onFocus={() => setColor('blue')}
          />
          <label htmlFor="blue">
            <span className="sr-only">Blue</span>
          </label>
          <input
            type="radio"
            name="color"
            value="red"
            id="red"
            className="color-radio"
            onFocus={() => setColor('red')}
          />
          <label htmlFor="red">
            <span className="sr-only">Red</span>
          </label>
          <input
            type="radio"
            name="color"
            value="green"
            id="green"
            className="color-radio"
            onFocus={() => setColor('green')}
          />
          <label htmlFor="green">
            <span className="sr-only">Green</span>
          </label>
        </div>
      </div>
      <div className="row">
        <button className="btn btn-success" type="submit">
          Add
        </button>
        <button className="btn btn-delete" type="button">
          Delete
        </button>
      </div>
    </form>
  );

  function validateAndSubmitEvent(e: FormEvent) {
    e.preventDefault();

    if (!name) {
      return setErrors((currentErrors) => ({
        ...currentErrors,
        name: 'Name is required',
      }));
    }

    if (endTime < startTime) {
      return setErrors((currentErrors) => ({
        ...currentErrors,
        date: 'Event can not end before beginning',
      }));
    }

    if (allDay) {
      setEvents([
        ...events,
        {
          date: date,
          name: name,
          fullDay: true,
          color: color,
        },
      ]);
    }

    if (!allDay) {
      setEvents([
        ...events,
        {
          date: date,
          name: name,
          fullDay: false,
          startTime: startTime,
          endTime: endTime,
          color: color,
        },
      ]);
    }

    if (errors) {
      console.log('errors');
    }

    setShowAddEvent(null);
  }
}
