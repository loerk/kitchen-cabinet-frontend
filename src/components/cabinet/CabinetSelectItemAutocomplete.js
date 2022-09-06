import axios from "axios";

import React, { memo, useCallback, useState } from "react";
import { Text, View, Platform } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import Feather from "react-native-vector-icons/Feather";
Feather.loadFont();

export const CabinetSelectItemAutocomplete = memo(
  ({ setSelectedIngredient, selectedIngredient }) => {
    const BASE_URL = "http://192.168.178.26:8002";
    const [loading, setLoading] = useState(false);
    const [suggestionsList, setSuggestionsList] = useState(null);

    const getSuggestions = useCallback(async (q) => {
      if (typeof q !== "string" || q.length < 3) {
        setSuggestionsList(null);
        return;
      }
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/recipes/ingredient?ingredient=${q}`
        );
        setLoading(false);
        setSuggestionsList(
          data.map((item) => ({ id: item.id, title: item.name }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, []);
    return (
      <>
        <View
          style={[
            { flex: 1, flexDirection: "row", alignItems: "center" },
            Platform.select({ ios: { zIndex: 1 } }),
          ]}
        >
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={false}
            dataSet={suggestionsList}
            onChangeText={getSuggestions}
            onSelectItem={(item) => {
              console.log({ item });
              item &&
                setSelectedIngredient({
                  ...selectedIngredient,
                  name: item.title,
                  id: item.id,
                });
            }}
            textInputProps={{
              placeholder: "Item",
            }}
            debounce={600}
            loading={loading}
            useFilter={false}
            rightButtonsContainerStyle={{
              right: 8,
              height: 30,
              alignSelf: "center",
            }}
            inputContainerStyle={{
              backgroundColor: "#fff",
            }}
            containerStyle={{ flexGrow: 1, flexShrink: 1 }}
            ChevronIconComponent={
              <Feather name="chevron-down" size={20} color="#383b42" />
            }
            ClearIconComponent={
              <Feather name="x-circle" size={18} color="#383b42" />
            }
            inputHeight={50}
            showClear={true}
            EmptyResultComponent={
              <Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>
            }
          />
        </View>
      </>
    );
  }
);
