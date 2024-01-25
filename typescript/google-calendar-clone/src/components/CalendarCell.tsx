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
  setShowEventList: (date: Date | null) => void;
  windowHeight: number;
};

const DAYS_IN_WEEK = 7;

export default function CalendarCell({
  index,
  day,
  setShowAddEvent,
  setShowEventList,
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
        setShowEventList={setShowEventList}
      />
      {day.events?.length ? (
        <>
          <div className="events" ref={cellRef}>
            {[...day.events]
              .sort(sortEvents)
              .slice(0, maxEvents)
              .map((event, index) => (
                <Event
                  event={event}
                  setShowAddEvent={setShowAddEvent}
                  setShowEventList={setShowEventList}
                  key={index}
                />
              ))}
          </div>
          {showMoreCount > 0 && (
            <ShowMoreButton
              day={day}
              eventNumber={showMoreCount}
              setShowEventList={setShowEventList}
            />
          )}
        </>
      ) : undefined}
    </div>
  );
}

type CalendarCellHeaderProps = Omit<CalendarCellProps, 'windowHeight'>;

function CalendarCellHeader({
  index,
  day,
  setShowAddEvent,
  setShowEventList,
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
          handleAddEvent(setShowAddEvent, setShowEventList, {
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

type ShowMoreButtonProps = {
  eventNumber: number;
} & Pick<CalendarCellProps, 'setShowEventList' | 'day'>;

function ShowMoreButton({
  day,
  eventNumber,
  setShowEventList,
}: ShowMoreButtonProps) {
  return (
    <button
      className="events-view-more-btn"
      onClick={() => setShowEventList(day.currentDate)}
    >
      +{eventNumber} More
    </button>
  );
}
