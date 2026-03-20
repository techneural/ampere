/**
 * One-time fix route to correct the home page slug and ensure it's published.
 * Visit: http://localhost:3000/api/fix-home
 * You can delete this file after running it once.
 */
import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Find any page with a broken homepage slug
    const result = await payload.find({
      collection: 'pages',
      overrideAccess: true,
      pagination: false,
      where: {
        or: [
          { slug: { equals: '/home' } },
          { slug: { equals: '/' } },
          { slug: { equals: 'home' } },
        ],
      },
    })

    if (result.docs.length === 0) {
      return NextResponse.json({ message: 'No homepage document found' }, { status: 404 })
    }

    const homePage = result.docs[0]
    const updates: string[] = []

    // Fix slug if it has a leading slash
    const needsSlugFix = homePage.slug !== 'home'
    if (needsSlugFix) {
      updates.push(`slug: "${homePage.slug}" → "home"`)
    }

    // Update the document: fix slug and publish it
    await payload.update({
      collection: 'pages',
      id: homePage.id,
      overrideAccess: true,
      data: {
        slug: 'home',
        _status: 'published',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    })

    return NextResponse.json({
      success: true,
      message: 'Homepage fixed and published!',
      id: homePage.id,
      updates: needsSlugFix ? updates : ['Published existing document'],
      note: 'You can now delete src/app/(payload)/api/fix-home/route.ts',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
