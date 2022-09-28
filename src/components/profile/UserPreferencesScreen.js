import React, { useState } from 'react';
import { View, VStack, Select, CheckIcon, Button } from 'native-base';

const DietPreferencesScreen = () => {
  const [filterOptions, setFilterOptions] = useState({
    diet: '',
    intolerance: '',
  });
  const [postPreferences, setPostPreferences] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VStack alignItems="center" space={4}>
        <Select
          selectedValue={filterOptions.diet}
          minWidth={200}
          size={'md'}
          accessibilityLabel="Select Diet"
          placeholder="Diet"
          onValueChange={(selectedValue) =>
            setFilterOptions((options) => ({ ...options, diet: selectedValue }))
          }
          _selectedItem={{
            bg: '',
            endIcon: <CheckIcon size={4} />,
          }}
        >
          <Select.Item label="" value="" />
          <Select.Item label="Vegetarian" value="vegetarian" />
          <Select.Item label="Vegan" value="vegan" />
          <Select.Item label="Gluten free" value="glutenFree" />
          <Select.Item label="Dairy free" value="dairyFree" />
        </Select>

        <Select
          selectedValue={filterOptions.intolerance}
          minWidth={200}
          accessibilityLabel="Select Intolerances"
          placeholder="Intolerances"
          size={'md'}
          onValueChange={(selectedValue) =>
            setFilterOptions((options) => ({
              ...options,
              intolerance: selectedValue,
            }))
          }
          _selectedItem={{
            bg: '',
            endIcon: <CheckIcon size={4} />,
          }}
        >
          <Select.Item label="" value="" />
          <Select.Item label="Egg" value="Egg" />
          <Select.Item label="Grain" value="grain" />
          <Select.Item label="Peanut" value="peanut" />
          <Select.Item label="Sesame" value="sesame" />
          <Select.Item label="Shellfish" value="shellfish" />
          <Select.Item label="Soy" value="soy" />
          <Select.Item label="Tree Nut" value="tree Nut" />
          <Select.Item label="Wheat" value="wheat" />
        </Select>
      </VStack>
      <Button
        mt={10}
        bg="secondary.100"
        onPress={() => setPostPreferences(true)}
      >
        Set Preferences
      </Button>
    </View>
  );
};

export default DietPreferencesScreen;
