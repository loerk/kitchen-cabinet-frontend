import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  HStack,
  Image,
  Input,
  Icon,
  Center,
  View,
  ScrollView,
} from "native-base";
import { Button, Text, TouchableOpacity } from "react-native";
import { CabinetAddItemForm } from "./cabinet/CabinetAddItemForm";

const cabinetId = "6315f1e0801fa7692c1bb736";

const Cabinet = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
  const [cabinetItems, setCabinetItems] = useState([]);

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
      {/* <Image
        source={require("../../assets/images/cabinet.jpg")}
        alt="Kitchen Cabinet"
        resizeMode="cover"
      /> */}

      <CabinetAddItemForm cabinetId={cabinetId} />
      <View>
        {!isLoading &&
          cabinetItems.map((item) => <Text key={item._id}>{item.name}</Text>)}
      </View>
    </ScrollView>
  );
};

export default Cabinet;
