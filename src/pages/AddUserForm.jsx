import React from "react";

function AddUserForm() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add New User</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="border p-2 w-full" />
        <input type="email" placeholder="Email" className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;
