import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  return (
    <div>
      <h1>Form</h1>

      <label>First Name:</label>
      <input
        type="text"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
      />

      <label>Last Name:</label>
      <input
        type="text"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />

      <label>Email:</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <p>
        First Name: {formData.firstName}
        Last Name: {formData.lastName}
        Email: {formData.email}
      </p>
    </div>
  );
}
