import React, { useContext, useState } from 'react';
import {
  View,
  VStack,
  Select,
  CheckIcon,
  Button,
  Text,
  Box,
  Center,
  HStack,
} from 'native-base';
import {
  useAddPreferencesMutation,
  useGetPreferencesQuery,
} from '../../features/api/apiSlice';
import { AuthContext } from '../../authNavigation/AuthProvider';

const DietPreferencesScreen = () => {
  const { cabinetId } = useContext(AuthContext);
  const [filterOptions, setFilterOptions] = useState({
    diet: '',
    intolerance: '',
  });
  const { data: presetPreferences } = useGetPreferencesQuery(cabinetId);
  const [addPreferences] = useAddPreferencesMutation();
  return (
    <View style={{ flex: 1, alignItems: 'center' }} pt={10}>
      <VStack alignItems="center" space={4}>
        <Box>
          <Center>
            <Text bold my={7}>
              Your current settings
            </Text>
            <HStack justifyContent={'center'} w={350} mb={6}>
              <VStack minW={100}>
                <Text bold>Diet</Text>
                <Text bold>Intolerance</Text>
              </VStack>
              <VStack minW={100}>
                <Text pl={4} textAlign={'left'}>
                  {Object.entries(presetPreferences).length &&
                  presetPreferences.diet
                    ? presetPreferences.diet.charAt(0).toUpperCase() +
                      presetPreferences.diet.slice(1)
                    : 'none'}
                </Text>
                <Text pl={4} textAlign={'left'}>
                  {Object.entries(presetPreferences).length &&
                  presetPreferences.intolerance
                    ? presetPreferences.intolerance.charAt(0).toUpperCase() +
                      presetPreferences.intolerance.slice(1)
                    : 'none'}
                </Text>
              </VStack>
            </HStack>
          </Center>
        </Box>
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
      <HStack space={4}>
        <Button
          minW={100}
          mt={10}
          bg="secondary.100"
          onPress={() => {
            addPreferences({
              cabinetId,
              preferences: { diet: '', intolerance: '' },
            });
            setFilterOptions({
              diet: '',
              intolerance: '',
            });
          }}
        >
          Reset
        </Button>
        <Button
          minW={100}
          mt={10}
          bg="secondary.100"
          onPress={() =>
            addPreferences({ cabinetId, preferences: filterOptions })
          }
        >
          Set
        </Button>
      </HStack>
    </View>
  );
};

export default DietPreferencesScreen;
