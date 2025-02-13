import { useState, useEffect } from "react";
import axios from "axios";

const BookingDialog = ({ eventDetails, onClose, onSubmit, currentUserId }) => {
    const [formData, setFormData] = useState({
        title: eventDetails.title || "",
        description: eventDetails.description || "",
        startTime: eventDetails.start_time || "",
        endTime: eventDetails.end_time || "",
        allDay: eventDetails.all_day || false,
    });

    useEffect(() => {
        setFormData({
            title: eventDetails.title || "",
            description: eventDetails.description || "",
            startTime: eventDetails.start_time || "",
            endTime: eventDetails.end_time || "",
            allDay: eventDetails.all_day || false,
        });
    }, [eventDetails]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 p-6 mt-4 bg-white shadow-xl rounded-xl border z-10">
            <h3 className="text-lg font-semibold mb-4">Event Details</h3>
            <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border rounded"
                    required
                />
                <label className="block text-sm font-medium text-gray-700 mt-4">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border rounded"
                    required
                />
                <label className="block text-sm font-medium text-gray-700 mt-4">Start Time</label>
                <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border rounded"
                    required
                />
                <label className="block text-sm font-medium text-gray-700 mt-4">End Time</label>
                <input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border rounded"
                    required
                />
                <label className="block text-sm font-medium text-gray-700 mt-4">All Day</label>
                <input
                    type="checkbox"
                    name="allDay"
                    checked={formData.allDay}
                    onChange={handleInputChange}
                    className="mt-2"
                />
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={onClose}
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
        </div>
    );
};

export default BookingDialog;
