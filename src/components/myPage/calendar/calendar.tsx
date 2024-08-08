// components/Calendar.tsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { EmotionLogTodayResponseType } from '@/schema/emotionLog';
import { getEmotionLogMonthly } from '@/apis/emotionLog';
import styles from './calendar.module.scss';

type Event = {
  id: number;
  date: string;
  title: string;
};

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {
    data: events,
    error,
    isLoading,
  } = useQuery<EmotionLogTodayResponseType>({
    queryKey: ['events'],
    queryFn: getEmotionLogMonthly,
  });

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const renderCalendarDays = () => {
    const days: JSX.Element[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.empty} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
      const dayEvents = events?.filter((event) => event.date === date);

      days.push(
        <div key={day} className={styles.day} onClick={() => handleDateClick(day)}>
          {day}
          {dayEvents?.length ? (
            <div className={styles.eventIndicator}>
              {dayEvents.length} Event{dayEvents.length > 1 ? 's' : ''}
            </div>
          ) : null}
        </div>,
      );
    }
    return days;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching events</div>;

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayOfWeek}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.body}>{renderCalendarDays()}</div>
      {selectedDate && <div className={styles.selectedDate}>Selected Date: {selectedDate.toDateString()}</div>}
    </div>
  );
};

export default Calendar;
