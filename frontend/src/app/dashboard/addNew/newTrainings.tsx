import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const domains = [
  { value: 'DataScience', label: 'Data Science' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'FullStack', label: 'Full Stack' },
  { value: 'DataEngineering', label: 'Data Engineering' },
  { value: 'SoftSkills', label: 'Soft Skills' },
];

const NewTrainings: React.FC = () => {
  const [trainingName, setTrainingName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [domainName, setDomainName] = useState<string>('');
  const [duration, setDuration] = useState<number | ''>(''); // Allow empty string for initial state
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate duration is a number
    if (typeof duration !== 'number' || duration <= 0) {
      setError('Please enter a valid duration.');
      return;
    }

    const trainingData = {
      trainingName,
      description,
      domainName,
      duration,
    };

    try {
      const response = await axios.post('/api/addTrainings', trainingData);
      console.log(response.data); 
     
      setTrainingName('');
      setDescription('');
      setDomainName('');
      setDuration(''); 
    } catch (err) {
      setError('Failed to create training. Please try again.');
      console.error(err); 
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-8">Create New Training</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="trainingName" className="block mb-1">Training Name</label>
          <input
            id="trainingName"
            type="text"
            value={trainingName}
            onChange={(e) => setTrainingName(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="domainName" className="block mb-1">Domain Name</label>
          <select
            id="domainName"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            required
            className="border border-gray-300 p-2 w-full"
          >
            <option value="">Select Domain</option>
            {domains.map(domain => (
              <option key={domain.value} value={domain.value}>
                {domain.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="duration" className="block mb-1">Duration (in hours)</label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
            placeholder="e.g., 4"
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewTrainings;
