"use client";
import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const baseUrl = "http://localhost:3000/api";

  const [eventName, setEventName] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [date, setDate] = useState("");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${baseUrl}/events`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const resetForm = () => {
    setEventName("");
    setOrganizerName("");
    setDate("");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    if (!eventName || !organizerName || !date) {
      setError("Fill all information");
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventName, organizerName, date }),
      });
      if (!res.ok) throw new Error("Failed to create new event");
      resetForm();
      await loadEvents();
    } catch (e) {
      setError(e.message || "Failed to create");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      const res = await fetch(`${baseUrl}/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");
      await loadEvents();
    } catch (e) {
      setError(e.message || "Failed to delete");
    }
  };

  return (
    <div>
      <h1>Admin - Events</h1>

      <form onSubmit={handleCreate} className="grid gap-2 mb-4">
        <input
          type="text"
          placeholder="event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="organizer name"
          value={organizerName}
          onChange={(e) => setOrganizerName(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-gray-900 text-white rounded w-fit"
        >
          Add Event
        </button>
      </form>
      {error ? <div className="text-red-600 mb-3">{error}</div> : null}
      <div>
        <strong>Events</strong>
        <button onClick={loadEvents} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      {events.length === 0 ? (
        <div>{loading ? "Loading..." : "No events found"}</div>
      ) : (
        <ul>
          {events.map((ev) => (
            <li key={ev.id}>
              <div>
                <div>{ev.eventName}</div>
                <div>by {ev.organizerName}</div>
                <div>
                  {ev.date ? `${new Date(ev.date).toLocaleDateString()}` : ""}
                </div>
              </div>
              <button onClick={() => handleDelete(ev.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
