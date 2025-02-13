import { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

export default function Calendar() {
    const [eventDetails, setEventDetails] = useState({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        id: null,
        createdBy: null,
        allDay: false,
        createdAt: "",
        updatedAt: "",
    });
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isConflict, setIsConflict] = useState(false); // New state to track conflict
    const popupRef = useRef(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/current-user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCurrentUserId(response.data.id);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    const getCurrentDateTime = () => {
        const currentDate = new Date();
        const isoString = currentDate.toISOString();
        return isoString.slice(0, 16);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventDetails((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsPopupVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/events", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const calendarEvents = response.data.map((event) => ({
                title: event.title,
                description: event.description,
                start: event.start_time,
                end: event.end_time,
                id: event.id,
                createdBy: event.user_id,
                allDay: event.all_day,
                createdAt: event.created_at,
                updatedAt: event.updated_at,
            }));
            setEvents(calendarEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const checkForOverlappingEvent = (newStartTime, newEndTime) => {
        return events.some((event) => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            
            return newStartTime < eventEnd && newEndTime > eventStart;
        });
    };

    const handleDateClick = (info) => {
        const selectedStartTime = info.dateStr;
        const selectedStartTimeFormatted = new Date(selectedStartTime);
        const selectedEndTime = new Date(selectedStartTimeFormatted.getTime() + 60 * 60 * 1000);
        const formattedEndTime = selectedEndTime.toISOString();

        setEventDetails({
            ...eventDetails,
            startTime: selectedStartTime,
            endTime: formattedEndTime,
            allDay: false, 
        });
        setIsPopupVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newStartTime = new Date(eventDetails.startTime);
        const newEndTime = new Date(eventDetails.endTime);

        
        if (checkForOverlappingEvent(newStartTime, newEndTime)) {
            setIsPopupVisible(false); 
            setIsConflict(true); 
            return; 
        }

        const newEvent = {
            title: eventDetails.title,
            description: eventDetails.description,
            start_time: eventDetails.startTime,
            end_time: eventDetails.endTime,
            all_day: eventDetails.allDay,
            user_id: currentUserId,
        };

        try {
            if (eventDetails.id) {
                // Editing an existing event
                const response = await axios.put(
                    `http://localhost:3000/api/events/${eventDetails.id}`,
                    newEvent,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                console.log("Event edited successfully:", response.data);
            } else {
                
                const response = await axios.post(
                    "http://localhost:3000/api/events",
                    [newEvent], 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                console.log("Event added successfully:", response.data);
            }

          
            fetchEvents();
            setEventDetails({
                title: "",
                description: "",
                startTime: "",
                endTime: "",
                id: null,
                createdBy: null,
                allDay: false,
                createdAt: "",
                updatedAt: "",
            });
            setIsPopupVisible(false);
        } catch (error) {
            console.error("Error submitting event:", error);
            alert("Failed to submit event. Please try again.");
        }
    };

    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`http://localhost:3000/api/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("Event deleted successfully");
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete event. Please try again.");
        }
    };

    const handleEdit = (event) => {
        setEventDetails({
            title: event.title,
            description: event.description,
            startTime: event.start,
            endTime: event.end,
            id: event.id,
            createdBy: event.createdBy,
            allDay: event.allDay,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
        });
        setIsPopupVisible(true);
    };

    return (
        <div className="w-full p-4 mt-4 bg-white shadow-lg rounded-xl border">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height="80vh"
                buttonText={{
                    today: "Today",
                    month: "Month",
                    week: "Week",
                    day: "Day",
                }}
                dayMaxEvents={true}
                eventColor="#3b82f6"
                eventTextColor="#fff"
                selectable={true}
                editable={true}
                className="rounded-lg"
                events={events}
                dateClick={handleDateClick}
                eventClick={(info) => handleEdit(info.event)}
            />

            {isPopupVisible && (
                <div
                    ref={popupRef}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 p-6 mt-4 bg-white shadow-xl rounded-xl border z-10"
                >
                    <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                    <form onSubmit={handleSubmit}>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={eventDetails.title}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-2 border rounded"
                            required
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-4">Description</label>
                        <textarea
                            name="description"
                            value={eventDetails.description}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-2 border rounded"
                            required
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-4">Start Time</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={eventDetails.startTime}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-2 border rounded"
                            required
                            min={getCurrentDateTime()}
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-4">End Time</label>
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={eventDetails.endTime}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-2 border rounded"
                            required
                            min={eventDetails.startTime}
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-4">All Day</label>
                        <input
                            type="checkbox"
                            name="allDay"
                            checked={eventDetails.allDay}
                            onChange={handleInputChange}
                            className="mt-2"
                        />
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={() => setIsPopupVisible(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                {eventDetails.id ? "Update Event" : "Add Event"}
                            </button>
                        </div>
                    </form>
                    <div className="text-sm text-gray-500 mt-4">
                        <p>Created At: {eventDetails.createdAt}</p>
                        <p>Updated At: {eventDetails.updatedAt}</p>
                    </div>
                    {eventDetails.createdBy === currentUserId && eventDetails.id && (
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={() => handleDelete(eventDetails.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete Event
                            </button>
                        </div>
                    )}
                </div>
            )}

            {isConflict && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50"
                    onClick={() => setIsConflict(false)}
                >
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Time Slot Conflict</h3>
                        <p>This time slot is already booked. Please choose a different time.</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsConflict(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
