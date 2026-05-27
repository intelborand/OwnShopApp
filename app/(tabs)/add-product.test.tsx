import * as React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { vi } from "vitest";
import AddProductScreen from "./add-product";

const mockNavigate = vi.fn();
const mockAddProduct = vi.fn().mockResolvedValue({
  id: 1,
  title: "Test Product",
  price: 19.99,
  description: "A test product",
  category: "Test",
  image: "mock://photo.jpg",
  rating: { rate: 0, count: 0 },
});

vi.mock("expo-router", () => ({
  useRouter: () => ({
    navigate: mockNavigate,
  }),
  useLocalSearchParams: () => ({}),
}));

vi.mock("@expo/vector-icons/Ionicons", () => ({
  default: () => null,
}));

vi.mock("../context/productContext", () => ({
  useProducts: () => ({
    addProduct: mockAddProduct,
  }),
}));

vi.mock("@react-navigation/elements", () => ({
  Button: ({ onPress, children }: any) => (
    <button type="button" onClick={onPress}>
      {children}
    </button>
  ),
}));

afterEach(() => {
  vi.clearAllMocks();
});

function renderToDom(element: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  act(() => {
    root.render(element);
  });

  return {
    container,
    unmount: () => {
      root.unmount();
      document.body.removeChild(container);
    },
  };
}

describe("AddProductScreen", () => {
  it("renders the add product form fields", () => {
    const { container, unmount } = renderToDom(<AddProductScreen />);

    expect(container.querySelector("input[placeholder=Title]")).toBeTruthy();
    expect(container.querySelector("input[placeholder=Price]")).toBeTruthy();
    expect(
      container.querySelector("input[placeholder=Description]"),
    ).toBeTruthy();
    expect(container.querySelector("input[placeholder=Category]")).toBeTruthy();
    expect(container.textContent).toContain("Take Picture");
    expect(container.textContent).toContain("Submit");

    unmount();
  });

  it("navigates to camera when Take Picture is pressed", () => {
    const { container, unmount } = renderToDom(<AddProductScreen />);
    const takePictureButton = Array.from(
      container.querySelectorAll("button"),
    ).find((button) => button.textContent === "Take Picture");

    expect(takePictureButton).toBeTruthy();

    act(() => {
      takePictureButton?.dispatchEvent(
        new MouseEvent("click", { bubbles: true }),
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith("/camera");
    unmount();
  });
});
