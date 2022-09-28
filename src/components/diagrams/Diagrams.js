import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import { Box, FlatList, Text, Center, View, Button } from 'native-base';
import { VictoryPie } from 'victory-native';

// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

import { useGetCabinetItemsQuery } from '../../features/api/apiSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Diagrams({ navigation }) {
  const { cabinetId } = useContext(AuthContext);
  const { width } = Dimensions.get('window');
  const [selectedCategory, setSelectedCategory] = useState('');
  const {
    data: cabinetItems,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCabinetItemsQuery(cabinetId);
  const colorScale = [
    '#3b85c0',
    '#fb7b8b',
    '#294679',
    '#575bac',
    '#8871A0',
    '#003f5c',
    '#A2C3DB',
    '#bc5090',
    '#623337',
    '#ff6361',
    '#ffa600',
    '#cfaca4',
  ];
  const chartData = {};
  let modifiedCabinetItems = [];
  let toDisplay = [];

  if (isSuccess) {
    /* cabinetItems.map(item => item.name === 'potatoes' || item.name === 'onions' ? { ...item, type: 'vegetable' } : item); */
    modifiedCabinetItems = cabinetItems.map((item) => {
      return item.name.includes('tuna') || item.name === 'Thunfisch'
        ? { ...item, type: 'meat' }
        : item.name === 'rub' || item.type === 'salt'
        ? { ...item, type: 'spices' }
        : item.type === 'gluten free cereal'
        ? { ...item, type: 'grains' }
        : item.name.includes('milk') || item.type === 'cheese'
        ? { ...item, type: 'dairy' }
        : item.name === 'potatoes' ||
          item.name === 'onions' ||
          item.type === 'legumes'
        ? { ...item, type: 'vegetable' }
        : item.type === 'undefined' ||
          item.type === 'sweetener' ||
          item.type === 'olives' ||
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
    console.log(
      modifiedCabinetItems
        .filter((item) => item.type === 'spices')
        .map((item) => item.name)
    );

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
    .filter(
      (item) => item.label !== 'NaN%'
    ) /* .map(item => item.name === 'potatoes' || item.name === 'onions' ? { ...item, type: 'vegetable' } : item) */
    /*     .map((item) => {

      return (item.x === 'undefined' || item.x === 'sweetener' ? { ...item, x: 'other' } : item);
    }) */ .sort(
      (a, b) => +b['label'].split('%')[0] - +a['label'].split('%')[0]
    );

  finalChartData = finalChartData.map((item, index) => ({
    ...item,
    color: colorScale[index],
  }));

  function setSelectCategoryByType(name) {
    setSelectedCategory(name);
  }

  return (
    <View keyboardShouldPersistTaps="handled">
      <Box flex={1} mb={20}>
        {modifiedCabinetItems ? (
          <Center>
            <Text mt={5} mb={5} bold>
              Types of ingredients in the cabinet:
            </Text>
          </Center>
        ) : (
          <>
            <Center>
              <Text>Your cabinet is empty.</Text>
            </Center>
            <Button onPress={() => navigation.navigate('Add')}>
              Add an item
            </Button>
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
                onPress: () => {
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
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
              alignItems: 'center',
            },
          }}
        />

        <Box w={'150%'} h={'90%'} ml={-20}>
          <FlatList
            data={finalChartData}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    height: 40,
                    paddingHorizontal: 150,
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
                      w="500%"
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
