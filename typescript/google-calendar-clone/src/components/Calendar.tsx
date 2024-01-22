import { useEffect, useState } from 'react';
import AddOrEditEvent from '../AddEvent';
import CalendarHeader from './CalendarHeader';
import DayGrid from './DayGrid';
import { loadEvents } from '../utilities/helpers';
import EventListModal from './EventListModal';

export type Day = {
  currentDate: Date;
  nonMonth: boolean;
  oldMonth: boolean;
  today?: boolean;
  events?: CalendarEvent[];
};
export type Month = Day[];
export type EventColor = 'green' | 'red' | 'blue';
type BaseEvent = {
  id: string;
  new: false;
  date: Date;
  name: string;
  color: EventColor;
};
type FullDayEvent = BaseEvent & {
  fullDay: true;
};
type PartDayEvent = BaseEvent & {
  fullDay: false;
  startTime: string;
  endTime: string;
};
export type CalendarEvent = FullDayEvent | PartDayEvent;
export type NewCalendarEvent = Pick<BaseEvent, 'date'> & { new: true };

export default function Calendar() {
  const [date, setDate] = useState(() => new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(loadEvents);
  const [showEventList, setShowEventList] = useState<Date | null>(null);
  const [showAddEvent, setShowAddEvent] = useState<
    NewCalendarEvent | CalendarEvent | null
  >(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  return (
    <>
      <div className="calendar">
        <CalendarHeader date={date} setDate={setDate} />
        <DayGrid
          date={date}
          events={events}
          setShowAddEvent={setShowAddEvent}
          setShowEventList={setShowEventList}
        />
        {showAddEvent && (
          <AddOrEditEvent
            showAddEvent={showAddEvent}
            setShowAddEvent={setShowAddEvent}
            events={events}
            setEvents={setEvents}
          />
        )}
        {showEventList && (
          <EventListModal
            date={showEventList}
            events={events}
            setShowAddEvent={setShowAddEvent}
            setShowEventList={setShowEventList}
          />
        )}
      </div>
    </>
  );
}
