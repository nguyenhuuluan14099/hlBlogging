import React from "react";
import styled from "styled-components";

const TableStyled = styled.table`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  width: 100%;
  overflow-x: auto;
  border-radius: 10px;
  table {
    width: 100%;
  }

  th,
  td {
    vertical-align: middle;
    white-space: nowrap;
  }
  th {
    padding: 20px 30px;
    font-weight: 600;
    text-align: left;
  }
  td {
    padding: 15px 30px;
  }
`;
const Table = ({ children }) => {
  return <TableStyled>{children}</TableStyled>;
};

export default Table;
