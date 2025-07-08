# 📦 PricePeeker 

A simple product price scraper for Flipkart and Amazon using Puppeteer 

## 🎥 Demo Video 

[![Watch the demo](https://img.shields.io/badge/▶️-Watch%20Demo-red?style=for-the-badge&logo=youtube)](https://drive.google.com/file/d/1Z1rjp87LvZg78irYCRuGwXNKq3oOcdHj/view?usp=sharing)


---

## 🔧 Features

- Scrapes product name, price, and link from Browser
- Supports modern Flipkart and Amazon layouts

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/mohit15-web/PricePeeker.git
cd PricePeeker
```

## Frontend

```bash
cd frontend
npm i
npm run dev
```

## Backend
```bash
cd server
npm i
npm start
```

## Testing 

 - Go to Postman
 - Call this post API - http://localhost:3000/api/fetch-prices
 - using following json

 ```bash
 {
    "country": "US",
    "query": "iPhone 16"
 }
 ```