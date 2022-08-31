import { View, Text } from "native-base";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/recipesSlize";

export default function RecipesList() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.list);
  console.log(recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  return (
    <View style={styles.container}>
      <Text>RecipeList</Text>
      {recipes.map((recipe) => (
        <Text>{recipe.title}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
