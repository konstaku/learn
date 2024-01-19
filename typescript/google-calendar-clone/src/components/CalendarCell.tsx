import { useEffect, useRef, useState } from 'react';
import { CalendarEvent, Day, NewCalendarEvent } from './Calendar';
import {
  calculateMaxEvents,
  handleAddEvent,
  sortEvents,
} from '../utilities/helpers';
import Event from './Event';

type CalendarCellProps = {
  index: number;
  day: Day;
  setShowAddEvent: (event: CalendarEvent | NewCalendarEvent | null) => void;
  windowHeight: number;
};

type CalendarCellHeaderProps = Omit<CalendarCellProps, 'windowHeight'>;

type ShowMoreButtonProps = {
  eventNumber: number;
};

const DAYS_IN_WEEK = 7;

export default function CalendarCell({
  index,
  day,
  setShowAddEvent,
  windowHeight,
}: CalendarCellProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const [maxEvents, setMaxEvents] = useState(() =>
    calculateMaxEvents(cellRef, 0)
  );

  // Do something when window height changes
  useEffect(() => {
    if (day.events?.length) {
      setMaxEvents(calculateMaxEvents(cellRef, day.events?.length));
    }
  }, [windowHeight, day.events?.length]);

  const showMoreCount = day.events?.length
    ? day.events.length - maxEvents <= 0
      ? 0
      : day.events.length - maxEvents
    : 0;

  return (
    <div
      className={`day ${day.nonMonth && 'non-month-day'} ${
        day.oldMonth && 'old-month-day'
      }`}
    >
      <CalendarCellHeader
        index={index}
        day={day}
        setShowAddEvent={setShowAddEvent}
      />
      {day.events?.length ? (
        <>
          <div className="events" ref={cellRef}>
            {
              // prettier-ignore
              day.events
                .sort(sortEvents)
                .slice(0, maxEvents)
                .map((event, index) => 
                  <Event 
                    event={event} 
                    setShowAddEvent={setShowAddEvent} 
                    key={index} 
                  />)
            }
          </div>
          {showMoreCount > 0 && <ShowMoreButton eventNumber={showMoreCount} />}
        </>
      ) : undefined}
    </div>
  );
}

function CalendarCellHeader({
  index,
  day,
  setShowAddEvent,
}: CalendarCellHeaderProps) {
  return (
    <div className="day-header">
      {index < DAYS_IN_WEEK && (
        <div className="week-name">
          {day.currentDate.toLocaleDateString('default', {
            weekday: 'short',
          })}
        </div>
      )}
      <div className={`day-number ${day.today && 'today'}`}>
        {day.currentDate.getDate()}
      </div>
      <button
        className="add-event-btn"
        onClick={() =>
          handleAddEvent(setShowAddEvent, {
            date: day.currentDate,
            new: true,
          })
        }
      >
        +
      </button>
    </div>
  );
}

function ShowMoreButton({ eventNumber }: ShowMoreButtonProps) {
  return <button className="events-view-more-btn">+{eventNumber} More</button>;
}
