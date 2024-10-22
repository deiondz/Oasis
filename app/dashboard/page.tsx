import DashboardWidth from "./defaultstyle";
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

  const newevents = [
    {
      "eventname": "Charity Gala",
      "name": "Emma Davis",
      "description": "Annual charity gala for donations.",
      "startdate": "2024-12-20",
      "starttime": "18:00",
      "enddate": "2024-12-21",
      "endtime": "01:00",
      "phonenumber": 8765432109,
      "email": "emma.davis@example.com",
      "hall": "luxury_hall"
    },
    {
      "eventname": "Holiday Party",
      "name": "Oliver Smith",
      "description": "An evening of fun and festivities.",
      "startdate": "2024-12-20",
      "starttime": "19:00",
      "enddate": "2024-12-20",
      "endtime": "23:00",
      "phonenumber": 9123456789,
      "email": "oliver.smith@example.com",
      "hall": "main_hall"
    },
    {
      "eventname": "End of Year Review",
      "name": "Sophia Johnson",
      "description": "Review of the year’s achievements and plans for next year.",
      "startdate": "2024-12-20",
      "starttime": "15:00",
      "enddate": "2024-12-20",
      "endtime": "17:00",
      "phonenumber": 9988776655,
      "email": "sophia.johnson@example.com",
      "hall": "conference_room_a"
    },
    {
      "eventname": "Christmas Concert",
      "name": "Liam Brown",
      "description": "A special concert celebrating the holiday season.",
      "startdate": "2024-12-20",
      "starttime": "20:00",
      "enddate": "2024-12-20",
      "endtime": "22:00",
      "phonenumber": 1234567890,
      "email": "liam.brown@example.com",
      "hall": "auditorium"
    },
    {
      "eventname": "Networking Evening",
      "name": "Ava Martinez",
      "description": "An opportunity to network with local professionals.",
      "startdate": "2024-12-20",
      "starttime": "16:00",
      "enddate": "2024-12-20",
      "endtime": "18:00",
      "phonenumber": 7654321098,
      "email": "ava.martinez@example.com",
      "hall": "meeting_room_1"
    },
    {
      "eventname": "Annual Meetup",
      "name": "John Smith",
      "description": "A gathering for all members.",
      "startdate": "2024-11-05",
      "starttime": "10:00",
      "enddate": "2024-11-05",
      "endtime": "12:00",
      "phonenumber": 9876543210,
      "email": "johnsmith@example.com",
      "hall": "grand_ballroom"
    },
    {
      "eventname": "Tech Conference",
      "name": "Jane Doe",
      "description": "Conference discussing latest tech trends.",
      "startdate": "2024-10-20",
      "starttime": "14:00",
      "enddate": "2024-10-21",
      "endtime": "23:00",
      "phonenumber": 8654321098,
      "email": "jane.doe@example.com",
      "hall": "tech_hall"
    },
    {
      "eventname": "Wedding Reception",
      "name": "Alice Johnson",
      "description": "Reception for close family and friends.",
      "startdate": "2024-12-01",
      "starttime": "12:00",
      "enddate": "2024-12-01",
      "endtime": "17:00",
      "phonenumber": 8123456789,
      "email": "alice.johnson@example.com",
      "hall": "ocean_view_hall"
    },
    {
      "eventname": "Corporate Seminar",
      "name": "Michael Brown",
      "description": "Seminar on business strategies.",
      "startdate": "2024-11-15",
      "starttime": "09:00",
      "enddate": "2024-11-15",
      "endtime": "13:00",
      "phonenumber": 9988776655,
      "email": "michael.brown@example.com",
      "hall": "business_center"
    },
    {
      "eventname": "Halloween Bash",
      "name": "Charlie White",
      "description": "Spooky Halloween party with costumes and fun.",
      "startdate": "2024-10-31",
      "starttime": "19:00",
      "enddate": "2024-10-31",
      "endtime": "23:00",
      "phonenumber": 5432167890,
      "email": "charlie.white@example.com",
      "hall": "main_hall"
    },
    {
      "eventname": "Art Exhibition",
      "name": "Olivia Williams",
      "description": "Showcasing local artists and their works.",
      "startdate": "2024-10-28",
      "starttime": "11:00",
      "enddate": "2024-10-28",
      "endtime": "17:00",
      "phonenumber": 6543210987,
      "email": "olivia.williams@example.com",
      "hall": "art_gallery"
    },
    {
      "eventname": "Science Fair",
      "name": "Ethan Harris",
      "description": "Annual science fair showcasing projects from students.",
      "startdate": "2024-10-25",
      "starttime": "09:00",
      "enddate": "2024-10-25",
      "endtime": "15:00",
      "phonenumber": 3210987654,
      "email": "ethan.harris@example.com",
      "hall": "conference_room_b"
    }
  ];




  return (
    <DashboardWidth>
      <div className="py-3 ">
        <h2 className="lg:text-3xl text-2xl font-semibold">Book a Hall</h2>
        <p className="text-sm text-muted-foreground py-2">
          Reserve a hall for your upcoming events and meetings. Select a date
          from the calendar below to get started.
        </p>
      </div>
      <Calendar events={newevents} />
    </DashboardWidth>
  );
}

export default Page;
