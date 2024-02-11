import React, { useState, useEffect } from "react";
import "../../Styles/Content.css";
import { Modal, message } from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  deleteQuestion,
  getText,
} from "../Redux/Slice/questionSlice";
import { Link } from "react-router-dom";

const Content = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const modalWidth = 147;
  const modalHeight = 100;

  const dispatch = useDispatch();

  const questions = useSelector((state) => state.question.data);
  const searchText = useSelector((state) => state.question.text);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

 
  const showModal = (event, id) => {
    const clickX = event.clientX;
    const clickY = event.clientY;
    const tableRect = event.currentTarget.getBoundingClientRect();
    const tableWidth = tableRect.width;
    const tableHeight = tableRect.height;
    const maxModalX = tableRect.left + tableWidth - modalWidth;
    const maxModalY = tableRect.top + tableHeight - modalHeight;
    const modalX = Math.min(clickX, maxModalX);
    const modalY = Math.min(clickY, maxModalY);

    setSelectedItemId(id);
    setModalPosition({ x: modalX, y: modalY });
    setModalVisible(true);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id));
    message
      .success("Deletion is Successful.")
      .then(() => {
        dispatch(fetchQuestions());
        setModalVisible(false);
      })
      .catch((error) => {
        message.success("Fail to Delete.");
        console.error("Error deleting item:", error);
      });
  };

  const renderStatusButton = (state) => {
    switch (state) {
      case "Publish":
        return <button className="active">Publish</button>;
      case "Draft":
        return <button className="pending">Draft</button>;
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
    <div className="content">
      <table>
        <thead>
          <tr>
            <th style={{ width: "30px" }}>#</th>
            <th
              style={{ width: "500px", cursor: "pointer" }}
              onClick={handleSort}
            >
              Question{" "}
              {sortOrder === "asc" ? (
                <span style={{ marginRight: "5px" }}>&#8593;</span>
              ) : (
                <span style={{ marginRight: "5px" }}>&#8595;</span>
              )}
            </th>
            <th style={{ width: "300px" }}>Category</th>
            <th style={{ width: "300px" }}>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item, index) => (
            <tr key={item.id} className="table-row">
              <td>{indexOfFirstRow + index + 1}</td>
              <td>{item.question}</td>
              <td>{item.category}</td>
              <td>{renderStatusButton(item.state)}</td>
              <td
                className="action"
                onClick={(event) => showModal(event, item.id)}
              >
                ...
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <div className="rows-per-page">
          <span>Rows per page:</span>
          <select onChange={handleRowsPerPageChange} value={rowsPerPage}>
            <option>5</option>
            <option>10</option>
            <option>100</option>
          </select>
        </div>
        <div>
          <span>{`1-${indexOfLastRow} of ${sortedRows.length}`}</span>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {"<"}
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
      <Modal
        visible={modalVisible}
        onCancel={hideModal}
        footer={null}
        style={{
          top: modalPosition.y,
          left: modalPosition.x,
          width: `${modalWidth}px`,
          height: `${modalHeight}px`,
        }}
        closeIcon={null}
        className="custom-modal"
      >
        <div style={{ marginBottom: "5px" }}>
          <Link
            to={`/view/${selectedItemId}`}
            style={{ color: "black", marginBottom: "580px" }}
          >
            <EyeOutlined style={{ marginRight: "5px" }} /> View
          </Link>
        </div>
        <div style={{ marginBottom: "5px" }}>
          <a href="/" className="action-link  " style={{ color: "black" }}>
            <CheckCircleOutlined style={{ marginRight: "5px" }} /> Deactivate
          </a>
        </div>
        <div>
          <a
            className="action-link"
            onClick={() => handleDelete(selectedItemId)}
            style={{ color: "black" }}
          >
            <DeleteOutlined style={{ marginRight: "5px" }} /> Delete
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default Content;
