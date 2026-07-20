import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Optional: Add a simple authorization check so not everyone can trigger this
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  // If CRON_SECRET is set, require it for authorization. 
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const supabase = await createClient();
    
    // Perform a lightweight query to keep the database active
    // Supabase activity is registered by any database query. 
    // We are selecting from a small table (e.g., hero_stats) just to register activity.
    const { data, error } = await supabase
      .from('hero_stats')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Keep-alive cron error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database pinged successfully to prevent sleep.', 
      timestamp: new Date().toISOString() 
    });
  } catch (error: any) {
    console.error('Keep-alive cron exception:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
