import Calendar from "./fullcalendar";

function Page() {
  const events = [
    {
      id: 1,
      title: "Morning Yoga",
      description: "Start your day with a relaxing yoga session.",
      date: "2024-10-10", // Specific date in "yyyy-MM-dd" format
    },
    {
      id: 1,
      title: "Morning Yoga",
      description: "Start your day with a relaxing yoga session.",
      date: "2024-10-10", // Specific date in "yyyy-MM-dd" format
    },
    {
      id: 1,
      title: "Morning Yoga",
      description: "Start your day with a relaxing yoga session.",
      date: "2024-10-10", // Specific date in "yyyy-MM-dd" format
    },
    {
      id: 2,
      title: "Team Meeting",
      description: "Discuss project updates with the team.",
      date: "2024-10-10",
    },
    {
      id: 3,
      title: "Lunch with Sarah",
      description: "Catch up with Sarah at the cafe.",
      date: "2024-10-11",
    },
    {
      id: 4,
      title: "Client Presentation",
      description: "Present the latest design mockups to the client.",
      date: "2024-10-12",
    },
    {
      id: 5,
      title: "Code Review",
      description: "Review code changes and provide feedback.",
      date: "2024-10-13",
    },
    {
      id: 6,
      title: "Birthday Party",
      description: "Celebrate John's birthday with friends.",
      date: "2024-10-14",
    },
    {
      id: 7,
      title: "Gym Session",
      description: "Hit the gym for a strength training workout.",
      date: "2024-10-14",
    },
    {
      id: 8,
      title: "Doctor Appointment",
      description: "Routine check-up with Dr. Smith.",
      date: "2024-10-15",
    },
    {
      id: 9,
      title: "Team Outing",
      description: "Spend the afternoon team-building at the park.",
      date: "2024-10-16",
    },
    {
      id: 10,
      title: "Project Deadline",
      description: "Submit the final report for the Oasis project.",
      date: "2024-10-17",
    },
  ];
  return (
    <div className="pb-10 py-4">
      <Calendar events={events} />
    </div>
  );
}

export default Page;
