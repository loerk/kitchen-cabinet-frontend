import React, { useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import { FlatList, Text, View } from 'native-base';
import { VictoryPie } from 'victory-native';
// Authentication
import { AuthContext } from '../../authNavigation/AuthProvider';

import { useGetCabinetItemsQuery } from '../../features/api/apiSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function Diagrams() {
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
    '#cfaca4',
    '#623337',
  ];
  const chartData = {};
  let toDisplay = [];
  let categorizedCabinetItems = [];
  if (isSuccess) {
    const categories = [...new Set(cabinetItems.map((item) => item.type))];

    categorizedCabinetItems = categories.reduce((acc, category) => {
      const items = cabinetItems.filter((item) => item.type === category);
      return [...acc, { category: category, items }];
    }, []);

    for (const element of cabinetItems) {
      if (chartData[element.type]) {
        chartData[element.type] += 1;
      } else {
        chartData[element.type] = 1;
      }
    }

    const titles = Object.keys(chartData);
    const values = Object.values(chartData);
    toDisplay = cabinetItems.map((item, index) => {
      return { x: titles[index], y: values[index] };
    });
  }

  let finalChartData = toDisplay.map((item) => {
    let percentage = ((item.y / toDisplay.length) * 100).toFixed(0);
    return {
      label: `${percentage}%`,
      x: item.x,
      y: item.y,
      items: categorizedCabinetItems
        .filter((i) => i.category === item.x)
        .map((a) => a.items.map((b) => b.name)),
    };
  });

  console.log(finalChartData);
  finalChartData = finalChartData
    .filter((item) => item.label !== 'NaN%')
    .map((item) => (item.x === 'undefined' ? { ...item, x: 'other' } : item));

  function setSelectCategoryByType(name) {
    setSelectedCategory(name);
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text mt={5} mb={5} bold>
        Types of ingredients in the cabinet:
      </Text>
      <VictoryPie
        data={finalChartData}
        radius={({ datum }) =>
          selectedCategory && selectedCategory == datum.x
            ? width * 0.4
            : width * 0.4 - 10
        }
        innerRadius={70}
        /*         labels={(datum) => `${datum.x}`} */
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
          labels: { fill: 'white', fontSize: 18 },
          parent: {
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
          },
        }}
      />

      <View mt={8}></View>
      <FlatList
        data={finalChartData}
        renderItem={({ item, index }) => (
          <TouchableOpacity /* style={{ flexDirection: 'row', height: 40, paddingHorizontal: 150, borderRadius: 10, backgroundColor: 'gray'}} */
          >
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: colorScale[index],
                  borderRadius: 5,
                }}
              ></View>
              <Text bold>
                {' '}
                {item.x.charAt(0).toUpperCase() + item.x.slice(1)}
              </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Text>{item.items.join(' ')}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
