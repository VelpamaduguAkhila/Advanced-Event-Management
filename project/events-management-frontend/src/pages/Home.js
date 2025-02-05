// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const HomePage = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3003/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Handle user registration
  const handleRegister = async (eventId) => {
    try {
      await axios.post('http://localhost:3003/register', {
        eventId,
        userId: user.id, // Replace with actual user ID logic
      });
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  // Handle adding a new event
  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:3003/events', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ title: '', description: '', date: '', location: '' });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Handle editing an event
  const handleEditEvent = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/events/${editingEvent._id}`,
        editingEvent
      );
      const updatedEvents = events.map((event) =>
        event._id === editingEvent._id ? response.data : event
      );
      setEvents(updatedEvents);
      setEditingEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#4a90e2', marginBottom: '20px' }}>
        Welcome to the Event Management App
      </h1>

      {/* Display Events */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            user={user}
            onRegister={handleRegister}
          />
        ))}
      </div>

      {/* Admin Controls */}
      {user.role === 'admin' && (
        <div style={{ marginTop: '20px' }}>
          <h2>Admin Panel</h2>
          {/* Add Event Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <input
              type="date"
              placeholder="Event Date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Event Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
            <button onClick={handleAddEvent}>Add Event</button>
          </div>

          {/* Edit Event Form */}
          {editingEvent && (
            <div style={{ marginTop: '20px' }}>
              <h3>Edit Event</h3>
              <input
                type="text"
                placeholder="Event Title"
                value={editingEvent.title}
                onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Event Description"
                value={editingEvent.description}
                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
              />
              <input
                type="date"
                placeholder="Event Date"
                value={editingEvent.date}
                onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="Event Location"
                value={editingEvent.location}
                onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
              />
              <button onClick={handleEditEvent}>Save Changes</button>
              <button onClick={() => setEditingEvent(null)}>Cancel</button>
            </div>
          )}

          {/* List of Events with Edit/Delete Options */}
          <div style={{ marginTop: '20px' }}>
            <h3>Manage Events</h3>
            {events.map((event) => (
              <div key={event._id} style={{ marginBottom: '10px' }}>
                <span>{event.title}</span>
                <button onClick={() => setEditingEvent(event)} style={{ marginLeft: '10px' }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteEvent(event._id)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;