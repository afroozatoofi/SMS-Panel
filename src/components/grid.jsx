import React, { useState } from "react";
import { Table } from "reactstrap";
import Pagination from "react-js-pagination";
import useSortableData from "./useSortableData";
import _ from "lodash";
import "../css/grid.css";
import queryString from "query-string";

const Grid = ({
  data,
  rows,
  sort = true,
  filter = true,
  loading = false,
  props = null
}) => {
  const lov = props.lov ? true : false;
  const lovDoubleClick = props.lovDoubleClick;
  let config =
    !lov && props
      ? queryString.parse(props.location.search)
      : {
          page: 1,
          order: null,
          filters: []
        };

  const [currentPage, setCurrentPage] = useState(
    config.page ? parseInt(config.page) : 1
  );

  const [filters, setFilters] = useState(
    config.filters && config.filters.length
      ? JSON.parse(decodeURI(config.filters))
      : []
  );
  const [sortConfig, setSortConfig] = React.useState(
    config.order
      ? {
          key: config.order.split(",")[0],
          direction: config.order.split(",")[1]
        }
      : null
  );
  const pageSize = 5;
  let { columns, operations, doubleClick } = data;
  if (lov) {
    operations = [
      {
        name: "انتخاب",
        class: "btn-bpm",
        click: lovDoubleClick
      }
    ];
    doubleClick = null;
  }
  let records = rows && rows.length ? [...rows] : null;
  if (records && Object.keys(filters).length) {
    Object.keys(filters).map(k => {
      if (filters[k] !== undefined) {
        let column = columns.filter(c => c.name === k)[0];
        records = records.filter(r => {
          if (r[k] !== undefined && r[k] !== null) {
            switch (column.match) {
              case "equal":
                if (typeof r[k] === "string") {
                  return r[k] === filters[k];
                } else {
                  return r[k].toString() === filters[k];
                }
              case "start":
                if (typeof r[k] === "string") {
                  return r[k].startsWith(filters[k]);
                } else {
                  return r[k].startsWith(filters[k]);
                }
              case "end":
                if (typeof r[k] === "string") {
                  return r[k].endsWith(filters[k]);
                } else {
                  return r[k].toString().endsWith(filters[k]);
                }
              case "contain":
              default:
                if (typeof r[k] === "string") {
                  return r[k].includes(filters[k]);
                } else {
                  return r[k].toString().includes(filters[k]);
                }
            }
          }
          return false;
        });
      }
      return records;
    });
  }

  const setUrl = (page, order, filters) => {
    if (!props || !props.history) {
      return;
    }
    let url = "";
    if (page > 1) {
      url = append(url, "page=" + page);
    }
    if (filters && Object.keys(filters).length) {
      url = append(url, "filters=" + encodeURI(JSON.stringify(filters)));
    }
    if (order) {
      url = append(url, "order=" + order);
    }
    url = "?" + url;
    if (url === props.location.search) {
      return;
    }
    if (url === "?") {
      url = props.match.url;
    }
    props.history.push(url);
  };

  const append = (url, end) => {
    return url + (url.length > 0 ? "&" : "") + end;
  };

  const getSortDirection = key => {
    let direction = "desc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "desc"
    ) {
      direction = "asc";
    }
    return direction;
  };
  const requestSort = key => {
    let direction = getSortDirection(key);
    setSortConfig({ key, direction });
  };

  const total = records ? records.length : 0;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const items = useSortableData(records, sortConfig);

  const page_data = _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();

  const clearFilters = () => {
    setFilters([]);
    setUrl(
      currentPage,
      sortConfig ? sortConfig.key + "," + sortConfig.direction : null,
      []
    );
  };
  const clearFilter = name => {
    delete filters[name];
    setFilters({ ...filters, [name]: undefined });
    setUrl(currentPage, config.order, filters);
  };

  const updateFilter = e => {
    setCurrentPage(1);
    if (e.target.value) {
      let newFilters = {
        ...filters,
        [e.target.name]: e.target.value
      };
      setFilters(newFilters);
      setUrl(1, config.order, newFilters);
    } else {
      clearFilter(e.target.name);
    }
  };

  const updateNumberFilter = e => {
    setCurrentPage(1);

    if (e.target.value) {
      let newFilters = {
        ...filters,
        [e.target.name]: Number.parseInt(e.target.value)
      };
      setFilters(newFilters);
      setUrl(1, config.order, newFilters);
    } else {
      clearFilter(e.target.name);
    }
  };

  const updateBooleanFilter = e => {
    setCurrentPage(1);
    let v = Number.parseInt(e.target.value);
    if (v !== -1) {
      let newFilters = {
        ...filters,
        [e.target.name]: v
      };
      setFilters(newFilters);
      setUrl(1, config.order, newFilters);
    } else {
      clearFilter(e.target.name);
    }
  };

  const chooseSearchInput = column => {
    if (column.search === false) {
      return;
    }
    switch (column.type) {
      case "number":
        return (
          <input
            className={"form-control " + column.class}
            type="number"
            name={column.name}
            autoComplete="off"
            placeholder="Search"
            onChange={updateNumberFilter}
            value={filters[column.name] || ""}
          />
        );
      case "boolean":
        return (
          <select
            className={"form-control " + column.class}
            name={column.name}
            onChange={updateBooleanFilter}
            value={
              filters[column.name] != null && filters[column.name] !== -1
                ? filters[column.name]
                : -1
            }
          >
            <option value={-1}>Search</option>
            {!column.search && (
              <React.Fragment>
                <option value={0}>غیرفعال</option>
                <option value={1}>فعال</option>
              </React.Fragment>
            )}
            {column.search &&
              column.search.map(e => {
                return (
                  <option key={e.key} value={e.key}>
                    {e.value}
                  </option>
                );
              })}
          </select>
        );
      default:
        return (
          <input
            className={"form-control " + column.class}
            type="text"
            autoComplete="off"
            name={column.name}
            placeholder="Search"
            onChange={updateFilter}
            value={filters[column.name] || ""}
          />
        );
    }
  };

  return (
    <div className={lov ? "lov" : null}>
      <Table striped responsive hover>
        <thead>
          <tr>
            <th
              onClick={() => {
                if (sort) {
                  setSortConfig(null);
                  setUrl(currentPage, null, filters);
                }
              }}
              style={{ width: 25 }}
            ></th>
            {columns &&
              columns.map(h => {
                return (
                  <th
                    onClick={() => {
                      if (sort) {
                        requestSort(h.name);
                        let direction = getSortDirection(h.name);
                        setUrl(currentPage, h.name + "," + direction, filters);
                      }
                    }}
                    key={h.name}
                    style={{ width: h.width }}
                    className="unselectable"
                    unselectable="on"
                  >
                    {sort ? (
                      <i
                        className={
                          sortConfig !== null && sortConfig["key"] === h.name
                            ? "fa fa-sort-" + sortConfig["direction"] + " sort"
                            : "fa fa-sort"
                        }
                      ></i>
                    ) : null}
                    {h.label}
                  </th>
                );
              })}
            {operations && operations.length > 0 && (
              <th
                className="text-center unselectable"
                unselectable="on"
                style={{ width: operations.length * 80 }}
              >
                عملیات
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filter && (
            <tr className="filter">
              <th>
                <span
                  className="fa fa-trash-o"
                  onClick={() => clearFilters()}
                  style={{ cursor: "pointer" }}
                ></span>
              </th>
              {columns &&
                columns.map((h, i) => {
                  return (
                    <th className="search" key={i}>
                      {chooseSearchInput(h)}
                    </th>
                  );
                })}
              {operations && operations.length > 0 && <th></th>}
            </tr>
          )}
          {loading ? (
            <tr>
              <td
                className="grid-info"
                colSpan={columns ? columns.length + (operations ? 2 : 1) : 1}
              >
                Loading...
              </td>
            </tr>
          ) : page_data.length === 0 ? (
            <tr>
              <td
                className="grid-info"
                colSpan={columns ? columns.length + (operations ? 2 : 1) : 1}
              >
                no data found
              </td>
            </tr>
          ) : (
            page_data.map((r, i) => (
              <tr
                key={i}
                onDoubleClick={() =>
                  doubleClick ? doubleClick(r) : lovDoubleClick(r)
                }
              >
                <td data-name={"شناسه"}>
                  {(currentPage - 1) * pageSize + i + 1}
                </td>
                {columns.map((col, cc) => (
                  <td key={cc} data-name={col.label}>
                    {col.mapper !== undefined ? (
                      <div className={col.class}>{col.mapper(r[col.name])}</div>
                    ) : (
                      <div className={col.class}>{r[col.name]}</div>
                    )}
                  </td>
                ))}
                {operations && operations.length > 0 && (
                  <td data-name={"عملیات"} className="text-center">
                    <div className="btn-group">
                      {operations.map((op, k) => (
                        <button
                          key={k}
                          onClick={() => op.click(r)}
                          className={"btn " + op.class}
                        >
                          {op.name}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div style={{ padding: "5px 10px", lineHeight: "37px" }}>
        <Pagination
          activePage={currentPage}
          totalItemsCount={total}
          itemsCountPerPage={pageSize}
          onChange={page => {
            setCurrentPage(page);
            setUrl(page, config.order, filters);
          }}
          itemClass="page-item"
          linkClass="page-link"
          itemClassFirst="page-btn"
          itemClassLast="page-btn"
          itemClassNext="page-btn"
          itemClassPrev="page-btn"
          pageRangeDisplayed={5}
          prevPageText="Prev"
          nextPageText="Next"
          firstPageText="First"
          lastPageText="Last"
        /> 
        &nbsp;
        <span>
           showing {startIndex + 1} to {endIndex} from {total} record
        </span>
      </div>
    </div>
  );
};

export default Grid;
