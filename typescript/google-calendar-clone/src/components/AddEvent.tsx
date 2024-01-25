import { FormEvent, useRef, useState } from 'react';
import type { CalendarEvent, EventColor, NewCalendarEvent } from './Calendar';
import { getReadableDate, handleCloseModal } from '../utilities/helpers';

export type AddEventProps = {
  showAddEvent: CalendarEvent | NewCalendarEvent;
  setShowAddEvent: (event: CalendarEvent | NewCalendarEvent | null) => void;
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
};

type AddEventHeaderProps = {
  modalRef: React.RefObject<HTMLDivElement>;
} & Pick<AddEventProps, 'showAddEvent' | 'setShowAddEvent'>;

type FormErrors = {
  name?: string;
  date?: string;
};

export default function AddOrEditEvent({
  showAddEvent,
  setShowAddEvent,
  events,
  setEvents,
}: AddEventProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div className="modal" ref={modalRef}>
      <div className="overlay"></div>
      <div className="modal-body">
        <AddEventHeader
          showAddEvent={showAddEvent}
          setShowAddEvent={setShowAddEvent}
          modalRef={modalRef}
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
  showAddEvent,
  setShowAddEvent,
  modalRef,
}: AddEventHeaderProps) {
  const { date, new: isNew } = showAddEvent;

  return (
    <>
      <div className="modal-title">
        <div>{isNew ? 'Add' : 'Edit'} Event</div>
        <small>{getReadableDate(date)}</small>
        <button
          className="close-btn"
          onClick={() => handleCloseModal(setShowAddEvent, modalRef.current)}
        >
          &times;
        </button>
      </div>
    </>
  );
}

function AddEventBody({
  showAddEvent: event,
  setShowAddEvent,
  events,
  setEvents,
}: AddEventProps) {
  const [name, setName] = useState(() => (event.new ? '' : event.name));
  const [allDay, setAllDay] = useState(() =>
    event.new ? false : event.fullDay
  );
  const [startTime, setStartTime] = useState(() =>
    event.new || event.fullDay ? '' : event.startTime
  );
  const [endTime, setEndTime] = useState(() =>
    event.new || event.fullDay ? '' : event.endTime
  );
  const [color, setColor] = useState<EventColor>(() =>
    event.new ? 'blue' : event.color
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const { date, new: isNew } = event;

  return (
    <form onSubmit={validateAndSubmitEvent}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          style={errors.name ? { border: '1px solid red' } : {}}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <span style={{ color: 'red', fontSize: '0.5rem' }}>
            {errors.name}
          </span>
        )}
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
            style={errors.date ? { border: '1px solid red' } : {}}
            onChange={(e) => setStartTime(e.target.value)}
          />
          {errors.date && (
            <span style={{ color: 'red', fontSize: '0.5rem' }}>
              {errors.date}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="end-time">End Time</label>
          <input
            type="time"
            name="end-time"
            id="end-time"
            disabled={allDay}
            defaultValue={endTime}
            style={errors.date ? { border: '1px solid red' } : {}}
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
          {isNew ? 'Add' : 'Save'}
        </button>
        {!isNew && (
          <button
            className="btn btn-delete"
            onClick={() =>
              deleteEvent(event, events, setEvents, setShowAddEvent)
            }
            type="button"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );

  function validateAndSubmitEvent(e: FormEvent) {
    e.preventDefault();

    // Validate and set errors if any
    if (!name) {
      return setErrors((currentErrors) => ({
        ...currentErrors,
        name: 'Name is required',
      }));
    }

    if (!allDay && (!startTime || !endTime)) {
      return setErrors((currentErrors) => ({
        ...currentErrors,
        date: 'Event time is required',
      }));
    }

    if (endTime < startTime) {
      return setErrors((currentErrors) => ({
        ...currentErrors,
        date: 'Event can not end before beginning',
      }));
    }

    // Create an event, preserve ID if it's not new
    let eventToSave: CalendarEvent;
    const eventId = isNew ? crypto.randomUUID() : event.id;

    if (allDay) {
      eventToSave = {
        id: eventId,
        new: false,
        date: date,
        name: name,
        fullDay: true,
        color: color,
      };
    } else {
      eventToSave = {
        id: eventId,
        new: false,
        date: date,
        name: name,
        fullDay: false,
        startTime: startTime,
        endTime: endTime,
        color: color,
      };
    }

    // Add to event list, or replace in case of existing event
    if (isNew) {
      setEvents([...events, eventToSave]);
    } else {
      setEvents(
        events.map((ev) => (ev.id === eventToSave.id ? eventToSave : ev))
      );
    }

    if (errors.date || errors.name) {
      console.log(`errors:`, errors);
    }

    // Close modal
    setShowAddEvent(null);
  }
}

function deleteEvent(
  eventToDelete: CalendarEvent,
  events: CalendarEvent[],
  setEvents: (events: CalendarEvent[]) => void,
  setShowAddEvent: (n: null) => void
) {
  const filteredEvents = events.filter(
    (event) => event.id !== eventToDelete.id
  );
  setEvents(filteredEvents);
  setShowAddEvent(null);
}
