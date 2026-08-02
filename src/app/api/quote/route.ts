import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log the converted lead metadata to console/server-logs
    console.log('[LEAD CONVERSION CAPTURED]:', body);

    // Standard high-converting success response
    return NextResponse.json({
      success: true,
      message: 'Quote estimate lead captured successfully.',
      leadId: `VTX-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Invalid lead capture body payload.' },
      { status: 400 }
    );
  }
}
