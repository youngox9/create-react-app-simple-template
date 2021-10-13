import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, InputGroup, FormControl, Nav, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DataGrid from "react-data-grid";
import axios from "@/utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "@vlsergey/react-bootstrap-pagination";

const DEFAULT_PAGE_CONFIG = {
  sortBy: "",
  pageNo: 1,
  pageSize: 15,
  totalCounts: 0,
  keyword: "",
};

function getSortedObj(text) {
  const key = text.replace(/[+-]/g, "");
  let order = "";

  if (text.indexOf("+") > -1) {
    order = "+";
  } else if (text.indexOf("-") > -1) {
    order = "-";
  }

  return { key, order };
}

function Table(props) {
  const {
    selected = [],
    rows = [],
    columns = [],
    onChange = () => {},
    params: propsParams = DEFAULT_PAGE_CONFIG,
    selectable = true,
    children,
    onSelectedChange = () => {},
  } = props;

  const [keyword, setKeyword] = useState("");
  const [params, setParams] = useState(propsParams);

  const {
    pageCounts = 0,
    pageNo = 0,
    totalCounts = 0,
    totalPages = 0,
    pageSize = 0,
  } = params;
  const { key: sortKey, order: sortOrder } = getSortedObj(params?.sortBy || "");

  const isSelectedAll = selected.length === rows.length;
  const isIndeterminate = !!(!isSelectedAll && selected.length > 0);

  useEffect(() => {
    if (propsParams) {
      setParams(propsParams);
    }
  }, [JSON.stringify(propsParams)]);

  useEffect(() => {
    onChange({ ...params, keyword });
  }, [JSON.stringify(params || {})]);

  function onSort(key) {
    let sortBy = key;
    if (sortOrder === "") {
      sortBy += "+";
    } else if (sortOrder === "+") {
      sortBy += "-";
    } else if (sortOrder === "-") {
      sortBy += "";
    }

    setParams({ ...params, sortBy });
  }

  function onSelected(id) {
    let newSelected = [...selected];
    const isSelected = !!selected.includes(id);
    if (isSelected) {
      newSelected = newSelected.filter((obj) => obj.id === id);
    } else {
      newSelected = [...newSelected, id];
    }
    onSelectedChange(newSelected);
  }

  function onSelectedAll(id) {
    if (isSelectedAll) {
      onSelectedChange([]);
    } else {
      onSelectedChange(rows.map((obj) => obj.id));
    }
  }

  const selectColumn = {
    key: "select",
    name: "",
    width: 32,
    resizable: false,
    headerRenderer: (props) => {
      return (
        <div className="select-column">
          <Form.Check
            type="checkbox"
            checked={isSelectedAll}
            indeterminate={isIndeterminate}
            onChange={() => onSelectedAll()}
          />
        </div>
      );
    },
    formatter(props) {
      const {
        row: { id },
      } = props;
      const isSelected = !!selected.includes(id);
      return (
        <div className="select-column">
          <Form.Check
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelected(id)}
          />
        </div>
      );
    },
  };

  const sortableColumns = [
    ...(selectable ? [selectColumn] : []),
    ...columns.map((obj) => {
      const { sortable = true, headerRenderer } = obj;

      if (sortable) {
        return {
          ...obj,
          headerRenderer: (props) => {
            const {
              column: { name, key },
            } = props;

            const icon = () => {
              if (sortKey === key) {
                if (sortOrder === "+") {
                  return "sort-up";
                } else if (sortOrder === "-") {
                  return "sort-down";
                }
              }
              return "sort";
            };

            const iconText = icon();

            const isSorted = sortKey === key && !!sortOrder;
            return (
              <>
                <span>{name}</span>
                <button
                  className={`sort-button ${isSorted ? "active" : ""}`}
                  onClick={() => onSort(key)}
                >
                  <FontAwesomeIcon icon={["fa", iconText]} />
                </button>
              </>
            );
          },
        };
      }
      return obj;
    }),
  ];

  function onPageChange(pageNo) {
    setParams({ ...params, pageNo });
    onSelectedChange([]);
  }

  function onPageSizeChange(val) {
    setParams({ ...params, pageSize: val });
    onSelectedChange([]);
  }

  function update() {
    onChange({ ...params, keyword });
    onSelectedChange([]);
  }
  return (
    <>
      <div className="table-control">
        <div className="">{children}</div>
        <InputGroup size="sm" style={{ width: 350 }}>
          <FormControl
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button variant="primary" onClick={update}>
            <i class="fas fa-search"></i>
          </Button>
        </InputGroup>
      </div>
      <DataGrid
        {...props}
        className="rdg-light"
        columns={sortableColumns}
        rows={rows}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        // enableCellSelect={true}
      />
      <div className="pagination-container">
        <p>Total: {totalCounts} / Show </p>
        <Form.Select
          size="sm"
          value={pageSize}
          onChange={(e) => onPageSizeChange(e.target.value)}
        >
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </Form.Select>
        <p>Items per page</p>
        <div className="pagination-wrap">
          <Pagination
            showFirstLast={totalPages >= 10}
            // showPrevNext={totalPages >= 10}
            value={pageNo - 1}
            totalPages={totalPages}
            size="sm"
            onChange={(e) => {
              const pageIndex = e.target.value + 1;
              onPageChange(pageIndex);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default connect()(Table);
