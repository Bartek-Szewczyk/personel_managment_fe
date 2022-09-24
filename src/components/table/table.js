import React, { useState } from "react";
import { Styles } from "./tableStyles.js";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";
import downIcon from "../../assets/downIcon.svg";
import upIcon from "../../assets/upIcon.svg";
import { matchSorter } from "match-sorter";
import "./table.scss";
import Modal from "../modal/modal.js";
import TableModal from "./tableModal/tableModal.js";
import Loader from "../loader/loader.js";
import MyEventsModal from "../../pages/myEvents/myEventsModal/myEventsModal.js";

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="searchSpan">
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Wyszukaj..."
        className="searchSpan__input"
      />
    </label>
  );
}
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data, reload, modalType }) {
  const [modal, setModal] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 10 },
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const handleClose = () => {
    setModal(false);
  };

  const handleOpen = () => {
    setModal(true);
  };
  return (
    <>
      <Loader loading={loading} />
      <Modal show={modal} handleClose={handleClose}>
        {modalType == "staff" ? (
          <TableModal
            data={currentUser}
            closeHandler={handleClose}
            reload={() => {
              reload();
            }}
            loading={setLoading}
          />
        ) : (
          <MyEventsModal
            data={currentUser}
            closeHandler={handleClose}
            reload={() => {
              reload();
            }}
          />
        )}
      </Modal>
      <Styles>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className="table__tr" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <img
                            src={downIcon}
                            alt="down icon"
                            className="tableIcon"
                          />
                        ) : (
                          <img
                            src={upIcon}
                            alt="up icon"
                            className="tableIcon"
                          />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={(e) => {
                    setCurrentUser(row.original);
                    handleOpen();
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <div className="pagination">
          <div>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>{" "}
            <span>
              Strona{" "}
              <strong>
                {pageIndex + 1} z {pageOptions.length}
              </strong>{" "}
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="selectRange"
            >
              {[2, 5, 10, 20, 30].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Pokaż {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Styles>
    </>
  );
}

export default Table;
