# ⚡ QuickQuiz – Interactive Quiz App

An interactive, full-stack quiz application built using **React** (frontend) and **Node.js + Express** (backend).  
QuickQuiz allows users to log in with their name, select a category (GK, Science, or Tech), answer 15 randomized questions, view their score and accuracy, and automatically save their results to a local file (`scores.txt`).

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Details](#-api-details)
- [Example Score File](#-example-score-file)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## 🧠 Overview

**QuickQuiz** is designed to provide a fun and responsive way to test users’ general knowledge, science, and tech skills — all within a modern, single-page React interface.

When a user completes the quiz, the app automatically sends their **name, score, accuracy, and category** to the backend API, which stores the result in `scores.txt`.

---

## 🌟 Features

✅ **3 Quiz Sections** – GK, Science, Tech  
✅ **15 Random Questions** per category  
✅ **Real-time Timer** – 15 seconds per question  
✅ **Automatic Scoring** – Calculates score and accuracy  
✅ **Visual Feedback** – Green for correct, Red for wrong  
✅ **Responsive UI** – Works on all screen sizes  
✅ **Result Storage** – Saves quiz reports in `scores.txt` via Node.js backend  
✅ **Modern Design** – Styled using TailwindCSS  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Vite, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Storage** | File system (`scores.txt`) |
| **Language** | JavaScript (ES6+) |
| **API Communication** | Fetch API (HTTP POST) |

---

## 🏗️ System Architecture

