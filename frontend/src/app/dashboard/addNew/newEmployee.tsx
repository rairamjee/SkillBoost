// components/AddEmployee.tsx
import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Button } from '@/components/ui/button';

const roles = [
  { value: 'Employee', label: 'Employee' },
  { value: 'Admin', label: 'Admin' },
];

const designations = Array.from({ length: 9 }, (_, i) => ({
  value: `Designation${i + 1}`,
  label: `Designation ${i + 1}`,
}));

const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const AddEmployee: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const employeeData = {
      userName,
      email,
      password: hashedPassword,
      role,
      designation,
      gender,
    };

    // Here you can send `employeeData` to your API endpoint
    console.log(employeeData);

    // Reset the form
    setUserName('');
    setEmail('');
    setPassword('');
    setRole('');
    setDesignation('');
    setGender('');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userName" className="block mb-1">Username</label>
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
          <label htmlFor="email" className="block mb-1">Email</label>
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
          <label htmlFor="password" className="block mb-1">Password</label>
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
          <label htmlFor="role" className="block mb-1">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          >
            <option value="">Select Role</option>
            {roles.map(r => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="designation" className="block mb-1">Designation</label>
          <select
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          >
            <option value="">Select Designation</option>
            {designations.map(d => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Gender</label>
          {genders.map(g => (
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

        <Button>Add Employee</Button>
      </form>
    </div>
  );
};

export default AddEmployee;
