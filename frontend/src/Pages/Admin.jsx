
import { useEffect, useState } from 'react';
import '../styles/pages/Admin.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const SERVER_URL = API.replace(/\/api\/?$/, '');

export default function Admin() {
  const [token, setToken] = useState(
    localStorage.getItem('prera_admin_token') || ''
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [feedback, setFeedback] = useState([]);
  const [events, setEvents] = useState([]);

  const [activeTab, setActiveTab] = useState('events');

  const [status, setStatus] = useState('All');
  const [eventStatus, setEventStatus] = useState('Pending');
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('prera_admin_token', data.token);
      setToken(data.token);
      setPassword('');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle expired admin session
  const handleUnauthorized = () => {
    localStorage.removeItem('prera_admin_token');
    setToken('');
    setFeedback([]);
    setEvents([]);
    setMessage('Session expired. Please login again.');
  };

  // Load Feedback
  const loadFeedback = async () => {
    if (!token) return;

    setLoading(true);
    setMessage('');

    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '100',
        status,
        search,
      });

      const res = await fetch(`${API}/admin/feedback?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || 'Could not load feedback');
      }

      setFeedback(data.data || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load Event Submissions
  const loadEvents = async () => {
    if (!token) return;

    setLoading(true);
    setMessage('');

    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '100',
        status: eventStatus,
        search,
      });

      const res = await fetch(`${API}/events?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || 'Could not load event submissions');
      }

      setEvents(data.data || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && activeTab === 'feedback') {
      loadFeedback();
    }
  }, [token, activeTab, status, search]);

  useEffect(() => {
    if (token && activeTab === 'events') {
      loadEvents();
    }
  }, [token, activeTab, eventStatus, search]);

  // Update Feedback Status
  const updateFeedbackStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API}/admin/feedback/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || 'Status update failed');
      }

      setFeedback((previous) =>
        status !== 'All' && status !== newStatus
          ? previous.filter((item) => item.id !== id)
          : previous.map((item) =>
              item.id === id ? { ...item, status: newStatus } : item
            )
      );

      setMessage('Feedback status updated successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Approve or Reject Event
  const updateEventStatus = async (id, newStatus) => {
    const action = newStatus === 'Approved' ? 'approve' : 'reject';

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this event?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setMessage('');

      const res = await fetch(`${API}/events/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || 'Event status update failed');
      }

      setEvents((previous) =>
        eventStatus !== 'All' && eventStatus !== newStatus
          ? previous.filter((event) => event.id !== id)
          : previous.map((event) =>
              event.id === id ? { ...event, status: newStatus } : event
            )
      );

      setMessage(
        newStatus === 'Approved'
          ? 'Event approved! It is now visible on the public Events page.'
          : 'Event rejected successfully. It will remain hidden from the public page.'
      );
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Feedback
  const deleteFeedback = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this feedback?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`${API}/admin/feedback/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || 'Delete failed');
      }

      setFeedback((previous) =>
        previous.filter((item) => item.id !== id)
      );

      setMessage('Feedback deleted successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('prera_admin_token');
    setToken('');
    setFeedback([]);
    setEvents([]);
    setMessage('');
  };

  // Login Screen
  if (!token) {
    return (
      <div className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <p className="admin-eyebrow">PRERA ADMINISTRATION</p>
          <h1>Admin <span>Login</span></h1>

          <p className="admin-login-description">
            Login to manage PRERA event and feedback submissions.
          </p>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {message && <p className="admin-message">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'LOGGING IN...' : 'LOGIN →'}
          </button>
        </form>
      </div>
    );
  }

  const pendingCount = events.filter(
    (item) => item.status === 'Pending'
  ).length;

  const approvedCount = events.filter(
    (item) => item.status === 'Approved'
  ).length;

  const reviewedCount = feedback.filter(
    (item) => item.status === 'Reviewed'
  ).length;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">PRERA MANAGEMENT</p>
          <h1>Admin <span>Dashboard</span></h1>
        </div>

        <button className="admin-logout" onClick={logout}>
          LOGOUT
        </button>
      </header>

      <div className="admin-tabs">
        <button
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => {
            setActiveTab('events');
            setSearch('');
          }}
        >
          EVENT SUBMISSIONS
        </button>

        <button
          className={activeTab === 'feedback' ? 'active' : ''}
          onClick={() => {
            setActiveTab('feedback');
            setSearch('');
          }}
        >
          FEEDBACK
        </button>
      </div>

      {message && <p className="admin-message">{message}</p>}

      {activeTab === 'events' ? (
        <>
          <div className="admin-stats">
            <div className="admin-stat-card">
              <p>Loaded Events</p>
              <h2>{events.length}</h2>
            </div>

            <div className="admin-stat-card">
              <p>Pending Approval</p>
              <h2>{pendingCount}</h2>
            </div>

            <div className="admin-stat-card">
              <p>Approved Events</p>
              <h2>{approvedCount}</h2>
            </div>
          </div>

          <section className="admin-feedback-section">
            <h2 className="admin-section-title">Event Submissions</h2>

            <div className="admin-toolbar">
              <input
                type="search"
                placeholder="Search event or organizer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={eventStatus}
                onChange={(e) => setEventStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Under Review">Under Review</option>
                <option value="All">All Events</option>
              </select>

              <button onClick={loadEvents}>REFRESH</button>
            </div>

            {loading ? (
              <p className="admin-empty">Loading event submissions...</p>
            ) : events.length === 0 ? (
              <p className="admin-empty">No event submissions found.</p>
            ) : (
              <div className="admin-event-list">
                {events.map((event) => (
                  <article className="admin-event-card" key={event.id}>
                    {event.posterUrl && (
                      <img
                        className="admin-event-poster"
                        src={`${SERVER_URL}${event.posterUrl}`}
                        alt={`${event.eventName} poster`}
                      />
                    )}

                    <div className="admin-event-content">
                      <div className="admin-feedback-top">
                        <div>
                          <h3>{event.eventName}</h3>
                          <p>{event.organizerName}</p>
                        </div>

                        <span
                          className={`feedback-status ${event.status.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {event.status}
                        </span>
                      </div>

                      <p className="admin-event-category">
                        {event.category}
                      </p>

                      <p className="admin-feedback-message">
                        {event.description}
                      </p>

                      <div className="admin-event-details">
                        <span>
                          <strong>Date:</strong>{' '}
                          {new Date(event.eventDate).toLocaleDateString('en-IN')}
                        </span>

                        <span>
                          <strong>Expected audience:</strong>{' '}
                          {event.expectedAudience}
                        </span>

                        <span>
                          <strong>Reference ID:</strong>{' '}
                          {event.referenceId}
                        </span>
                      </div>

                      <div className="admin-card-actions">
                        {event.status !== 'Approved' && (
                          <button
                            className="admin-approve"
                            onClick={() =>
                              updateEventStatus(event.id, 'Approved')
                            }
                          >
                            APPROVE
                          </button>
                        )}

                        {event.status !== 'Rejected' && (
                          <button
                            className="admin-reject"
                            onClick={() =>
                              updateEventStatus(event.id, 'Rejected')
                            }
                          >
                            REJECT
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      ) : (
        <>
          <div className="admin-stats">
            <div className="admin-stat-card">
              <p>Total Loaded</p>
              <h2>{feedback.length}</h2>
            </div>

            <div className="admin-stat-card">
              <p>Pending</p>
              <h2>
                {feedback.filter((item) => item.status === 'Pending').length}
              </h2>
            </div>

            <div className="admin-stat-card">
              <p>Reviewed</p>
              <h2>{reviewedCount}</h2>
            </div>
          </div>

          <section className="admin-feedback-section">
            <h2 className="admin-section-title">Feedback Management</h2>

            <div className="admin-toolbar">
              <input
                type="search"
                placeholder="Search name, email or message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All Feedback</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Approved">Approved</option>
              </select>

              <button onClick={loadFeedback}>REFRESH</button>
            </div>

            {loading ? (
              <p className="admin-empty">Loading feedback...</p>
            ) : feedback.length === 0 ? (
              <p className="admin-empty">No feedback found.</p>
            ) : (
              <div className="admin-feedback-list">
                {feedback.map((item) => (
                  <article className="admin-feedback-card" key={item.id}>
                    <div className="admin-feedback-top">
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.email}</p>
                      </div>

                      <span className={`feedback-status ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="admin-rating">
                      {'★'.repeat(item.rating)}
                      <span>{'☆'.repeat(5 - item.rating)}</span>
                    </div>

                    <p className="admin-feedback-message">{item.message}</p>

                    <p className="admin-feedback-date">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>

                    <div className="admin-card-actions">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateFeedbackStatus(item.id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Approved">Approved (Public)</option>
                      </select>

                      <button
                        className="admin-delete"
                        onClick={() => deleteFeedback(item.id)}
                      >
                        DELETE
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
