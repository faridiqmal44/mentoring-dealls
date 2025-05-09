# Automation Testing - Mentoring Feature (Dealls)

This project provides automated testing for the **Mentoring** feature on the [Dealls](https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring) website using **Playwright** with **JavaScript**.
For document, can open in this Google Docs url https://docs.google.com/document/d/1opGArCZsMK7ye_Hi8TFAwzHORVsESVZqpBj2-BcOePA/edit?usp=sharing

## 📋 Purpose

- To verify the core functionalities of the Mentoring feature (Register, Login, Search Mentor and Show detail Mentor).
- To perform automated end-to-end and smoke testing.

## 🧪 Tools & Technologies

- [Playwright](https://playwright.dev/)
- JavaScript (Node.js)
- VS Code (recommended IDE)
- Git for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/faridiqmal44/mentoring-dealls.git
cd mentoring-dealls
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Tests

```bash
npx playwright test tests/mentoring-dealls.spec.js
```

### 4. View Test Report (Optional)

```bash
npx playwright show-report
```

## Struktur Folder

.
├── node_modules/
├── test-results/
├── tests/
│ └── mentoring-dealls.spec.js #The main script for Mentoring feature testing
├── loginState.json
├── package-lock.json
├── README.md
└── package.json
