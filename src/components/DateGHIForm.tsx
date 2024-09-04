import React, { useState, ChangeEvent, FormEvent } from "react";

interface DateGHIFormProps {
  onSubmit?: (data: { date: string; ghi: string }) => void;
}

const DateGHIForm: React.FC<DateGHIFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState<string>("");
  const [ghi, setGhi] = useState<string>("");

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleGhiChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGhi(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (date && ghi) {
      onSubmit?.({ date, ghi });
      setDate("");
      setGhi("");
    } else {
      alert("Please fill out both fields.");
    }
  };

  return (
    <div className="w-full h-full bg-bgcolor flex flex-col items-center justify-center font-sans">
      <div className="flex flex-col items-center w-[60%]">
        <h2 className="text-xl font-bold">Enter Date and GHI Value</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              required
              className="w-full p-2 rounded-xl"
            />
          </div>
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="ghi">GHI Value (kWh/m²):</label>
            <input
              type="number"
              id="ghi"
              value={ghi}
              onChange={handleGhiChange}
              step="0.01"
              min="0"
              required
              className="w-full p-2 rounded-xl"
            />
          </div>
          <button
            type="submit"
            className="bg-primary px-4 py-2 rounded-lg font-bold mx-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DateGHIForm;
