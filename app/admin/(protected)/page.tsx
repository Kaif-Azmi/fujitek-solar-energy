'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

export default function Admin() {
  useEffect(() => {
    console.log('Admin page: useEffect - mounted');
    console.log('Admin page: timestamp', new Date().toISOString());
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl text-strong mb-6">Dashboard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-2">Select a section from the sidebar to manage your content:</p>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Banners - Manage carousel banners</li>
            <li>Products - Manage product listings</li>
            <li>Services - Manage service offerings</li>
            <li>Projects - Manage project showcases</li>
            <li>Leads - View and manage leads</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

