import * as React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { Button, Text, View } from "react-native";
import { vi } from "vitest";
import CameraScreen from "./camera";

const mockRequestPermission = vi.fn();
const mockUseCameraPermissions = vi.fn();
const cameraViewPropsHistory: any[] = [];

vi.mock("@expo/vector-icons/Ionicons", () => ({
  default: () => null,
}));

vi.mock("expo-camera", () => {
  return {
    CameraView: (props: any) => {
      const { ref, ...viewProps } = props;
      cameraViewPropsHistory.push(viewProps);
      return <View testID="camera-view" {...viewProps} />;
    },
    useCameraPermissions: () => mockUseCameraPermissions(),
  };
});

vi.mock("../components/PhotoPreviewSection", () => {
  const Component = ({
    photo,
    handleRetakePhoto,
  }: {
    photo: string;
    handleRetakePhoto: () => void;
  }) => (
    <View>
      <Text>PHOTO {photo}</Text>
      <Button title="Retake Photo" onPress={handleRetakePhoto} />
    </View>
  );

  return {
    default: Component,
  };
});

afterEach(() => {
  vi.clearAllMocks();
  cameraViewPropsHistory.length = 0;
});

function renderToDom(element: React.ReactElement) {
  const container = document.createElement("div");
  const root = createRoot(container);

  act(() => {
    root.render(element);
  });

  return {
    container,
    root,
    unmount: () => root.unmount(),
  };
}

describe("CameraScreen", () => {
  it("shows a permission prompt when camera permission is denied", () => {
    mockUseCameraPermissions.mockReturnValue([
      { granted: false },
      mockRequestPermission,
    ]);

    const { container, unmount } = renderToDom(<CameraScreen />);
    expect(container.textContent).toContain(
      "We need your permission to show the camera",
    );

    const grantButton = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "grant permission",
    );

    expect(grantButton).toBeTruthy();

    act(() => {
      grantButton?.click();
    });

    expect(mockRequestPermission).toHaveBeenCalled();
    unmount();
  });

  it("renders the camera view when permission is granted", () => {
    mockUseCameraPermissions.mockReturnValue([
      { granted: true },
      mockRequestPermission,
    ]);

    const { container, unmount } = renderToDom(<CameraScreen />);
    const cameraView = container.querySelector('[data-testid="camera-view"]');

    expect(cameraView).toBeTruthy();
    unmount();
  });

  it("toggles camera facing when the reverse button is pressed", () => {
    mockUseCameraPermissions.mockReturnValue([
      { granted: true },
      mockRequestPermission,
    ]);

    const { container, unmount } = renderToDom(<CameraScreen />);
    const buttons = container.querySelectorAll("button");

    expect(cameraViewPropsHistory[0]?.facing).toBe("back");

    act(() => {
      buttons[0].click();
    });

    expect(
      cameraViewPropsHistory[cameraViewPropsHistory.length - 1]?.facing,
    ).toBe("front");
    unmount();
  });
});
