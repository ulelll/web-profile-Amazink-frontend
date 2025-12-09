// DateRangeDropdown.jsx
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangeDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);

    const [range, setRange] = useState([
        {
            startDate: value?.startDate || new Date(),
            endDate: value?.endDate || new Date(),
            key: "selection"
        }
    ]);

    const handleApply = () => {
        onChange({
            startDate: range[0].startDate,
            endDate: range[0].endDate
        });
        setOpen(false);
    };

    return (
        <div className="relative inline-block">
            <button
                className="border px-3 py-2 rounded bg-white hover:bg-gray-100"
                onClick={() => setOpen(!open)}
            >
                {range[0].startDate.toLocaleDateString()} - {range[0].endDate.toLocaleDateString()}
            </button>

            {open && (
                <div className="absolute z-50 mt-2 bg-white shadow-lg rounded">
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                    />

                    <button
                        className="w-full bg-orange-600 text-white py-2 rounded-b hover:bg-orange-700"
                        onClick={handleApply}
                    >
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
}
