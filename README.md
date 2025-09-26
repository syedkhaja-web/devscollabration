# Devs Tec - Collaborative Development Platform

Welcome to **Devs Tec**, the ultimate platform for developers to host and review code, manage projects, and build software together. This web application is built with Next.js and Firebase, leveraging AI-powered features to enhance the development workflow.

![Devs Tec Homepage](https://placehold.co/1200x630.png)

## ✨ Features

- **Project Management:** Create and manage your personal software projects.
- **Collaborate on Projects:** Find and join innovative projects, or recruit developers for your own.
- **AI-Powered Chatbot:** An intelligent assistant to help with code, answer questions, and streamline your workflow.
- **AI Blog Post Generation:** Automatically generate blog post descriptions from a title.
- **AI-Generated Reports:** Get an overview of project statistics and a motivational quote to start your day.
- **Firebase Integration:** Secure user authentication and data storage.
- **Modern Tech Stack:** Built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI for a beautiful and responsive experience.

## 🚀 Getting Started

To get this project up and running on your local machine, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Firebase CLI](https://firebase.google.com/docs/cli) for deployment

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/syedkhaja-web/Devstec-.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Devstec-
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the application live.

## 🤖 Running Genkit AI Flows

To run the AI flows locally for development and testing, use the following command in a separate terminal:

```bash
npm run genkit:watch
```
This will start the Genkit development server and automatically reload your flows when you make changes.

## ☁️ Deployment

This application is configured for deployment to **Firebase App Hosting**. To deploy your application, run the following command:

```bash
firebase deploy --only apphosting
```

Firebase will handle the build process and deployment for you.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React Framework
- [Firebase](https://firebase.google.com/) - Authentication & App Hosting
- [Genkit](https://firebase.google.com/docs/genkit) - AI Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [ShadCN UI](https://ui.shadcn.com/) - Component Library
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

---

&copy; 2024 Devs Tec, Inc.
