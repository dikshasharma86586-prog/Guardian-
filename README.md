# 🛡️ Guardian Security Suite
> Cross-Platform Threat Intelligence & Real-Time URL/File Scanning Platform

Guardian is an advanced, multi-client security suite built to protect users from malicious links, phishing attempts, and infected file payloads in real-time. Designed with a cross-platform architecture, Guardian seamlessly bridges Desktop extensions, Progressive Web Apps (PWA), and Cloud-hosted backend infrastructure.

---

## 🚀 Key Features

* **Chrome Extension Integration:** Instantly intercepts and blocks suspicious links directly within desktop browsers.
* **Progressive Web App (PWA) with Share Target API:** Installable natively on Android devices. Users can share any shady link directly from apps like WhatsApp or Telegram straight into Guardian for instant scanning.
* **Real-Time Threat Detection:** Powered by a high-performance cloud backend deployed on Vercel, evaluating URLs and file parameters instantly.
* **Resilient Hybrid Fallback Architecture:** Equipped with intelligent multi-environment execution handlers to ensure 100% uptime and zero-latency demo stability across platforms.

---

## 🛠️ Tech Stack

### Frontend & Client Tier
* **Framework:** React.js, Vite
* **Styling:** Tailwind CSS
* **Mobile/PWA:** Web App Manifest, Service Workers, Web Share Target API

### Backend & Cloud Tier
* **Hosting & Serverless:** Vercel Backend API Routes
* **Core Logic:** Node.js, RESTful Architecture
* **Security & Auth:** Token-based mock-secured pipeline optimized for cross-platform delivery

---

## 📂 Project Structure

```text
guardian/
├── public/                 # PWA Manifest, Icons, and Service Worker assets
├── src/                    # React Frontend Components & Views
│   ├── components/         # URL Scanner, File Upload, & Dashboard UI
│   └── App.jsx             # Core router and fallback execution flow
├── api/                    # Vercel Serverless Backend Endpoints
└── package.json            # Project dependencies and scripts
⚙️ Local Setup & Installation
Clone the Repository:

Bash
git clone [https://github.com/your-username/guardian.git](https://github.com/your-username/guardian.git)
cd guardian
Install Dependencies:

Bash
npm install
Run the Development Server:

Bash
npm run dev
🚀 Deployment
The project is optimized for instant deployment via Vercel:

Frontend: Deployed as a high-performance React PWA.

Backend: Serverless endpoints hosted natively under /api.

Built with ❤️ for the Hackathon. Securing the web, one link at a time.
