import { useRef } from 'react';
import {
  getReadableDate,
  handleCloseModal,
  sortEvents,
} from '../utilities/helpers';
import type { CalendarEvent, NewCalendarEvent } from './Calendar';
import Event from './Event';

type EventListModalProps = {
  date: Date;
  events: CalendarEvent[];
  setShowAddEvent: (event: CalendarEvent | NewCalendarEvent | null) => void;
  setShowEventList: (date: Date | null) => void;
};

export default function EventListModal({
  date,
  events,
  setShowAddEvent,
  setShowEventList,
}: EventListModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  return (
    <div className="modal" ref={modalRef}>
      <div className="overlay"></div>
      <div className="modal-body">
        <div className="modal-title">
          {getReadableDate(date)}
          <button
            className="close-btn"
            onClick={() => handleCloseModal(setShowEventList, modalRef.current)}
          >
            &times;
          </button>
        </div>
        <div className="events">
          {[...events]
            .filter((event) => event.date.toUTCString() === date.toUTCString())
            .sort(sortEvents)
            .map((event) => (
              <Event
                key={event.id}
                event={event}
                setShowAddEvent={setShowAddEvent}
                setShowEventList={setShowEventList}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
