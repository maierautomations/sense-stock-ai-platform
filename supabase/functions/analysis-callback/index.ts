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
    const { analysis_id, status, result_data, error_message } = await req.json();

    if (!analysis_id || !status) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: analysis_id, status' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update analysis record
    const updateData: any = {
      status,
      completed_at: new Date().toISOString()
    };

    if (result_data) {
      updateData.result_data = result_data;
    }

    if (error_message) {
      updateData.error_message = error_message;
    }

    const { error: updateError } = await supabase
      .from('stock_analyses')
      .update(updateData)
      .eq('id', analysis_id);

    if (updateError) {
      console.error('Database update error:', updateError);
      return new Response(
        JSON.stringify({ error: updateError.message }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analysis updated successfully:', analysis_id, 'Status:', status);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Analysis result received and updated'
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analysis-callback function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});