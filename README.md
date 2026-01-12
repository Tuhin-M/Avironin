# Avironin.org Portal

> Harvard Business Review meets MIT Technology Review for Startups.

Avironin is a production-ready personal portfolio and strategic intelligence platform built for founders, builders, and technologists.

## 🚀 Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Editor**: TipTap Rich Text Editor (custom `AvRichTextEditor`)
- **Content**: MDX-ready architecture
- **Design System**: Avironin `Av` Prefix components (Inter & Merriweather typography)

## 🛠️ Getting Started

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   - Create a project on [Supabase](https://supabase.com).
   - Run the SQL in `db_schema.sql` in the Supabase SQL Editor.
   - Copy your Supabase URL and Anon Key to `.env.local` (see `env.example`).

3. **Run Locally**:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

- `src/app`: App Router pages (Home, Essays, Research, Insights, About, Contact).
- `src/components/ui`: Core Avironin (`Av`) prefixed UI components.
- `src/components/admin`: CMS tools including the Rich Text Editor.
- `src/lib/supabase`: Database client configuration.
- `src/styles`: Tailwind configuration and global styles.

## 🖋️ Writing Intelligence

To draft new essays with the Rich Text Editor:
- Navigate to `/admin/essays/new`
- Customize text with H1, H2, Bold, Lists.
- Upload multiple images/media to support your technical frameworks.

## 🎨 Design System

- **Azure Blue**: `#00ADEF` (Primary)
- **Coral Orange**: `#FF6F31` (Accent)
- **Deep Charcoal**: `#111111` (Text)
- **Off-White**: `#F4F6F8` (Background)

Typography uses **Inter** for headings and **Merriweather** for body text to maintain an academic yet tech-forward aesthetic.

---
Built by Avironin Research Group.
