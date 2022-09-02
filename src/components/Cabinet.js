import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  HStack,
  Image,
  Input,
  Icon,
  Box,
  Divider,
  Center,
  View,
  ScrollView,
} from "native-base";
import {
  Animated,
  SafeAreaView,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

// components
import Header from "./Header";

const Cabinet = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
  const [cabinetItems, setCabinetItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async () => {
    console.log(inputValue);
    try {
      const { data } = await axios.get(
        "http://192.168.178.123:8002/cabinet/items/630f488243702ea0df8bf333"
      );
      setCabinetItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIngredients = async () => {
    try {
      const { data } = await axios.get(
        "http://192.168.178.123:8002/cabinet/items/item/630dff86aa1ea3a726d5c230"
      );
      setCabinetItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);
  console.log(cabinetItems);
  return (
    <ScrollView>
      {/* <Header header="Cabinet" /> */}
      <Center>
        <HStack
          my="5"
          w="100%"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
            <Text>Favorites</Text>
          </TouchableOpacity>

          <Input
            defaultValue={inputValue}
            onChangeText={(newText) => setInputValue(newText)}
            placeholder="Search"
            variant="filled"
            width="50%"
            borderRadius="10"
            py="1"
            px="2"
            InputLeftElement={<Icon ml="2" size="4" color="gray.400" />}
          />
          <Button title="Search" onPress={handleSearch} />
          <TouchableOpacity onPress={() => navigation.navigate("Filters")}>
            <Text>Filters</Text>
          </TouchableOpacity>
        </HStack>
      </Center>
      <Image
        source={require("../../assets/images/cabinet.jpg")}
        alt="Kitchen Cabinet"
        resizeMode="cover"
      />
      <View>
        {!isLoading &&
          cabinetItems.map((item) => <Text key={item._id}>{item.name}</Text>)}
      </View>
    </ScrollView>
  );
};

export default Cabinet;
