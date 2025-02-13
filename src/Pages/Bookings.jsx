import { useState, useEffect } from "react";
import axios from "axios";
import BookingDialog from "../Component/BookingDialog"; // Adjust the import as needed
import ConflictDialog from "../Component/ConflictDialog"; // Adjust the import as needed

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isConflict, setIsConflict] = useState(false);
    const [eventDetails, setEventDetails] = useState({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        id: null,
        allDay: false,
    });

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/api/events", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleUpdate = (id) => {
        const booking = bookings.find((booking) => booking.id === id);
        setEventDetails(booking);
        setIsPopupVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchBookings();
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const handleSubmit = async (formData) => {
        const newStartTime = new Date(formData.startTime);
        const newEndTime = new Date(formData.endTime);

        // Check for overlapping events
        if (checkForOverlappingEvent(newStartTime, newEndTime)) {
            setIsConflict(true);
            return;
        }

        const newEvent = {
            title: formData.title,
            description: formData.description,
            start_time: formData.startTime,
            end_time: formData.endTime,
            all_day: formData.allDay,
        };

        try {
            if (eventDetails.id) {
                await axios.put(
                    `http://localhost:3000/api/events/${eventDetails.id}`,
                    newEvent,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
            } else {
                await axios.post("http://localhost:3000/api/events", newEvent, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
            }
            fetchBookings();
            setIsPopupVisible(false);
        } catch (error) {
            console.error("Error submitting event:", error);
        }
    };

    const checkForOverlappingEvent = (newStartTime, newEndTime) => {
        return bookings.some((event) => {
            const eventStart = new Date(event.start_time);
            const eventEnd = new Date(event.end_time);
            return newStartTime < eventEnd && newEndTime > eventStart;
        });
    };

    return (
        <section className="w-full">
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Booking ID</th>
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Start Time</th>
                            <th className="border p-2">End Time</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="text-center">
                                <td className="border p-2">{booking.id}</td>
                                <td className="border p-2">{booking.title}</td>
                                <td className="border p-2">{new Date(booking.start_time).toLocaleString()}</td>
                                <td className="border p-2">{new Date(booking.end_time).toLocaleString()}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => handleUpdate(booking.id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(booking.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isPopupVisible && (
                <BookingDialog
                    eventDetails={eventDetails}
                    onClose={() => setIsPopupVisible(false)}
                    onSubmit={handleSubmit}
                />
            )}

            {isConflict && <ConflictDialog onClose={() => setIsConflict(false)} />}
        </section>
    );
};

export default Bookings;
