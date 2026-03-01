import Ionicons from "@expo/vector-icons/Ionicons";
import { Button as NativeButton } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Product, useProducts } from "../context/productContext";

type Inputs = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function AddProductScreen() {
  const router = useRouter();
  const { photo: photoFromParams } = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    },
  });

  const { addProduct } = useProducts();

  const FIELD_NAPPING: { name: keyof Inputs; placeholder: string }[] = [
    { name: "title", placeholder: "Title" },
    { name: "price", placeholder: "Price" },
    { name: "description", placeholder: "Description" },
    { name: "category", placeholder: "Category" },
  ];

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const productPayload = {
        ...data,
        price: Number(data.price),
        image: photoFromParams,
      } as Omit<Product, "id" | "rating">;

      await addProduct(productPayload);
      resetField("title");
      resetField("price");
      resetField("description");
      resetField("category");
      resetField("image");
    } catch (e) {
      alert("Failed to add product. Please try again.");
    }
  };

  const FieldController = (field: {
    name: keyof Inputs;
    placeholder: string;
  }) => {
    const { name, placeholder } = field;

    return (
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors[name] && styles.inputError]}
              keyboardType={field.name === "price" ? "numeric" : "default"}
              placeholder={placeholder}
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value ? value.toString() : ""}
            />
          )}
          name={name}
        />

        {errors[name] && (
          <Text style={styles.errorText}>This is required.</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.formContainer}>
      {FIELD_NAPPING.map((field) => (
        <FieldController
          key={field.name}
          name={field.name}
          placeholder={field.placeholder}
        />
      ))}

      {photoFromParams && (
        <View>
          <TouchableOpacity
            onPress={() => router.navigate("/camera")}
            style={{ position: "absolute", top: 22, left: 80, zIndex: 1 }}
          >
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{ uri: photoFromParams as string }}
            style={{ width: 100, height: 120, marginTop: 20 }}
          />
        </View>
      )}

      <View style={styles.button}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => router.navigate("/camera")}
        >
          <Ionicons
            name="camera"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <NativeButton onPress={handleSubmit(onSubmit)}>Submit</NativeButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  container: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ff4d4f",
  },
  errorText: {
    marginTop: 6,
    color: "#ff4d4f",
    fontSize: 13,
  },
  button: {
    marginTop: 20,
  },
  cameraButton: {
    height: 55,
    backgroundColor: "#007BFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
