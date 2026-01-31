import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Banner } from '@/lib/types/banner';
import { getDb } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('GET /api/banners: starting banner fetch');
    const db = await getDb();

    const banners = await db
      .collection('banners')
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    const activeBanners = (Array.isArray(banners) ? banners : []).filter(
      (banner: any) => banner.status === 'Active' || banner.isActive === true
    ) as unknown as Banner[];

    console.log(`GET /api/banners: fetched ${activeBanners.length} active banners`);
    return NextResponse.json(activeBanners, { status: 200 });
  } catch (err) {
    console.error('GET /api/banners error', err);
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/banners: received request');
    const payload = await request.json();
    const { title, subtitle, ctaText, status, imageUrl } = payload || {};

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const db = await getDb();

    const doc = {
      title: title ?? '',
      subtitle: subtitle ?? '',
      ctaText: ctaText ?? '',
      status: status ?? 'Inactive',
      imageUrl: imageUrl ?? '',
      createdAt: new Date(),
    };

    const result = await db.collection('banners').insertOne(doc);

    console.log('POST /api/banners: inserted id', String(result.insertedId));
    return NextResponse.json({ success: true, id: String(result.insertedId), banner: doc }, { status: 200 });
  } catch (err) {
    console.error('POST /api/banners error', err);
    return NextResponse.json({ error: 'Failed to save banner' }, { status: 503 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log('PUT /api/banners: received request');
    const payload = await request.json();
    const { id, title, subtitle, ctaText, status, imageUrl } = payload || {};

    if (!id) {
      return NextResponse.json({ error: 'Banner id is required' }, { status: 400 });
    }

    const db = await getDb();
    const filter = { _id: new ObjectId(String(id)) };

    const updateDoc: any = {};
    if (title !== undefined) updateDoc.title = title;
    if (subtitle !== undefined) updateDoc.subtitle = subtitle;
    if (ctaText !== undefined) updateDoc.ctaText = ctaText;
    if (status !== undefined) updateDoc.status = status;
    if (imageUrl !== undefined) updateDoc.imageUrl = imageUrl;
    updateDoc.updatedAt = new Date();

    const result = await db.collection('banners').updateOne(filter, { $set: updateDoc });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }

    console.log('PUT /api/banners: updated', id);
    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (err) {
    console.error('PUT /api/banners error', err);
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log('DELETE /api/banners: received request');
    const payload = await request.json();
    const { id } = payload || {};

    if (!id) {
      return NextResponse.json({ error: 'Banner id is required' }, { status: 400 });
    }

    const db = await getDb();
    const filter = { _id: new ObjectId(String(id)) };
    const result = await db.collection('banners').deleteOne(filter);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }

    console.log('DELETE /api/banners: deleted', id);
    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (err) {
    console.error('DELETE /api/banners error', err);
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 503 });
  }
}
