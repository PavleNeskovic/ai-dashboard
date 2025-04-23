# 🧠 AI Reports Dashboard

An AI-enhanced, role-based reporting dashboard built with React, TypeScript, and Material UI — featuring OpenAI integration, drag-and-drop report organization, and rich-text editing via TinyMCE.

---
## 🌐 Live Demo

The project is deployed and can be accessed at [AI Reports Dashboard](https://ai-dashboard-q8j1.onrender.com/). Explore the features and functionality live in your browser.


## ✨ Features

- 🔐 **Role-based access**:  
  - `Admin`: Can create, edit, delete reports  
  - `Viewer`: Read-only access with AI summaries

- 📋 **Report Management**:  
  - Create and edit rich-text reports  
  - Reorder reports with drag-and-drop (`dnd-kit`)  
  - Search by title  
  - Delete with confirmation

- 🤖 **AI Integration (OpenAI)**:  
  - Generate full reports from prompts  
  - Summarize report content  
  - Error handling with graceful fallbacks

- 🕵️‍♂️ **Activity Tracking**:  
  - Logs creation, edits, AI usage, and deletions  
  - Viewable via the top-right Activity Tracker

- 💾 **Local Persistence**:  
  - All data stored in `localStorage`  
  - Role, reports, and activity log retained on refresh

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/PavleNeskovic/ai-dashboard
cd ai-dashboard
```
### 2. Install dependencies
```bash
npm install
```
### 3. Add environment variables

Create a .env file in the root of the project with the following:

```bash
REACT_APP_TINYMCE_API_KEY=your-tinymce-api-key
REACT_APP_OPENAI_API_KEY=your-openai-api-key
```
You can get keys from:

🔑 TinyMCE Cloud (free account)

🔑 OpenAI

⚠️ For local development only — do not expose these keys in production.

## 🚀 Run the app
This project uses Create React App.

```bash
npm start
```
Then visit http://localhost:3000 in your browser.

## 🧱 Stack

React + TypeScript

Material UI (MUI)

dnd-kit for drag-and-drop

TinyMCE for rich-text editing

OpenAI API for report generation & summarization

React Context API for state management

## 📁 Project Structure
```bash

src/
├── components/         # UI components (modals, cards, toolbar)
├── context/            # Context providers for roles, reports, activity
├── services/           # OpenAI API abstraction
├── App.tsx             # Root component
└── index.tsx           # Entry point
```

## 🧩 Notes
Admins can create/edit/delete — viewers are read-only

No backend required — everything runs client-side and persists via localStorage

AI actions are logged and visible under “Activity Tracker” in the navbar

## 🐞 Known Issues

- On iOS Safari 18.4, the text label of the prompt input is not displayed correctly. This is a known issue and is being investigated for a future fix.

