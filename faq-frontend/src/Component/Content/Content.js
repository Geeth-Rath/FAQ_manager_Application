import React, { useState, useEffect } from "react";
import "../../Styles/Content.css";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, deleteQuestion } from "../Redux/Slice/questionSlice";
import { Link } from "react-router-dom";

const Content = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");

  const dispatch = useDispatch();

  const questions = useSelector((state) => state.question.data);
  const searchText = useSelector((state) => state.question.text);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const handleDelete = (id) => {
    const confirm = window.confirm("do you need to delete?");
    if (confirm) {
      dispatch(deleteQuestion(id));
      message
        .success("Deletion is Successful.")
        .then(() => {
          dispatch(fetchQuestions());
          window.location.reload();
        })

        .catch((error) => {
          message.success("Fail to Delete.");
          console.error("Error deleting item:", error);
        });
    }
  };

  const renderStatusButton = (state) => {
    switch (state) {
      case "Publish":
        return (
          <button ttype="button" class="btn btn-success btn-sm">
            Publish
          </button>
        );
      case "Draft":
        return (
          <button type="button" class="btn btn-secondary btn-sm">
            Draft
          </button>
        );
      default:
        return null;
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, sortOrder]);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedRowsCopy = [...questions];
  sortedRowsCopy.sort((a, b) => {
    const questionA = a.question.toLowerCase();
    const questionB = b.question.toLowerCase();
    if (questionA < questionB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (questionA > questionB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const sortedRows = searchText
    ? sortedRowsCopy.filter((item) =>
        item.question.toLowerCase().includes(searchText.toLowerCase())
      )
    : sortedRowsCopy;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

  return (
    <div className="content mt-3">
      <div class=" d-none d-md-block ">
        <table class="table table-responsive">
          <thead>
            <tr>
              <th className="col-auto">#</th>
              <th
                className="col-auto"
                style={{ cursor: "pointer" }}
                onClick={handleSort}
              >
                Question{" "}
                {sortOrder === "asc" ? (
                  <span style={{ marginRight: "5px" }}>&#8593;</span>
                ) : (
                  <span style={{ marginRight: "5px" }}>&#8595;</span>
                )}
              </th>
              <th className="col-auto">Category</th>
              <th className="col-auto">Status</th>
              <th className="d-flex justify-content-center">Action</th>
            </tr>
          </thead>
          <tbody className="p-1">
            {currentRows.map((item, index) => (
              <tr key={item.id} className="table-row text-muted">
                <td>{indexOfFirstRow + index + 1}</td>
                <td>{item.question}</td>
                <td>{item.category}</td>
                <td>{renderStatusButton(item.state)}</td>
                <td>
                  <div class="dropdown">
                    <div
                      class=" d-flex align-items-center justify-content-center dropdown-toggle custom-dropdown-toggle cursor"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </div>
                    <ul class="dropdown-menu">
                      <li className="d-flex align-items-center">
                        {" "}
                        <Link class="dropdown-item" to={`/view/${item.id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-eye mx-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                          </svg>
                          View
                        </Link>
                      </li>
                      <li className="d-flex align-items-center">
                        <a class="dropdown-item " href="/">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-check-circle mx-2 "
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                          </svg>
                          Deactivate
                        </a>
                      </li>
                      <li className="d-flex align-items-center">
                        <a
                          class="dropdown-item cursor"
                          onClick={() => handleDelete(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3 mx-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div class="  d-md-none ">
        <table class="table table-responsive">
          <tbody className="p-1">
            {currentRows.map((item, index) => (
              <tr key={item.id} className="table-row ">
                <td className="">
                  <div className="col-10 ">
                    {" "}
                    <div className="row p-1 d-flex">
                      <div className="col-2 ">
                        {indexOfFirstRow + index + 1}.
                      </div>
                      <div className="col-10">
                        <div className="row text-break"> {item.question}</div>
                        <div className="row">
                          {" "}
                          <div className="p-1">{item.category}</div>
                        </div>
                        <div className="row">
                          {" "}
                          <div className="p-1">
                            {renderStatusButton(item.state)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="dropdown">
                    <div
                      class=" d-flex align-items-center justify-content-center dropdown-toggle custom-dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </div>
                    <ul class="dropdown-menu">
                      <li className="d-flex align-items-center">
                        {" "}
                        <Link class="dropdown-item" to={`/view/${item.id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-eye mx-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                          </svg>
                          View
                        </Link>
                      </li>
                      <li className="d-flex align-items-center">
                        <a class="dropdown-item" href="/">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-check-circle mx-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                          </svg>
                          Deactivate
                        </a>
                      </li>
                      <li className="d-flex align-items-center">
                        <a
                          class="dropdown-item cursor"
                          onClick={() => handleDelete(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3 mx-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="row d-flex justify-content-end align-items-center"
        style={{ fontSize: "14px" }}
      >
        <div className="col-auto ">
          {" "}
          <span className="px-2 ">Rows per page :</span>
          <select
            class="form-select-sm border-0 bg-color"
            aria-label="Small select example"
            onChange={handleRowsPerPageChange}
            value={rowsPerPage}
          >
            <option selected>5</option>
            <option>10</option>
            <option>100</option>
          </select>
        </div>
        <div className="col-auto">
          {" "}
          <span>{`1-${indexOfLastRow} of ${sortedRows.length}`}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-left mx-2 cursor"
            viewBox="0 0 16 16"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-right cursor"
            viewBox="0 0 16 16"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Content;
