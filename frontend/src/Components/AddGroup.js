// This is not in working condition
import React, { useState } from 'react';

const dummyContacts = [
  'Jasmin Lowery',
  'Osman Campos',
  'Jacob McLeod',
  'Jayden Church',
  'Vanessa Cox',
  'Connor Garcia',
  'Anthony Cordanes',
];

export default function AddGroup() {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [message, setMessage] = useState('');

  const handleCheckboxChange = (contact) => {
    if (selectedMembers.includes(contact)) {
      setSelectedMembers(selectedMembers.filter((name) => name !== contact));
    } else {
      setSelectedMembers([...selectedMembers, contact]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim() || selectedMembers.length === 0) {
      setMessage('Please enter group name and select at least one member.');
      return;
    }

    setMessage(`Group "${groupName}" created with ${selectedMembers.length} member(s).`);
    setGroupName('');
    setSelectedMembers([]);
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center bg-light py-5"
      style={{ minHeight: '100vh' }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 bg-white shadow rounded p-4">
          <h2 className="text-primary text-center mb-4">Create New Group</h2>

          <form onSubmit={handleSubmit}>
            {/* Group Name */}
            <div className="mb-3">
              <label htmlFor="groupName" className="form-label fw-semibold text-secondary">
                Group Name
              </label>
              <input
                type="text"
                id="groupName"
                className="form-control rounded-pill px-4 py-2"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>

            {/* Members Dropdown */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-secondary">Select Members</label>
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle w-100 rounded-pill py-2 text-start"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedMembers.length === 0 ? 'Choose members' : `${selectedMembers.length} selected`}
                </button>
                <ul
                  className="dropdown-menu w-100 px-2"
                  style={{ maxHeight: '200px', overflowY: 'auto' }}
                >
                  {dummyContacts.map((contact, index) => (
                    <li key={index} className="form-check px-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`contact-${index}`}
                        checked={selectedMembers.includes(contact)}
                        onChange={() => handleCheckboxChange(contact)}
                      />
                      <label className="form-check-label ms-2" htmlFor={`contact-${index}`}>
                        {contact}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Submit */}
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary rounded-pill py-2">
                Create Group
              </button>
            </div>
          </form>

          {/* Feedback */}
          {message && (
            <div className="alert alert-info mt-4 text-center" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
