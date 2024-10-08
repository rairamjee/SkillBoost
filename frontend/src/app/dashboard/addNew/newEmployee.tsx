import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roles = [
  { value: "Employee", label: "Employee" },
  { value: "Admin", label: "Admin" },
];

const designations = Array.from({ length: 9 }, (_, i) => ({
  value: `Designation ${i + 1}`,
  label: `Designation ${i + 1}`,
}));

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const AddEmployee: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName) {
      toast.error("Username Required!");
      return;
    } else if (!email) {
      toast.error("Email Required!");
      return;
    } else if (!password) {
      toast.error("Password Missing!");
      return;
    } else if (!role) {
      toast.error("Select Role!");
      return;
    } else if (!designation) {
      toast.error("Select Designation!");
      return;
    } else if (!gender) {
      toast.error("Select Gender!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters");
      return;
    }

    if (password.length > 10) {
      toast.error("Password cannot be greater than 10 characters");
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const employeeData = {
      userName,
      email,
      password: hashedPassword,
      role,
      designation,
      gender,
    };

    try {
      const response = await axios.post("/api/addEmployee", employeeData);
      console.log(response.data);

      setUserName("");
      setEmail("");
      setPassword("");
      setRole("");
      setDesignation("");
      setGender("");

      toast.success("Employee Created Successfully!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Sorry, could not create the User!";
      toast.error(errorMessage);
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="userName" className="block mb-1">
            Username
          </label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="role" className="block mb-1">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          >
            <option value="">Select Role</option>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="designation" className="block mb-1">
            Designation
          </label>
          <select
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          >
            <option value="">Select Designation</option>
            {designations.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Gender</label>
          {genders.map((g) => (
            <label key={g.value} className="inline-flex items-center mr-4">
              <input
                type="radio"
                value={g.value}
                checked={gender === g.value}
                onChange={(e) => setGender(e.target.value)}
                required
                className="mr-2"
              />
              {g.label}
            </label>
          ))}
        </div>

        <Button type="submit">Add Employee</Button>
      </form>
    </div>
  );
};

export default AddEmployee;
