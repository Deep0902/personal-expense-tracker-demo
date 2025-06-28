# Personal Expense Tracker Demo 

# React + TypeScript + Vite Click [here](https://deep0902.github.io/personal-expense-tracker-demo/) to view the app!

A modern web application for managing personal finances, built with React, TypeScript, and Vite.

## Key Features

- **User Authentication:** Secure sign up, sign in, and password recovery for both users and admins.
- **Expense Management:** Add, edit, delete, and categorize expenses. Track transaction history with search and filter options.
- **Dashboards:** User and Admin dashboards with visualizations, analytics, and category-wise breakdowns.
- **Data Export:** Export your expenses to CSV for external analysis or record-keeping.
- **Demo & API Integration:** Explore features with demo data or connect to real APIs for persistent storage.
- **Responsive Design:** Optimized for both mobile and desktop devices, with device dimension detection.
- **Modern UI/UX:** Smooth scrolling, custom fonts, and animated transitions for an intuitive experience.

## Technology Stack

- **React** (with hooks)
- **TypeScript**
- **Vite**
- **Lenis** (for smooth scrolling)
- **CSS Modules**

---
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
