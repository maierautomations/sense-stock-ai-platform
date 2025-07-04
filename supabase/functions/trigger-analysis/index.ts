import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbol, analysis_type, command_text, user_id } = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user's webhook URL
    const { data: profile } = await supabase
      .from('profiles')
      .select('n8n_webhook_url')
      .eq('user_id', user_id)
      .single();

    if (!profile?.n8n_webhook_url) {
      return new Response(
        JSON.stringify({ error: 'No webhook URL configured' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create analysis record
    const { data: analysis, error: insertError } = await supabase
      .from('stock_analyses')
      .insert({
        user_id,
        symbol,
        analysis_type,
        command_text,
        status: 'processing'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: insertError.message }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send to n8n webhook
    const webhookPayload = {
      analysis_id: analysis.id,
      symbol,
      analysis_type,
      command_text,
      user_id,
      timestamp: new Date().toISOString()
    };

    const webhookResponse = await fetch(profile.n8n_webhook_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      // Update status to failed if webhook fails
      await supabase
        .from('stock_analyses')
        .update({ 
          status: 'failed', 
          error_message: `Webhook failed: ${webhookResponse.status}`,
          completed_at: new Date().toISOString()
        })
        .eq('id', analysis.id);

      return new Response(
        JSON.stringify({ error: 'Failed to trigger analysis webhook' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analysis triggered successfully:', analysis.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis_id: analysis.id,
        message: 'Analysis started successfully'
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in trigger-analysis function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});