// ProfilePage.tsx

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: 'Ajay',
    email: 'ajay@example.com',
    password: '********',
    problemsSolved: 128,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-blue-800 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">👤 Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {/* Profile Summary */}
        <Card className="bg-blue-100 shadow-md rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">👨‍💻 Basic Info</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Problems Solved:</strong> {user.problemsSolved}</p>
            <Button className="bg-blue-600 text-white" onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Edit Profile'}
            </Button>
            <a href="/dashboard" className="inline-block mt-2 text-blue-700 underline">Go to Dashboard ➡️</a>
          </CardContent>
        </Card>

        {/* Settings Form */}
        {editMode && (
          <Card className="bg-blue-50 shadow-md rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">⚙️ Update Settings</h2>
              <Input
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Username"
                className="bg-white"
              />
              <Input
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="bg-white"
              />
              <Input
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-white"
              />
              <Button className="bg-blue-700 text-white w-full">Save Changes</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
