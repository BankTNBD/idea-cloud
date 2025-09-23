# Idea Cloud

**Single-page Web Application for Generating, Sharing, and Exploring Project Ideas**

This project is part of the course “Introduction to Computer Engineering and Digital Technology (2110222), Semester 1/2025”,
Department of Computer Engineering, Faculty of Engineering, Chulalongkorn University.

---

## 📌 Project Overview

Innovation often begins with a simple **idea**, but turning that idea into a concrete project can be challenging. **Idea Cloud** was created to solve three key problems:

1. **Lack of Concrete Ideas** – Many people have interests (e.g., technology, health, education, environment) but struggle to turn them into actionable project ideas.  
2. **Lack of Accessible Inspiration** – Project ideas and inspiration are scattered across various sources, making discovery time-consuming and inefficient.  
3. **Lack of Idea Sharing & Collaboration** – There is no easy-to-use platform for sharing and collaborating on ideas, resulting in missed opportunities for co-creation.

**Idea Cloud** helps users generate, organize, and share ideas efficiently with the assistance of **AI**. It empowers individuals to turn interests into actionable projects, discover inspiration from others, and exchange ideas collaboratively.

---

## 🎯 Key Features

- **AI-Powered Idea Generation** – Users can input a topic of interest, and the system uses Google Gemini (LLM API) to generate relevant ideas.  
- **Automatic Idea Categorization** – Ideas are organized into categories using LLM to make browsing and searching easier.  
- **Idea Expansion** – Users can pick an idea they like and ask AI to expand it into more detailed concepts.  
- **CRUD Functionality** –  
  - **Create:** Submit new ideas to the database  
  - **Read:** View ideas in a responsive, customizable grid layout  
  - **Update:** Like/dislike ideas (updates stored in the database)  
  - **Delete:** Remove ideas no longer needed  
- **Sorting & Search** – Quickly find ideas and sort them in multiple ways  
- **Frontend & Backend Integration** – Seamlessly combines UI and server logic

---

## 🛠️ Tech Stack

### **Frontend**
- HTML, CSS, JavaScript (No external frameworks or libraries)

### **Backend**
- **Express.js** – Server framework  
- **Mongoose** – MongoDB object modeling  
- **Google/genai** – Library for using Google Gemini LLM API  

---

## 🤖 AI Integration

### **LLM API Usage**
- **Idea Generation** – Creates new ideas based on user input  
- **Idea Categorization** – Groups generated ideas into categories  
- **Idea Expansion** – Expands on selected ideas for further inspiration  

### **AI in Development**
- **Frontend Design:** ChatGPT was used to generate multiple frontend design prototypes  
- **Backend Development:** GitHub Copilot helped write backend code aligned with the frontend design  
- **Code Review:** AI-assisted testing and validation of features  
- **Continuous Improvement:** AI suggested additional features and UX enhancements for future versions  

---
