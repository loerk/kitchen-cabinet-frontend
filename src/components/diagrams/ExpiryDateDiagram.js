import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import {
  Box,
  FlatList,
  Text,
  Center,
  View,
  Button,
  Heading,
  ScrollView,
} from 'native-base';
import { VictoryPie } from 'victory-native';

// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

import { useGetCabinetItemsQuery } from '../../features/api/apiSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ExpiryDateDiagram({ navigation }) {
  const { cabinetId } = useContext(AuthContext);
  const { width } = Dimensions.get('window');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: cabinetItems } = useGetCabinetItemsQuery(cabinetId);
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

  let toDisplay = [];
  const date = new Date();
  const CURRENT_DATE = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const modifiedCabinetItems = cabinetItems.map((item) => {
    const { expiryDate } = item;
    const expired = +new Date(CURRENT_DATE) > +new Date(expiryDate);
    const remainingDaysLeft = Math.round(
      (+new Date(expiryDate) - +new Date(CURRENT_DATE)) / (1000 * 60 * 60 * 24)
    );
    const twoWeeksLeft = Math.abs(remainingDaysLeft) <= 14;
    const fiveDaysLeft = Math.abs(remainingDaysLeft) <= 5;

    if (expired) {
      return { ...item, expiresIn: 'Already expired' };
    } else if (fiveDaysLeft) {
      return { ...item, expiresIn: 'Within five days' };
    } else if (twoWeeksLeft) {
      return { ...item, expiresIn: 'Within two weeks' };
    } else {
      return { ...item, expiresIn: 'More than two weeks' };
    }
  });
  for (const element of modifiedCabinetItems) {
    if (chartData[element.expiresIn]) {
      chartData[element.expiresIn] += 1;
    } else {
      chartData[element.expiresIn] = 1;
    }
  }

  const titles = Object.keys(chartData);
  const values = Object.values(chartData);
  toDisplay = modifiedCabinetItems.map((item, index) => {
    return { x: titles[index], y: values[index] };
  });

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
      <Heading>Diagrams</Heading>
      <Text ml={5} italic size={'sm'} mb={3}>
        shows the expiration period of the ingredients in your Cabinet
      </Text>
      <ScrollView>
        <Box flex={1} mb={20}>
          {modifiedCabinetItems.length > 0 ? null : (
            <>
              <Center>
                <Text mt={5}>Your cabinet is empty.</Text>

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

          <Box mt={5}>
            <FlatList
              data={finalChartData}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      height: 40,
                      paddingLeft: 80,
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
