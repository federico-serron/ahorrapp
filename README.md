
# 💸 AhorrApp - Personal Finance Manager

**AhorrApp** is a full stack web application that helps users manage their personal finances, track expenses, and set savings goals.  
It was selected as a **featured project** in the **SembrandoTIC program** organized by CUTI (Uruguay), and developed as the capstone project of the Full Stack Developer Bootcamp at 4Geeks Academy.

Built with **React.js** on the frontend and **Flask** (Python) with **SQLAlchemy** on the backend.

---

## 🚀 Features

- 📊 Track **incomes and expenses** across categories.
- 🎯 Set **personal savings goals** and monitor progress.
- 🌍 Manage **multiple wallets and currencies**.
- 📈 Visualize data with interactive **graphs and dashboards**.
- 🔐 Secure **user registration and login**.
- 🌐 Real-time exchange rate API integration.
- 📨 WhatsApp integration to improve the UX
- 🤖 AI-enhanced UX: Natural language input in Spanish or English for adding expenses and interacting with the app more intuitively.

---

## 🛠️ Tech Stack

### Frontend
- React.js + Bootstrap
- Custom global state manager (Flux-inspired)
- Form validation with Bootstrap + user-friendly feedback

### Backend
- Python + Flask
- SQLAlchemy ORM
- JWT-based authentication

### DevOps / Tools
- Docker (multi-container setup)
- PostgreSQL
- Render.com & EC2 deployment support
- Environment variable management via `.env`

---

## 📦 Project Structure

```
ahorrapp/
├── src/
│   ├── api/              # Backend (Flask)
│   │   ├── routes.py
│   │   └── models/
│   ├── front/            # Frontend (React)
│   │   ├── views/
│   │   ├── flux.js
│   │   └── index.js
│   ├── wsgi.py           # App entry point
├── Dockerfile
├── docker-compose.yml
├── render.yaml
└── .env
```

---

## 🧰 How to Run Locally

### ⚙️ Backend (Flask)

1. **Install Python 3.10 and Pipenv**  
   ```bash
   pip install pipenv
   ```

2. **Install dependencies**  
   ```bash
   pipenv install
   ```

3. **Create and edit your `.env` file**  
   ```bash
   cp .env.example .env
   ```

   Then update `DATABASE_URL` depending on your database:
   - SQLite: `sqlite:///test.db`
   - PostgreSQL: `postgres://user:password@localhost:5432/dbname`

4. **Run database migrations**  
   ```bash
   pipenv run migrate
   pipenv run upgrade
   ```

5. **Start the backend server**  
   ```bash
   pipenv run start
   ```

---

### 💻 Frontend (React)

1. **Install Node.js (v14 or higher)**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start
   ```

---

## ☁️ Deployment

### Deploy to Heroku

This project is Heroku-ready. Steps:

1. Sign up at [heroku.com](https://heroku.com)
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Create a Heroku app and connect your GitHub repo or deploy using CLI.

> This project also includes a `render.yaml` for Render.com deployments and can be deployed to AWS EC2 or any custom server.

---

## 📚 Resources

- [Starter Template Documentation](https://start.4geeksacademy.com/starters/react-flask)
- [Video Demo (Loom)](https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b)

---

## 👥 Contributors

- **Federico Serron**
- **Jose Luis Nuñez**
- **Juan Salazar**
- **Rafael Vargas**

We welcome contributions!  
Found a bug or have a feature idea? Open an issue or pull request anytime.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

**AhorrApp** is a powerful yet simple solution to help you take control of your finances and save more effectively.  
Let’s start saving together! 🚀
