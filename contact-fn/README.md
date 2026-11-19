# Contact form function

Source of the serverless function behind the contact form on the homepage. It is deployed to the Vercel project `portfolio-contact` (team kittichoteshanes-projects) and served at `https://portfolio-contact-kittichoteshanes-projects.vercel.app/api/contact`. GitHub Pages does not deploy this folder.

It emails the owner through Resend, then sends the visitor a short receipt in the page language. Only origins listed in `ALLOWED` can call it.

Environment variables (set in Vercel, never committed): `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`.
