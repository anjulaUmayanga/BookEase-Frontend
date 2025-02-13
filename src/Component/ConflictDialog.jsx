const ConflictDialog = ({ onClose }) => (
    <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50"
        onClick={onClose}
    >
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Time Slot Conflict</h3>
            <p>This time slot is already booked. Please choose a different time.</p>
            <div className="flex justify-end mt-4">
                <button
                    onClick={onClose}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);

export default ConflictDialog;
