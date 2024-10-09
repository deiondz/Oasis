import { Card } from "@components/ui/card"; // Ensure the path is correct
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  subDays,
  addDays,
} from "date-fns";
import React from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // Specific date in "yyyy-MM-dd" format
}

interface YearViewProps {
  currentDate: Date; // Current date
  events: Event[]; // Array of events
}

const YearView: React.FC<YearViewProps> = ({ currentDate, events }) => {
  // Define the color map for event types
  const colorMap: { [key: string]: string } = {
    "Morning Yoga": "bg-green-300",
    "Team Meeting": "bg-blue-300",
    "Lunch with Sarah": "bg-yellow-300",
    "Client Presentation": "bg-red-300",
    "Code Review": "bg-purple-300",
    "Birthday Party": "bg-pink-300",
    "Gym Session": "bg-orange-300",
    "Doctor Appointment": "bg-teal-300",
    "Team Outing": "bg-indigo-300",
    "Project Deadline": "bg-gray-300",
  };

  // Generate dates for each month in the year, including leading and trailing days
  const generateDatesForMonth = (month: number) => {
    const start = startOfMonth(new Date(currentDate.getFullYear(), month));
    const end = endOfMonth(start);

    // Get the day of the week the month starts and ends on
    const startDayOfWeek = start.getDay(); // 0 = Sunday, 6 = Saturday
    const endDayOfWeek = end.getDay();

    // Calculate leading days from the previous month
    const leadingDays =
      startDayOfWeek > 0
        ? eachDayOfInterval({
            start: subDays(start, startDayOfWeek),
            end: subDays(start, 1),
          })
        : [];

    // Calculate trailing days from the next month
    const trailingDays =
      endDayOfWeek < 6
        ? eachDayOfInterval({
            start: addDays(end, 1),
            end: addDays(end, 6 - endDayOfWeek),
          })
        : [];

    // Combine leading days, current month's days, and trailing days
    return [
      ...leadingDays,
      ...eachDayOfInterval({ start, end }),
      ...trailingDays,
    ];
  };

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]; // Days of the week

  // Create an array of months with their names and dates
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthName = format(new Date(currentDate.getFullYear(), i), "MMMM");
    const dates = generateDatesForMonth(i);
    return { monthName, dates };
  });

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date belongs to the current month
  const isCurrentMonth = (date: Date, month: number) => {
    return date.getMonth() === month;
  };

  // Create a function to get the events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {months.map((month, index) => (
          <div key={index} className="border rounded p-2">
            <h3 className="text-xl font-semibold text-center mb-4">
              {month.monthName}
            </h3>
            {/* Render the days of the week once */}
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="h-6 w-6 text-xs">
                  {day}
                </div>
              ))}
            </div>
            {/* Render the dates, including leading and trailing days */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {month.dates.map((date) => {
                const eventsForDate = getEventsForDate(date);
                return (
                  <div
                    key={date.toString()}
                    className={`h-6 w-6 flex items-center justify-center text-xs cursor-pointer text-foreground`}
                  >
                    <div
                      className={`h-6 aspect-square flex flex-col items-center justify-center rounded-full relative transition-all duration-200 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        isToday(date)
                          ? "bg-black text-white"
                          : isCurrentMonth(date, index)
                      }`}
                    >
                      {format(date, "d")}
                      <div className="flex items-center space-x-[0.2px] justify-center ">
                        {eventsForDate.length > 0 ? (
                          <>
                            {eventsForDate.slice(0, 4).map((event, index) => (
                              <div
                                key={event.id} // Add a unique key for each event
                                className={`w-1 bg-yellow-500 aspect-square rounded-full  ${
                                  index === 3 ? "opacity-50" : "" // Optional: Add a class for the 4th item
                                }`}
                              />
                            ))}
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearView;

// Sample events for testing
