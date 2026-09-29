# 🌱 Campus Carbon Footprint Tracker

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)

**Measure · Understand · Reduce** your campus carbon footprint

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/phemanthsai08/campus-carbon-footprint-tracker)

</div>

---

## ✨ What is this?

A beautiful, privacy-first web app that helps students and campus communities **log everyday activities** and instantly see their **carbon impact**.

No accounts. No servers storing your data. Everything lives in your browser — yet you get:

- 📊 Real-time totals & daily breakdown
- 🥧 Category pie chart (Transport · Energy · Food · Waste · Events)
- 🔥 Green streak counter
- 💡 Actionable campus sustainability tips
- ⚖️ Fun equivalents (“≈ X km driven by car”)

Perfect for **hackathons, green clubs, sustainability courses, or personal tracking**.

---

## 🚀 Live Demo

> Deployed on Vercel — one click to try:

**[Open the Tracker →](https://campus-carbon-footprint-tracker.vercel.app)**  
*(URL appears after first successful deploy)*

---

## 🛠️ Tech Stack

| Layer        | Choice                          |
|--------------|---------------------------------|
| Framework    | **Next.js 14** (App Router)     |
| Language     | **TypeScript**                  |
| Styling      | **Tailwind CSS** + custom eco palette |
| Charts       | **Recharts**                    |
| Icons        | **Lucide React**                |
| Persistence  | `localStorage` (client-only)    |
| Deploy       | **Vercel** (zero-config)        |

---

## 📦 Features at a Glance

- **One-tap activity logger** with smart templates (bus, carpool, veg meal, AC hours, recycling credit, …)
- **Emission factors** grounded in common LCA averages (educational use)
- **Negative emissions** when you recycle properly ♻️
- **Responsive** design — works great on phone during campus life
- **Zero backend** → free forever on the free Vercel tier

---

## 🖥️ Run Locally

```bash
# 1. Clone
git clone https://github.com/phemanthsai08/campus-carbon-footprint-tracker.git
cd campus-carbon-footprint-tracker

# 2. Install
npm install

# 3. Develop
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — start logging!

```bash
# Production build
npm run build && npm start
```

---

## ☁️ Deploy to Vercel (Recommended)

### Option A — One-click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/phemanthsai08/campus-carbon-footprint-tracker)

### Option B — CLI

```bash
npm i -g vercel
vercel
```

Vercel auto-detects Next.js. No environment variables needed.

---

## 📁 Project Structure

```
campus-carbon-footprint-tracker/
├── app/
│   ├── globals.css      # Eco theme + utilities
│   ├── layout.tsx       # Metadata & shell
│   └── page.tsx         # Main dashboard
├── components/
│   ├── Header.tsx
│   ├── StatsCards.tsx
│   ├── Logger.tsx       # Modal activity form
│   ├── History.tsx
│   ├── Breakdown.tsx    # Pie chart
│   └── Tips.tsx
├── lib/
│   └── carbon.ts        # Factors, helpers, types
├── public/
├── package.json
└── README.md
```

---

## 🧮 Emission Factors (Educational)

| Activity              | Factor (approx.)      |
|-----------------------|-----------------------|
| Walk / Cycle          | 0 kg / km             |
| City bus              | 0.089 kg / km         |
| Solo car              | 0.171 kg / km         |
| Carpool               | 0.085 kg / km         |
| Vegetarian meal       | 1.5 kg / meal         |
| Non-veg meal          | 4.2 kg / meal         |
| Proper recycling      | −0.05 kg / item       |

> Factors are simplified averages for learning. Real LCA values vary by region and energy mix.

---

## 🤝 Contributing

Ideas welcome!

1. Fork the repo  
2. Create a feature branch (`git checkout -b feature/amazing-tip`)  
3. Commit & push  
4. Open a Pull Request  

Suggestions: more activity templates, campus leaderboard (opt-in), export CSV, dark mode, PWA install.

---

## 📄 License

MIT — free for campuses, clubs, classrooms and personal use.

---

<div align="center">

Made with 💚 for a greener campus

**Star ⭐ the repo if this helped your sustainability project!**

</div>
