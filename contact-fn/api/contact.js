// Contact form endpoint for the portfolio. Emails the owner through Resend, then sends the visitor a short receipt.
const ALLOWED = [
  "https://kittichotekamalapirat.github.io",
  "https://jovial-sequin-56cd.here.now",
  "http://localhost:8765",
];
const clean = (v, max) => String(v ?? "").trim().slice(0, max);
// Receipt sent to the visitor. It never echoes their message, so the form can't be used to send spam to others.
const RECEIPT = {
  en: { subject: "Thanks, I got your message", hi: (n) => (n ? `Hi ${n},` : "Hi,"), body: "Thanks for reaching out through my portfolio. Your message arrived, and I'll reply to this email address soon.", sign: "Shane (Kittichote Kamalapirat)" },
  th: { subject: "ได้รับข้อความของคุณแล้ว", hi: (n) => (n ? `สวัสดีคุณ${n}` : "สวัสดีครับ"), body: "ขอบคุณที่ติดต่อเข้ามาผ่านเว็บไซต์ ได้รับข้อความของคุณเรียบร้อยแล้ว และจะตอบกลับทางอีเมลนี้โดยเร็ว", sign: "กิตติโชติ กมลาภิรัตน์" },
  ja: { subject: "お問い合わせを受け付けました", hi: (n) => (n ? `${n} 様` : "こんにちは。"), body: "ポートフォリオサイトからお問い合わせいただき、ありがとうございます。メッセージを受け付けました。追ってこのメールアドレスにご連絡いたします。", sign: "キッティチョート・カマラピラット" },
};
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  if (ALLOWED.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method" });
  if (!ALLOWED.includes(origin)) return res.status(403).json({ ok: false, error: "origin" });

  const body = typeof req.body === "string" ? safeJson(req.body) : req.body || {};
  // hidden field real people never fill in
  if (clean(body.company, 200)) return res.status(200).json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150).replace(/\s+/g, " ");
  const message = clean(body.message, 3000);
  const lang = clean(body.lang, 5);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM,
      to: [process.env.CONTACT_TO],
      reply_to: email,
      subject: subject ? `${subject} (portfolio message from ${name})` : `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>${lang ? ` · page language: ${lang}` : ""}`,
      html: `<p style="white-space:pre-wrap;font:15px/1.5 sans-serif">${esc(message)}</p><p style="font:13px sans-serif;color:#666">— ${esc(name)} &lt;${esc(email)}&gt;${lang ? ` · page language: ${esc(lang)}` : ""}<br>Reply to this email to answer them.</p>`,
    }),
  });
  if (!r.ok) {
    console.error("resend failed", r.status, await r.text());
    return res.status(502).json({ ok: false, error: "send" });
  }
  await sendReceipt(email, name, lang);
  return res.status(200).json({ ok: true });
}

async function sendReceipt(email, name, lang) {
  const t = RECEIPT[lang] || RECEIPT.en;
  // names that look like links or addresses are dropped from the greeting
  const n = /[\/@:]|www\.|\.[a-z]{2,}\b/i.test(name) ? "" : name;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM,
      to: [email],
      reply_to: process.env.CONTACT_TO,
      subject: t.subject,
      text: `${t.hi(n)}\n\n${t.body}\n\n${t.sign}\nhttps://kittichotekamalapirat.github.io/`,
      html: `<div style="font:15px/1.6 sans-serif;color:#111"><p>${esc(t.hi(n))}</p><p>${t.body}</p><p>${t.sign}<br><a href="https://kittichotekamalapirat.github.io/">kittichotekamalapirat.github.io</a></p></div>`,
    }),
  });
  if (!r.ok) console.error("receipt failed", r.status, await r.text());
}

function safeJson(s) { try { return JSON.parse(s); } catch { return {}; } }
