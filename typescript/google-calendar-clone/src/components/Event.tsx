import { handleAddEvent } from '../utilities/helpers';
import type { CalendarEvent, NewCalendarEvent } from './Calendar';

type EventProps = {
  event: CalendarEvent;
  setShowAddEvent: (event: CalendarEvent | NewCalendarEvent | null) => void;
};

export default function Event({ event, setShowAddEvent }: EventProps) {
  let eventClassName: string;
  let childElements: JSX.Element;

  if (event.fullDay) {
    eventClassName = `all-day-event ${event.color} event`;
    childElements = <div className="event-name">{event.name}</div>;
  } else {
    eventClassName = `event`;
    childElements = (
      <>
        <div className={`color-dot ${event.color}`}></div>
        <div className="event-time">{event.startTime}</div>
        <div className="event-name">{event.name}</div>
      </>
    );
  }

  return (
    <button
      onClick={() => handleAddEvent(setShowAddEvent, event)}
      className={eventClassName}
    >
      {childElements}
    </button>
  );
}
