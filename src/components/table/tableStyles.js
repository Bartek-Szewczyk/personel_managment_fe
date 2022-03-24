import styled from "styled-components";

export const Styles = styled.div`
  padding: 10px;

  table {
    border-spacing: 0;
    border: 4px solid #758bff;
    width: 100%;
    padding: 10px;
    border-radius: 5px;

    tr {
      th {
        position: relative;
        font-size: 20px;
        border-bottom: 3px solid #758bff;
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.6rem;
      border-bottom: 2px solid #758bff;
      text-align: center;

      :last-child {
        border-right: 0;
      }
    }
    tbody {
      tr:nth-child(2n -1) {
        background: rgba(233, 228, 247, 0.6);
      }
    }
  }
`;
