# 🧮 Budget Tracker Backend

A Node.js + Express backend for the Budget Tracker app that helps users track their income and expenses, manage daily transactions, and view smart summaries. This backend uses MongoDB for data storage and JWT-based authentication for user management.

## 📦 Features

- 🔐 JWT-based Authentication (Login / Register)
- 💰 Create, Read, Update, Delete (CRUD) for Income & Expense Transactions
- 📆 Get today's transaction summary (total income, expense, balance)
- 🧠 Organized RESTful API structure
- 🌱 Environment variable support via `.env`

## 🌐 API Endpoints

Base URL: `http://13.60.84.241:5001/api`
> ⚠️ All transaction routes are protected and require a valid Bearer token.

## 🚀 Live Deployment

- **Backend URL:** `http://13.60.84.241:5001/api`
- **Frontend Repo:** [Budget Tracker FE](https://github.com/Dilusha-Ranasingha/Budget-Tracker-FE.git)
- **Docker Hub Image:** [`dilusharanasinghe/budget-tracker-be`](https://hub.docker.com/r/dilusharanasinghe/budget-tracker-be)

## 🛠️ Tech Stack

- **Backend Framework:** Node.js + Express
- **Database:** MongoDB
- **Auth:** JWT (JSON Web Tokens)
- **Deployment:** Docker + Docker Hub + GitHub Actions + AWS EC2
- **CI/CD:** GitHub Actions
- **Node.js**
- **Express**
- **MongoDB** with Mongoose

## 📁 Project Structure

```
Budget-Tracker-BE/
├── Dockerfile
├── .github/
│   └── workflows/
│       └── cicd.yml
├── controllers/
├── models/
├── routes/
├── middleware/
├── .env
├── server.js
└── package.json
```

## 📦 Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=5001
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://13.60.84.241:3000
```

## 🐳 Dockerized Deployment Overview

The app is containerized and deployed using Docker and Docker Hub. CI/CD is handled with GitHub Actions and the app is hosted on an AWS EC2 instance.

### ✅ Step-by-Step Backend Deployment via GitHub Actions to AWS EC2

#### 🔧 1. Dockerfile

```dockerfile
# Dockerfile

FROM node:20

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5001

CMD ["node", "server.js"]
```

#### 🐙 2. GitHub Actions CI/CD (.github/workflows/cicd.yml)

```yaml
name: Backend CI/CD

on:
  push:
    branches:
      - main  # my working branch name

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Login to Docker Hub
        run: docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}

      - name: Build Docker Image
        run: docker build -t #add your docker image name .

      - name: Push Docker Image
        run: docker push #add your docker  image name:latest

  deploy:
    needs: build
    runs-on: [#add in to here your self hosted Runner name]
    steps:
      - name: Pull Image from Docker Hub
        run: docker pull #add your docker image name:latest

      - name: Remove old container
        run: docker rm -f budget-tracker-backend || true

      - name: Run Docker container with secrets
        run: |
          docker run -d -p 5001:5001 \
            --name budget-tracker-backend \
            -e MONGO_URI="${{ secrets.MONGO_URI }}" \
            -e JWT_SECRET="${{ secrets.JWT_SECRET }}" \
            -e FRONTEND_URL="${{ secrets.FRONTEND_URL }}" \
            -e PORT="${{ secrets.PORT }}" \
            #add here your doker image name :latest
```

#### 🔐 3. GitHub Secrets Required

Set the following secrets in your GitHub repo under Settings > Secrets and variables > Actions:

| Name              | Description                            |
|-------------------|----------------------------------------|
| DOCKER_USERNAME   | Your Docker Hub username               |
| DOCKER_PASSWORD   | Your Docker Hub password/token         |
| FRONTEND_URL      | EC2 public IP (e.g., 13.60.x.x)       |
| MONGO_URI         | Mongo uri you create DB              |
| PORT      | 5001        |

#### 💡 4. EC2 Instance Setup (First Time Only)

EC2 Instance Connect into your EC2 instance setup like this and install Docker:

```bash
   # 1. Update package list
   sudo apt update
   
   # 2. Install required packages
   sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
   
   # 3. Add Docker’s official GPG key
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   
   # 4. Add Docker’s official repository
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   
   # 5. Update again to include Docker packages
   sudo apt update
   
   # 6. Install Docker Engine
   sudo apt install -y docker-ce
   
   # 7. Start Docker and enable it on boot
   sudo systemctl start docker
   sudo systemctl enable docker
   
   # 8. Add your user to the docker group (to run docker without sudo)
   sudo usermod -aG docker $USER
   
   # 9. After that reboot the EC2 insternc
   sudo reboot
   
   # 10. After that open new ubuntu
   
   # 11. Then check the docker version in the EC2 instenc
   docker --version
   
   # 12. Then create the runner.
   go to settings/actions/runners

   # 13. Then directory and start.
   sudo ./svc.sh install
   sudo ./svc.sh start
```

Allow traffic for port 5001 in the EC2 security group.

## 🧪 Local Development

```bash
# Clone the repo
git clone https://github.com/Dilusha-Ranasingha/Budget-Tracker-BE.git
cd Budget-Tracker-BE

# Install dependencies
npm install

# Add .env with required variables

# Start the server
npm run dev
```

## 📌 Author

Dilusha Ranasingha  
🔗 [GitHub](https://github.com/Dilusha-Ranasingha)  
🐳 [Docker Hub](https://hub.docker.com/r/dilusharanasinghe)

## 📄 License

This project is open-source and available under the MIT License.
