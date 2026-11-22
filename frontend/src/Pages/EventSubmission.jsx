
import React, { useState } from 'react';
import '../styles/pages/EventSubmission.css';

const initialFormData = {
  eventName: '',
  organizerName: '',
  contactPerson: '',
  email: '',
  phone: '',
  category: '',
  description: '',
  eventDate: '',
  location: '',
  expectedAudience: '',
  requirements: '',
};

export default function EventSubmission() {
  const [formData, setFormData] = useState(initialFormData);
  const [poster, setPoster] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePosterChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setPoster(null);
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Please select a JPG, PNG, or WEBP image.');
      e.target.value = '';
      setPoster(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('Poster image must be smaller than 5 MB.');
      e.target.value = '';
      setPoster(null);
      return;
    }

    setPoster(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    if (!poster) {
      alert('Please upload an event poster.');
      return;
    }

    const payload = new FormData();

    payload.append('eventName', formData.eventName.trim());
    payload.append('organizerName', formData.organizerName.trim());
    payload.append('contactPerson', formData.contactPerson.trim());
    payload.append('email', formData.email.trim());
    payload.append('phone', formData.phone.trim());
    payload.append('category', formData.category);
    payload.append('description', formData.description.trim());
    payload.append('eventDate', formData.eventDate);
    payload.append('location', formData.location.trim());
    payload.append('expectedAudience', formData.expectedAudience);
    payload.append('requirements', formData.requirements.trim());
    payload.append('poster', poster);

    try {
      setSubmitting(true);

      const response = await fetch('http://localhost:5001/api/events', {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        const errors = result.errors
          ?.map((error) => error.message)
          .join('\n');

        throw new Error(
          errors || result.message || 'Event submission failed.'
        );
      }

      alert(
        `Event submitted successfully!\nReference ID: ${
          result.data?.referenceId || 'Generated'
        }`
      );

      setFormData(initialFormData);
      setPoster(null);
      e.target.reset();
    } catch (error) {
      console.error('Event submission error:', error);
      alert(error.message || 'Unable to submit event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="submission-page">
      <div className="submission-header">
        <p className="submission-tag">FOR EVENT ORGANIZERS</p>

        <h1>
          LIST YOUR <span>EVENT</span>
        </h1>

        <p>
          Bring your event to the spotlight.
          Submit your details and let PRERA help
          you reach the right audience.
        </p>
      </div>

      <form className="submission-form" onSubmit={handleSubmit}>
        <h2>Event Information</h2>

        <div className="submission-grid">
          <div className="submission-field">
            <label htmlFor="eventName">Event Name *</label>
            <input
              id="eventName"
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Enter event name"
              minLength="2"
              maxLength="150"
              required
            />
          </div>

          <div className="submission-field">
            <label htmlFor="organizerName">Organizer Name *</label>
            <input
              id="organizerName"
              type="text"
              name="organizerName"
              value={formData.organizerName}
              onChange={handleChange}
              placeholder="Enter organizer name"
              minLength="2"
              maxLength="100"
              required
            />
          </div>

          <div className="submission-field">
            <label htmlFor="contactPerson">Contact Person *</label>
            <input
              id="contactPerson"
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Enter contact person"
              minLength="2"
              maxLength="100"
              required
            />
          </div>

          <div className="submission-field">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter contact email"
              required
            />
          </div>

          <div className="submission-field">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter contact phone"
              required
            />
          </div>

          <div className="submission-field">
            <label htmlFor="category">Event Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Business">Business</option>
              <option value="Educational">Educational</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="submission-field">
            <label htmlFor="eventDate">Event Date *</label>
            <input
              id="eventDate"
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="submission-field">
            <label htmlFor="location">Event Location *</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              minLength="2"
              maxLength="200"
              required
            />
          </div>

          <div className="submission-field">
            <label htmlFor="expectedAudience">Expected Audience *</label>
            <input
              id="expectedAudience"
              type="number"
              min="1"
              name="expectedAudience"
              value={formData.expectedAudience}
              onChange={handleChange}
              placeholder="Expected attendees"
              required
            />
          </div>

          <div className="submission-field">
            <label htmlFor="poster">Event Poster *</label>
            <input
              id="poster"
              type="file"
              name="poster"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePosterChange}
              required
            />
            <small>JPG, PNG or WEBP. Maximum size: 5 MB.</small>
          </div>
        </div>

        <div className="submission-field full-width">
          <label htmlFor="description">Event Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about your event..."
            rows="5"
            minLength="2"
            maxLength="3000"
            required
          />
        </div>

        <div className="submission-field full-width">
          <label htmlFor="requirements">Requirements *</label>
          <textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Describe the support or collaboration you need..."
            rows="4"
            minLength="5"
            maxLength="3000"
            required
          />
        </div>

        <button
          type="submit"
          className="submission-button"
          disabled={submitting}
        >
          {submitting ? 'SUBMITTING...' : 'SUBMIT EVENT →'}
        </button>
      </form>
    </div>
  );
}
