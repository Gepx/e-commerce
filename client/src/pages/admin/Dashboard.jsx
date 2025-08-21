import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add your dashboard content here */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-gray-600">Manage system users</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-gray-600">Manage products</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p className="text-gray-600">View analytics</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
