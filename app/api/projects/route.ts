import { NextResponse } from 'next/server';
import type { Project } from '@/lib/types/project';
import { getDb } from '@/lib/mongodb';
import ProjectModel from '@/models/Project';

export async function GET() {
  try {
    await getDb();

    const projects = await ProjectModel.find({ isActive: true }).lean<Project[]>();

    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
