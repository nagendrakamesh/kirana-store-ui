import React, { useState } from "react";
import {
  FaStore,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaLock,
} from "react-icons/fa";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    storeName: "KiranaStore.com",
    ownerName: "Ramesh Kumar",
    email: "owner@kiranastore.com",
    phone: "+91 98765 43210",
    address: "Hyderabad, Telangana, India",
  });

  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile, password: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Don’t overwrite profile.password, just send update to backend
    const updatedProfile = { ...tempProfile };
    delete updatedProfile.password; // remove it locally

    setProfile(updatedProfile);
    setEditing(false);

    if (tempProfile.password) {
      console.log("Send password update request:", tempProfile.password);
      // 🔒 call backend API to update password securely here
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    alert("Account deleted! (implement actual delete logic here)");
  };

  return (
    <div className="container py-5">
      {/* Heading */}
      <h2 className="mb-4 text-center fw-bold">Profile</h2>

      <div
        className="card shadow-sm border-0 p-4 text-center"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        {/* Profile Icon */}
        <FaUserCircle size={80} className="text-secondary mb-3" />

        {!editing ? (
          <>
            <div className="text-start">
              <div className="mb-3 d-flex align-items-center">
                <FaStore className="text-success me-2" />
                <strong className="me-2">Store Name:</strong>{" "}
                {profile.storeName}
              </div>
              <div className="mb-3 d-flex align-items-center">
                <FaUserTie className="text-success me-2" />
                <strong className="me-2">Owner Name:</strong>{" "}
                {profile.ownerName}
              </div>
              <div className="mb-3 d-flex align-items-center">
                <FaEnvelope className="text-success me-2" />
                <strong className="me-2">Email:</strong> {profile.email}
              </div>
              <div className="mb-3 d-flex align-items-center">
                <FaPhone className="text-success me-2" />
                <strong className="me-2">Phone:</strong> {profile.phone}
              </div>
              <div className="mb-3 d-flex align-items-center">
                <FaMapMarkerAlt className="text-success me-2" />
                <strong className="me-2">Address:</strong> {profile.address}
              </div>
              {/* 🚫 Password not shown here */}
            </div>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => setEditing(true)}
              >
                <FaEdit className="me-1" /> Edit Profile
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                <FaTrash className="me-1" /> Delete Account
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              name="storeName"
              value={tempProfile.storeName}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Store Name"
            />
            <input
              type="text"
              name="ownerName"
              value={tempProfile.ownerName}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Owner Name"
            />
            <input
              type="email"
              name="email"
              value={tempProfile.email}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={tempProfile.phone}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Phone Number"
            />
            <textarea
              name="address"
              value={tempProfile.address}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Address"
              rows="3"
            ></textarea>

            {/* ✅ Password only in edit mode */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                value={tempProfile.password}
                onChange={handleChange}
                className="form-control"
                placeholder="New Password"
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-secondary"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
