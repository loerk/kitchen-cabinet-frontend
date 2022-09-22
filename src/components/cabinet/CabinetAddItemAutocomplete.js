import axios from 'axios';
import { BASE_URL } from '@env';

import React, { useCallback, useState } from 'react';
import { Text, View, Platform } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import Feather from 'react-native-vector-icons/Feather';
import { Box, useColorMode } from 'native-base';
Feather.loadFont();

export const CabinetSelectItemAutocomplete = ({
  setSelectedIngredient,
  selectedIngredient,
}) => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const { colorMode } = useColorMode();
  const getSuggestions = useCallback(async (q) => {
    if (typeof q !== 'string' || q.length < 3) {
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
    <View flex={1} alignItems={'center'}>
      <Box
        style={[
          {
            width: '60%',
            marginBottom: 40,
            flexDirection: 'row',
            alignItems: 'center',
          },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}
      >
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={false}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={(item) => {
            item &&
              setSelectedIngredient({
                ...selectedIngredient,
                name: item.title,
                id: item.id,
              });
          }}
          textInputProps={{
            placeholder: 'Item',
            autoCorrect: true,
          }}
          debounce={600}
          loading={loading}
          useFilter={false}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: 'center',
          }}
          inputContainerStyle={{
            //borderWidth: '1',
            //borderColor: '#891D4740',
            //color={colorMode === 'dark' ? '#FCF5EA' : '#515050'}
            backgroundColor: colorMode === 'dark' ? '#FCF5EA' : '#891D4710',
            // width: 200,
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
      </Box>
    </View>
  );
};
