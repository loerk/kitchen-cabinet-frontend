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
  ScrollView,
} from 'native-base';
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
    '#b30000',
    '#7c1158',
    '#4421af',
    '#1a53ff',
    '#0d88e6',
    '#00b7c7',
    '#5ad45a',
    '#8be04e',
    '#ebdc78',
  ];
  const chartData = {};
  let modifiedCabinetItems = [];
  let toDisplay = [];

  if (isSuccess) {
    modifiedCabinetItems = cabinetItems.map((item) => {
      return item.name.includes('tuna') || item.name === 'Thunfisch'
        ? { ...item, type: 'meat' }
        : item.name === 'rub' || item.type === 'salt'
        ? { ...item, type: 'spices' }
        : item.type === 'gluten free cereal' || item.type === 'pasta'
        ? { ...item, type: 'grains' }
        : item.name.includes('milk') || item.type === 'cheese'
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
    /*     console.log(
          modifiedCabinetItems
            .filter((item) => item.type === 'cooking fat')
            .map((item) => item.name)
        ); */

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
      <Heading mt={5}>Diagrams</Heading>
      <ScrollView>
        <Box flex={1} mb={20}>
          {modifiedCabinetItems.length > 0 ? (
            <Center>
              <Text mt={5} mb={5} bold>
                Types of ingredients in the cabinet:
              </Text>
            </Center>
          ) : (
            <>
              <Center>
                <Text mt={5}>Your cabinet is empty.</Text>

                <Button
                  onPress={() => navigation.navigate('Add')}
                  w="50%"
                  bg="secondary.100"
                >
                  Add an item
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
                      height: 40,
                      paddingHorizontal: 130,
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
                        {item.x.charAt(0).toUpperCase() +
                          item.x.slice(1)} - {item.label}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                );
              }}
            />
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
}
