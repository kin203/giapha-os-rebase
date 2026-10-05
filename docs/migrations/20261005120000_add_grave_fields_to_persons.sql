-- Add grave information fields to persons table

ALTER TABLE "public"."persons"
  ADD COLUMN IF NOT EXISTS "grave_address" text,
  ADD COLUMN IF NOT EXISTS "grave_note" text;

NOTIFY pgrst, 'reload schema';
