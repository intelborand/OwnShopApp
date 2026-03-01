import { Stack } from "expo-router";
import { ProductProvider } from "./context/productContext";

export default function RootLayout() {
  return (
    <ProductProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
        <Stack.Screen name="camera" options={{ headerTitle: "Camera" }} />
      </Stack>
    </ProductProvider>
  );
}
