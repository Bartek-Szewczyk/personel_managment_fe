import React from "react";
import { Styles } from "./tableStyles.js";
import { useTable, useSortBy } from "react-table";
import downIcon from "../../assets/downIcon.svg";
import upIcon from "../../assets/upIcon.svg";

import "./table.scss";

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );
  const firstPageRows = rows.slice(0, 20);
  return (
    <>
      <Styles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr className="table__tr" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
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
            {firstPageRows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
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
        <div>Wyświetlanie pierwszych 20 wierszy z {rows.length} wierszy</div>
      </Styles>
    </>
  );
}

export default Table;
