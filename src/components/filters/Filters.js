import React from 'react';
import { Select, VStack, CheckIcon, Button } from 'native-base';

const Filter = () => {
  let [filterOptions, setFilterOptions] = React.useState({
    cuisine: '',
    diet: '',
    intolerances: '',
    type: '',
  });

  return (
    <VStack alignItems="center" space={4}>
      <Select
        selectedValue={filterOptions.cuisine}
        minWidth={200}
        accessibilityLabel="Select Cuisine"
        placeholder="Cuisine"
        onValueChange={(selectedValue) =>
          setFilterOptions((options) => ({
            ...options,
            cuisine: selectedValue,
          }))
        }
        _selectedItem={{
          bg: '',
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="" value="" />
        <Select.Item label="African" value="African" />
        <Select.Item label="American" value="American" />
        <Select.Item label="British" value="British" />
        <Select.Item label="Cajun" value="Cajun" />
        <Select.Item label="Caribbean" value="Caribbean" />
        <Select.Item label="Chinese" value="Chinese" />
        <Select.Item label="Eastern European" value="Eastern European" />
        <Select.Item label="European" value="European" />
        <Select.Item label="French" value="French" />
        <Select.Item label="German" value="German" />
        <Select.Item label="Greek" value="Greek" />
        <Select.Item label="Indian" value="Indian" />
        <Select.Item label="Irish" value="Irish" />
        <Select.Item label="Italian" value="Italian" />
        <Select.Item label="Japanese" value="Japanese" />
        <Select.Item label="Jewish" value="Jewish" />
        <Select.Item label="Korean" value="Korean" />
        <Select.Item label="Latin American" value="Latin American" />
        <Select.Item label="Mediterranean" value="Mediterranean" />
        <Select.Item label="Mexican" value="Mexican" />
        <Select.Item label="Middle Eastern" value="Middle Eastern" />
        <Select.Item label="Nordic" value="Nordic" />
        <Select.Item label="Southern" value="Southern" />
        <Select.Item label="Spanish" value="Spanish" />
        <Select.Item label="Thai" value="Thai" />
        <Select.Item label="Vietnamese" value="Vietnamese" />
      </Select>

      <Select
        selectedValue={filterOptions.diet}
        minWidth={200}
        accessibilityLabel="Select Diet"
        placeholder="Diet"
        onValueChange={(selectedValue) =>
          setFilterOptions((options) => ({ ...options, diet: selectedValue }))
        }
        _selectedItem={{
          bg: 'cyan.600',
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="" value="" />
        <Select.Item label="Lacto-Vegetarian" value="Lacto-Vegetarian" />
        <Select.Item label="Ovo-Vegetarian" value="Ovo-Vegetarian" />
        <Select.Item label="Vegan" value="Vegan" />
        <Select.Item label="Pescetarian" value="Pescetarian" />
        <Select.Item label="Paleo" value="Paleo" />
        <Select.Item label="Primal" value="Primal" />
        <Select.Item label="Low FODMAP" value="Low FODMAP" />
        <Select.Item label="Whole30" value="Whole30" />
      </Select>

      <Select
        selectedValue={filterOptions.intolerances}
        minWidth={200}
        accessibilityLabel="Select Intolerances"
        placeholder="Intolerances"
        onValueChange={(selectedValue) =>
          setFilterOptions((options) => ({
            ...options,
            intolerances: selectedValue,
          }))
        }
        _selectedItem={{
          bg: 'cyan.600',
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="" value="" />
        <Select.Item label="Dairy" value="Dairy" />
        <Select.Item label="Egg" value="Egg" />
        <Select.Item label="Gluten" value="Gluten" />
        <Select.Item label="Grain" value="Grain" />
        <Select.Item label="Peanut" value="Peanut" />
        <Select.Item label="Seafood" value="Seafood" />
        <Select.Item label="Sesame" value="Sesame" />
        <Select.Item label="Shellfish" value="Shellfish" />
        <Select.Item label="Soy" value="Soy" />
        <Select.Item label="Sulfite" value="Sulfite" />
        <Select.Item label="Tree Nut" value="Tree Nut" />
        <Select.Item label="Wheat" value="Wheat" />
      </Select>

      <Select
        selectedValue={filterOptions.type}
        minWidth={200}
        accessibilityLabel="Select Recipe Type"
        placeholder="Recipe Type"
        onValueChange={(selectedValue) =>
          setFilterOptions((options) => ({ ...options, type: selectedValue }))
        }
        _selectedItem={{
          bg: 'cyan.600',
          endIcon: <CheckIcon size={4} />,
        }}
      >
        <Select.Item label="" value="" />
        <Select.Item label="main course" value="main course" />
        <Select.Item label="side dish" value="side dish" />
        <Select.Item label="dessert" value="dessert" />
        <Select.Item label="appetizer" value="appetizer" />
        <Select.Item label="salad" value="salad" />
        <Select.Item label="bread" value="bread" />
        <Select.Item label="breakfast" value="breakfast" />
        <Select.Item label="beverage" value="beverage" />
        <Select.Item label="sauce" value="sauce" />
        <Select.Item label="marinade" value="marinade" />
        <Select.Item label="fingerfood" value="fingerfood" />
        <Select.Item label="snack" value="snack" />
        <Select.Item label="drink" value="drink" />
      </Select>
      <Button onPress={() => {}}>Apply Filters</Button>
    </VStack>
  );
};

export default Filter;
