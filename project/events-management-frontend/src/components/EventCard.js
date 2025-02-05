// src/components/EventCard.js
import React from 'react';

const EventCard = ({ event, user, onRegister }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        margin: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <h3 style={{ color: '#4a90e2', marginBottom: '10px' }}>{event.title}</h3>
      <p style={{ color: '#555', marginBottom: '5px' }}>{event.description}</p>
      <p style={{ color: '#777', marginBottom: '5px' }}>Date: {event.date}</p>
      <p style={{ color: '#777' }}>Location: {event.location}</p>
      {user.role === 'user' && (
        <button
          onClick={() => onRegister(event.id)}
          style={{ marginTop: '10px', backgroundColor: '#28a745', color: 'white' }}
        >
          Register
        </button>
      )}
    </div>
  );
};

export default EventCard;