import dayjs from "dayjs";

export const formatDate = (date: Date): string => {
  return dayjs(date).format("DD MMM YYYY");
};

export const generateDays = (
  month: {
    startOf: (arg0: string) => {
      (): any;
      new (): any;
      startOf: { (arg0: string): any; new (): any };
    };
    endOf: (arg0: string) => {
      (): any;
      new (): any;
      endOf: { (arg0: string): any; new (): any };
    };
  },
  events: any[]
) => {
  const start = month.startOf("month").startOf("week");
  const end = month.endOf("month").endOf("week");
  let days = [];
  let day = start;

  while (day.isBefore(end, "day")) {
    // Filter events for the current day
    const dailyEvents = events.filter((event) =>
      dayjs(event.datetime).isSame(day, "day")
    );

    days.push({
      date: day.format("YYYY-MM-DD"),
      isCurrentMonth: day.isSame(month, "month"),
      isToday: day.isSame(dayjs(), "day"),
      events: dailyEvents,
    });

    day = day.add(1, "day");
  }

  return days;
};

export const generateWeekDays = (
  referenceDate: {
    startOf: (arg0: string) => any;
    endOf: (arg0: string) => any;
  },
  events: any[]
) => {
  const startOfWeek = referenceDate.startOf("week");
  const endOfWeek = referenceDate.endOf("week");
  let days = [];
  let day = startOfWeek;

  while (day.isBefore(endOfWeek, "day") || day.isSame(endOfWeek, "day")) {
    // Filter events for the current day
    const dailyEvents = events.filter((event) =>
      dayjs(event.datetime).isSame(day, "day")
    );

    days.push({
      date: day.format("YYYY-MM-DD"),
      isToday: day.isSame(dayjs(), "day"),
      events: dailyEvents,
    });

    day = day.add(1, "day");
  }

  return days;
};
