# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## App overview

This repository contains **MyShop**, a simple e-commerce demo built with Expo and React Native. The
application allows users to:

1. Browse a list of products fetched from [Fake Store API](https://fakestoreapi.com/products).
2. Add new products by filling out a form; submissions are posted to the API and
   immediately added to local state.
3. Navigate between screens using Expo Router, including a custom camera screen for
   taking product images.

The main architectural patterns and technologies used in the project include:

- **Expo (SDK 48+)** with managed workflow for cross-platform mobile development.
- **React Native** components and stylesheets for UI.
- **TypeScript** for type safety and clear interfaces (`Product`, context types, etc.).
- **Expo Router** (file-based routing) to define screens under `app/`, enabling
  navigation via `useRouter()` and nested layouts.
- **React Context** (`productContext.tsx`) for shared application state (product list,
  loading/error flags) and functions (`getProducts`, `addProduct`).
- **fetch API** to interact with the external Fake Store REST service; `GET` for
  listing and `POST` for creating products.
- **react-hook-form** for managing and validating form inputs in `add-product.tsx`.
- **Expo Camera** (via a separate screen) to capture images, integrated with navigation
  parameters to return the photo URI to the form.
- **Expo vector icons** (`@expo/vector-icons/Ionicons`) for button icons.
- Custom styling through `StyleSheet.create(...)` and conditional rendering of errors.

Additional conveniences in the workspace:

- `npm run reset-project` moves starter code to `app-example` and clears the `app`
  folder for a fresh project.
- ESLint, tsconfig, and other config files provided by `create-expo-app`.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
