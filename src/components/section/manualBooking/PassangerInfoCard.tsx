import { User, Calendar, Users, Edit2, Save, X, CreditCard } from "lucide-react";
import { useState } from "react";

export default function PassengerList() {
  const [passengers, setPassengers] = useState([
    {
      _id: "p1",
      firstName: "NAVED",
      lastName: "KHAN",
      dob: "1990-01-01",
      gender: "Male",
    },
    {
      _id: "p2",
      firstName: "AISHA",
      lastName: "KHAN",
      dob: "1994-06-12",
      gender: "Female",
    },
    {
      _id: "p3",
      firstName: "AHMED",
      lastName: "ALI",
      dob: "2018-04-10",
      gender: "Male",
    },
  ]);

  const handleSavePassenger = (updated) => {
    setPassengers((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {passengers.map((p) => (
        <PassengerInfoCard
          key={p._id}
          passenger={p}
          onSave={handleSavePassenger}
        />
      ))}
    </div>
  );
}


function PassengerInfoCard({ passenger, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(passenger);

  const calculateAge = (dob) =>
    new Date().getFullYear() - new Date(dob).getFullYear();

  const handleChange = (key, value) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  return (
    <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition p-4">
      
      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-xl" />

      {/* Header */}
      <div className="flex justify-between items-start mb-4 pl-2">
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <input
                value={editData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="input"
              />
              <input
                value={editData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="input"
              />
            </div>
          ) : (
            <p className="font-semibold text-slate-900">
              {passenger.firstName} {passenger.lastName}
            </p>
          )}
          <p className="text-xs text-slate-500 font-mono">
            ID • {passenger._id}
          </p>
        </div>

        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>
            <Edit2 size={16} className="text-slate-500 hover:text-slate-800" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSave}>
              <Save size={16} className="text-emerald-600" />
            </button>
            <button onClick={() => setIsEditing(false)}>
              <X size={16} className="text-red-500" />
            </button>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-sm pl-2">
        <div>
          <p className="label">DOB</p>
          {isEditing ? (
            <input
              type="date"
              value={editData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="input"
            />
          ) : (
            <p className="value">{passenger.dob}</p>
          )}
        </div>

        <div>
          <p className="label">Age</p>
          <p className="value">{calculateAge(passenger.dob)} yrs</p>
        </div>

        <div>
          <p className="label">Gender</p>
          {isEditing ? (
            <select
              value={editData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="input"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          ) : (
            <span
              className={`pill ${
                passenger.gender === "Male"
                  ? "pill-blue"
                  : "pill-pink"
              }`}
            >
              {passenger.gender}
            </span>
          )}
        </div>

        <div>
          <p className="label">Type</p>
          <span className="pill pill-green">
            {calculateAge(passenger.dob) < 12 ? "Child" : "Adult"}
          </span>
        </div>
      </div>
    </div>
  );
}
