import React, { useMemo } from 'react';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import { StyleSheet } from 'react-native';

const DatePicker = ({ INITIAL_DATE, onDayPress, selected }) => {
  const getDate = (count) => {
    const date = new Date(INITIAL_DATE);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const marked = useMemo(() => {
    return {
      /*   [getDate(-1)]: {
          dotColor: 'red',
          marked: true
        }, */
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#891D47',
        selectedTextColor: '#FCF5EA',
      },
    };
  }, [selected]);

  return (
    <Calendar
      enableSwipeMonths
      current={INITIAL_DATE}
      style={styles.calendar}
      onDayPress={onDayPress}
      markedDates={marked}
      firstDay={1}
    />
  );
};

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  switchText: {
    margin: 10,
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  disabledText: {
    color: 'grey',
  },
  defaultText: {
    color: 'purple',
  },
  customCalendar: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  customDay: {
    textAlign: 'center',
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8,
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BBF2',
  },
});

export default DatePicker;
