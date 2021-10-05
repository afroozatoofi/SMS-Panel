import React from "react";

const useSortableData = (items, sortConfig) => {
  const sortedItems = React.useMemo(() => {
    let sortableItems = items && items.length > 0 ? [...items] : [];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (
          a[sortConfig.key] === null ||
          a[sortConfig.key] < b[sortConfig.key]
        ) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (
          b[sortConfig.key] === null ||
          a[sortConfig.key] > b[sortConfig.key]
        ) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  return sortedItems;
};

export default useSortableData;
