# Devs Tec - Collaborative Development Platform

Welcome to **Devs Tec**, the ultimate platform for developers to host and review code, manage projects, and build software together. This web application is built with Next.js and Firebase, leveraging AI-powered features to enhance the development workflow.

![Devs Tec Homepage](https://placehold.co/1200x630.png)

## 🚀 How to Run This Project Locally

To get this project running on your local machine, follow these simple steps.

### 1. Prerequisites

Before you begin, ensure you have [Node.js](https://nodejs.org/) installed on your computer. We recommend using the **LTS** version. Installing Node.js will also install `npm`, which is required.

### 2. Clone the Repository

If you're cloning an existing project, use this command:
```bash
git clone https://github.com/syedkhaja-web/Devsk72.git
cd Devsk72
```

### 3. Install Dependencies

Once inside the directory, install all the required project packages by running:
```bash
npm install
```

### 4. Run the Development Server

Finally, start the local development server:
```bash
npm run dev
```

Your application should now be running at [http://localhost:9002](http://localhost:9002).


## 🔗 How to Connect to a New GitHub Repository

To connect this project to your new GitHub repository, run the following commands in your terminal one by one.

1.  **Set your remote repository URL:**
    *(This will update the remote URL to point to your new repository)*
    ```bash
    git remote set-url origin https://github.com/syedkhaja-web/devscollabration.git
    ```

2.  **Push your code to GitHub:**
    *(This will upload all your files)*
    ```bash
    git push -u origin main
    ```

### What if the Push Fails?

If you see a `[rejected]` error, it's likely because your new GitHub repository was created with a `README` or other file. To fix this, you can force the push, which will replace everything on GitHub with your local project.

Run this command instead for the final step:
```bash
git push --force origin main
```

After this, your project will be connected, and you can simply use `git push` for future updates.

---

## ✨ Features

- **Project Management:** Create and manage your personal software projects.
- **Collaborate on Projects:** Find and join innovative projects, or recruit developers for your own.
- **AI-Powered Chatbot:** An intelligent assistant to help with code, answer questions, and streamline your workflow.
- **AI Blog Post Generation:** Automatically generate blog post descriptions from a title.
- **AI-Generated Reports:** Get an overview of project statistics and a motivational quote to start your day.
- **Firebase Integration:** Secure user authentication and data storage.
- **Modern Tech Stack:** Built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI for a beautiful and responsive experience.

## 🤖 Running Genkit AI Flows

To run the AI flows locally for development and testing, use the following command in a separate terminal:

```bash
npm run genkit:watch
```
This will start the Genkit development server and automatically reload your flows when you make changes.

## ☁️ Deployment

This application is configured for deployment to **Firebase App Hosting**. For the best experience, we recommend setting up automated deployments by connecting your GitHub repository in the Firebase Console.

Alternatively, you can deploy manually from your machine if your environment is configured correctly.

```bash
firebase deploy --only apphosting
```

##  troubleshooting

If you see an error like `'npm' is not recognized...` or `ENOENT`, it means your computer cannot find the `npm` command. This usually happens if Node.js is not installed correctly or if its location is not in your system's `PATH`.

1.  **Install Node.js:** Download and install the LTS version from [nodejs.org](httpss://nodejs.org/). The installer should automatically add it to your `PATH`.
2.  **Restart Your Terminal/Computer:** After installing, completely close and re-open your terminal or VS Code. A full computer restart can also help ensure the new `PATH` is loaded.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React Framework
- [Firebase](https://firebase.google.com/) - Authentication & App Hosting
- [Genkit](https://firebase.google.com/docs/genkit) - AI Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [ShadCN UI](https://ui.shadcn.com/) - Component Library
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

---

&copy; 2024 Devs Tec, Inc.
