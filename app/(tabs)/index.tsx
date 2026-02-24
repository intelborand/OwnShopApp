import { FlatList, Text, View } from "react-native";

import ProductCard from "../components/ProductItem";
import { useProducts } from "../productContext";

export default function Index() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading products…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 8 }}>
          <ProductCard product={item} />
        </View>
      )}
    />
  );
}
