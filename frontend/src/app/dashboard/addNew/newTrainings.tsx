import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const domains = [
  { value: 'DataScience', label: 'DataScience' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'FullStack', label: 'FullStack' },
  { value: 'DataEngineering', label: 'DataEngineering' },
  { value: 'SoftSkills', label: 'SoftSkills' },
];

const NewTrainings: React.FC = () => {
  const [trainingName, setTrainingName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [domainName, setDomainName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      trainingName,
      description,
      domainName,
      duration,
    });
    // Reset the form
    setTrainingName('');
    setDescription('');
    setDomainName('');
    setDuration('');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-8">Create New Training</h2>
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
          <label htmlFor="duration" className="block mb-1">Duration</label>
          <input
            id="duration"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            placeholder="e.g., 4 weeks"
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <Button >Submit</Button>
      </form>
    </div>
  );
};

export default NewTrainings;
