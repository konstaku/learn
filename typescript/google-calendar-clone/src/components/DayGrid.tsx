import type { CalendarEvent, NewCalendarEvent } from './Calendar';
import { useEffect, useState } from 'react';
import CalendarCell from './CalendarCell';
import { fillMonth, trackWindowResize } from '../utilities/helpers';

type DayGridProps = {
  date: Date;
  events: CalendarEvent[];
  setShowAddEvent: (event: CalendarEvent | NewCalendarEvent | null) => void;
  setShowEventList: (date: Date | null) => void;
};

export default function DayGrid({
  date,
  events,
  setShowAddEvent,
  setShowEventList,
}: DayGridProps) {
  const eventsThisMonth = events.filter(
    (event) => event.date.getMonth() === date.getMonth()
  );

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => trackWindowResize(setWindowHeight), []);

  const month = fillMonth(date, eventsThisMonth);

  return (
    <div className="days">
      {month.map((day, i) => (
        <CalendarCell
          key={new Date(day.currentDate).toString()}
          index={i}
          day={day}
          setShowAddEvent={setShowAddEvent}
          setShowEventList={setShowEventList}
          windowHeight={windowHeight}
        />
      ))}
    </div>
  );
}
