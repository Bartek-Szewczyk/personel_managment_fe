import styled from "styled-components";
import { color } from "../../theme/globalStyle";

export const Styles = styled.div`
  padding: 10px;

  table {
    border-spacing: 0;
    border: 4px solid ${color.primary};
    width: 100%;
    padding: 10px;
    border-radius: 5px;

    tr {
      th {
        position: relative;
        font-size: 20px;
        border-bottom: 3px solid ${color.primary};
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
      border-bottom: 2px solid ${color.primary};
      text-align: center;

      :last-child {
        border-right: 0;
      }
    }
    tbody {
      tr {
        cursor: pointer;
      }
      tr:nth-child(2n -1) {
        background: rgba(233, 228, 247, 0.6);
      }
    }
  }
`;
