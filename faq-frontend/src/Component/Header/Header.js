import React, { useState } from "react";
import { Button, Modal, Select, Input } from "antd";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { postQuestion, fetchQuestions } from "../Redux/Slice/questionSlice";
import "../../Styles/Header.css";

const { Option } = Select;

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [state, setState] = useState("Draft");
  const dispatch = useDispatch();

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSubmit = (currentState) => {
    setState(currentState);
    const data = {
      question: question,
      category: category,
      state: currentState,
    };

    dispatch(postQuestion(data))
      .then(() => {
        console.log("Question created successfully");
        handleCancel();
        dispatch(fetchQuestions());
      })
      .catch((error) => {
        console.error("Error creating question:", error);
      });
  };

  const isSubmitDisabled =
    category === "Select Category" || question.trim() === "";

  return (
    <div className="header-container">
      <div className="header-left">
        <span className="header-title">FAQ Manager - iLabs</span>
      </div>
      <div className="header-right">
        <Button
          type="default"
          className="add-button"
          icon={<PlusCircleTwoTone />}
          onClick={showModal}
        >
          Add New Questions
        </Button>
        <Modal
          title="Add New Questions"
          visible={modalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="draft" onClick={() => handleSubmit("Draft")}>
              Draft
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => handleSubmit("Publish")}
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>,
          ]}
        >
          <Select
            value={category}
            style={{ width: "100%", marginBottom: "10px" }}
            onChange={(value) => setCategory(value)}
          >
            <Option value="IT">IT</Option>
            <Option value="Maths">Maths</Option>
            <Option value="Science">Science</Option>
            <Option value="Arts">Arts</Option>
            <Option value="Commerce">Commerce</Option>
          </Select>
          <Input.TextArea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            rows={6}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Header;
