
  # APP of Builders

  This is a code bundle for APP of Builders. The original project is available at https://www.figma.com/design/VnSx022ct7ffkfa4NJuJ3d/APP-of-Builders.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Backend Setup (Supabase)

  The app now supports:
  - Local persistence (IndexedDB) for offline mode.
  - Cloud backend sync with Supabase when env keys are configured.

  1. Create a Supabase project.
  2. Run SQL from `supabase/schema.sql` in Supabase SQL Editor.
  3. Copy `.env.example` to `.env` and fill:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
  4. Restart app (`npm run dev` or rebuild desktop app).

  If Supabase env vars are missing, app continues in local-only mode.
  
