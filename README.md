# Asha & Jabez — Wedding Invitation

A responsive wedding invitation built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons.

## Requirements
- Node.js 18+ (Node.js 20 LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```
The production files are generated in `dist/`.

## Customize the invitation
Open `src/App.jsx` and edit the `WEDDING` object near the top:
- `bride`, `groom`
- `date` (ISO date/time with timezone)
- `dateLabel`, `timeLabel`
- `venue`, `address`
- `whatsappNumber`: use digits only with country code, for example `919876543210`
- `musicSrc`: e.g. `/music/wedding-song.mp3`

### Background music
1. Create `public/music/`.
2. Add an MP3 you have permission to use, e.g. `public/music/wedding-song.mp3`.
3. Set `musicSrc: '/music/wedding-song.mp3'`.
4. Visitors must press **Play music** to start playback; browsers generally block autoplay with sound.

### RSVP behavior
- Set `whatsappNumber` to a WhatsApp-enabled number in international format, digits only, to open a prefilled RSVP message in WhatsApp.
- If no number is configured, the form downloads the RSVP response as a `.txt` file. This is a frontend-only fallback, not a shared RSVP database.
- For collecting RSVPs centrally, connect the form to a backend or a form service before publishing.

### Venue map
The “Get directions” link opens a Google Maps search for the church and address. Confirm the pin before sharing the website publicly.

## Deployment
Deploy the project to Vercel, Netlify, or another static hosting provider. Build command: `npm run build`; output directory: `dist`.
