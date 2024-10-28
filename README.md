# Budget Buddy

**Budget Buddy** is a simple and effective budgeting application designed to help users track their expenses, set budgets, and manage finances effortlessly. With a user-friendly interface and powerful features, Budget Buddy makes financial management accessible to everyone.

## Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

---

## Features

-   **Expense Tracking**: Record and categorize expenses easily.
-   **Budget Setting**: Set monthly budgets and get alerts when you’re close to exceeding them.
-   **Reports & Insights**: Visualize spending trends with charts and reports.
-   **Cross-Device Sync**: Access your budgets and data from multiple devices.
-   **Privacy-Focused**: Your data is yours; we prioritize privacy and data security.

## Tech Stack

-   **Frontend**: React Native (Expo)
-   **State Management**: Redux Toolkit with RTK Query
-   **Backend**: [Backend language and framework if applicable]
-   **Database**: Prisma with MongoDB using the `withAccelerate` extension

## Getting Started

### Prerequisites

-   Node.js
-   MongoDB/PostgreSql

### Installation

1. **Clone the repository**

    ```bash
    git clone git@github.com:psyger100/budgetBuddy.git
    cd budget-buddy
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**
    ```bash
    npx react-native start --reset-cache
    ```

## Usage

1. **Log in or Register** to get started.
2. **Create a Budget** by specifying your monthly or weekly spending limits.
3. **Add Expenses** to track your spending in various categories.
4. **View Reports** to see visual breakdowns of your spending habits.
5. **Sync Across Devices** if you want to use it on both mobile and web.

## Building the Project for Android

To create a production-ready build of the **Budget Buddy** app for Android, follow these steps:

1. **Bundle the JavaScript code**
    ```bash
    bunx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
    ```
2. **Navigate to the Android directory**
    ```bash
    cd android
    ```
3. **Assemble the release build**
    ```bash
    ./gradlew assembleRelease
    ```
    This will generate the release APK file in the android/app/build/outputs/apk/release/ directory. You can then install the APK on an Android device to test the production version of Budget Buddy.

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

Feel free to reach out if you have any questions or feature requests! Happy budgeting!
