import { useGetCabinetItemsQuery } from '../features/api/apiSlice';

/**
 * @param {String} cabinetID
 * @desc A function to get all items in a cabinet by cabinet id
 * @return list of items
 */
const getCabinetItems = (cabinetID) => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCabinetItemsQuery(cabinetID);

  return { items, isLoading, isSuccess, isError, error };
};

export default getCabinetItems;
