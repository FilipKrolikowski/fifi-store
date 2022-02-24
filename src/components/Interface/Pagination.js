import { range } from "lodash";
import React from "react";
import { Pagination as PaginationReact } from "react-bootstrap";
import "./Pagination.scss";

export const Pagination = ({ current, count, setPage }) => (
  <div className="d-flex justify-content-center pagination-container align-items-center">
    <PaginationReact>
      {range(count).map((i) => (
        <div key={i}>
          <PaginationReact.Item onClick={() => setPage(i)} active={i === current}>
            {i + 1}
          </PaginationReact.Item>
        </div>
      ))}
    </PaginationReact>
  </div>
);
