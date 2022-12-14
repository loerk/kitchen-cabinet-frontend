import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import {
  Box,
  FlatList,
  Text,
  Center,
  View,
  Heading,
  Button,
} from 'native-base';
import { VictoryPie } from 'victory-native';

// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

import { useGetCabinetItemsQuery } from '../../features/api/apiSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TypesDiagram({ navigation }) {
  const { cabinetId } = useContext(AuthContext);
  const { width } = Dimensions.get('window');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: cabinetItems, isSuccess } = useGetCabinetItemsQuery(cabinetId);
  const colorScale = [
    '#891D47',
    '#c6878f',
    '#b79d94',
    '#969696',
    '#67697c',
    '#253d5b',
    '#63899e',
    '#4a756e',
    '#1b4b43',
    '#b7bf96',
    '#ebdc78',
  ];
  const chartData = {};
  let modifiedCabinetItems = [];
  let toDisplay = [];

  if (isSuccess) {
    modifiedCabinetItems = cabinetItems.map((item) => {
      return item.name.includes('tuna') || item.name === 'Thunfisch'
        ? { ...item, type: 'meat' }
        : item.name === 'rub' || item.type === 'salt' || item.type === 'herbs'
        ? { ...item, type: 'spices' }
        : item.type === 'gluten free cereal' || item.type === 'pasta'
        ? { ...item, type: 'grains' }
        : item.name.includes('milk') ||
          item.type === 'cheese' ||
          item.type === 'yogurt'
        ? { ...item, type: 'dairy' }
        : item.name === 'potatoes' ||
          item.name === 'onions' ||
          item.type === 'onion' ||
          item.type === 'legumes'
        ? { ...item, type: 'vegetable' }
        : item.type === 'undefined' ||
          item.type === 'sweetener' ||
          item.type === 'olives' ||
          item.name.includes('bean coffee') ||
          item.type === 'sauce' ||
          item.type === 'stock' ||
          item.type === 'spread' ||
          item.type === 'cooking fat' ||
          item.type === 'baking pieces' ||
          item.type === 'vinegar' ||
          !item.type
        ? { ...item, type: 'other' }
        : item;
    });
    for (const element of modifiedCabinetItems) {
      if (chartData[element.type]) {
        chartData[element.type] += 1;
      } else {
        chartData[element.type] = 1;
      }
    }
    const titles = Object.keys(chartData);
    const values = Object.values(chartData);
    toDisplay = modifiedCabinetItems.map((item, index) => {
      return { x: titles[index], y: values[index] };
    });
  }

  let finalChartData = toDisplay.map((item) => {
    let percentage = ((item.y / toDisplay.length) * 100).toFixed(0);
    return {
      label: `${percentage}%`,
      x: item.x,
      y: item.y,
    };
  });

  finalChartData = finalChartData
    .filter((item) => item.label !== 'NaN%')
    .sort((a, b) => +b['label'].split('%')[0] - +a['label'].split('%')[0]);

  finalChartData = finalChartData.map((item, index) => ({
    ...item,
    color: colorScale[index],
  }));

  function setSelectCategoryByType(name) {
    setSelectedCategory(name);
  }

  return (
    <View keyboardShouldPersistTaps="handled">
      <Heading size="sm" mb={1} mt={1} mr={5} textAlign="center">
        Types of Ingredients in your Cabinet
      </Heading>
      <Box flex={1} mb={324}>
        {modifiedCabinetItems.length > 0 ? null : (
          <>
            <Center>
              <Text py={4}>Your Cabinet is Empty</Text>

              <Button
                onPress={() => navigation.navigate('Add')}
                w="50%"
                bg="secondary.100"
              >
                Add an Ingredient
              </Button>
            </Center>
          </>
        )}
        <VictoryPie
          data={finalChartData}
          radius={({ datum }) =>
            selectedCategory && selectedCategory == datum.x
              ? width * 0.4
              : width * 0.4 - 10
          }
          innerRadius={60}
          labelRadius={({ innerRadius }) => (width * 0.4 + innerRadius) / 2.5}
          colorScale={colorScale}
          width={width * 0.8}
          height={width * 0.8}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: 'labels',
                      mutation: (props) => {
                        let categoryType = finalChartData[props.index].x;
                        setSelectCategoryByType(categoryType);
                      },
                    },
                  ];
                },
              },
            },
          ]}
          style={{
            labels: { fill: 'transparent', fontSize: 18 },
            parent: {
              shadowColor: '#000',
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
              alignItems: 'center',
            },
          }}
        />

        <Box w={'100%'} h={'90%'} mt={5}>
          <FlatList
            data={finalChartData}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    height: 30,
                    paddingLeft: 130,
                    borderRadius: 10,
                    backgroundColor:
                      selectedCategory && selectedCategory == item.x
                        ? item.color
                        : null,
                  }}
                >
                  <Box
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor:
                          selectedCategory && selectedCategory == item.x
                            ? null
                            : item.color,
                        borderRadius: 5,
                      }}
                    ></Box>
                    <Text
                      bold
                      ml={1}
                      color={
                        selectedCategory && selectedCategory == item.x
                          ? 'white'
                          : null
                      }
                    >
                      {' '}
                      {item.x.charAt(0).toUpperCase() + item.x.slice(1)} -{' '}
                      {item.label}
                    </Text>
                  </Box>
                </TouchableOpacity>
              );
            }}
          />
        </Box>
      </Box>
    </View>
  );
}
