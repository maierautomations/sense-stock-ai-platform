-- Update profiles table to set your webhook URL as default for new users
UPDATE public.profiles 
SET n8n_webhook_url = 'https://maierai.app.n8n.cloud/webhook-test/6bf7dc5e-3ed9-4fc6-b93c-eb511d41e71d'
WHERE n8n_webhook_url IS NULL;