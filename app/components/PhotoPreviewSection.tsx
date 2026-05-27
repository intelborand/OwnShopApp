import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PhotoPreviewSection({
  photo,
  handleRetakePhoto,
  savePhoto,
}: {
  photo: string;
  handleRetakePhoto: () => void;
  savePhoto?: () => void;
}) {
  const router = useRouter();
  return (
    <View style={styles.previewContainer}>
      <Text style={styles.message}>Here&apos;s the photo you took:</Text>
      <Image source={{ uri: photo! }} style={{ width: 400, height: 300 }} />
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleRetakePhoto}
        >
          <Ionicons
            name="trash"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.text}>Retake Photo</Text>
        </TouchableOpacity>
        <Pressable
          style={styles.cameraButton}
          onPress={() =>
            router.navigate({
              pathname: "/add-product",
              params: { photo },
            })
          }
        >
          <Ionicons
            name="save"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.text}>Save Photo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    height: 55,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
});
