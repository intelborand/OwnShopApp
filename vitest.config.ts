import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    alias: {
      "react-native": path.resolve(__dirname, "./test/mocks/react-native.ts"),
    },
    deps: {
      inline: ["react-native"],
    },
  },
});
