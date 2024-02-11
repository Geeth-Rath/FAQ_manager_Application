import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams hooks
import "../../Styles/Registration.css"; // Import CSS file
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestionById,
  updateQuestionById,
} from "../Redux/Slice/questionSlice";

const { Option } = Select;

const View = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const data = await dispatch(fetchQuestionById(id)).unwrap();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };
    fetchQuestionDetails();
  }, [dispatch, id]);

  const onFinish = (values) => {
    dispatch(updateQuestionById({ questionId: id, updatedData: values }))
      .unwrap()
      .then(() => {
        message.success("Updating is Successful.");
        console.log("Question updated successfully");
        window.location.reload();
        navigate("/content");
        window.location.reload();
      })
      .catch((error) => {
        message.success("Updating is Successful.");
        console.error("Error updating question:", error);
      });
  };

  const handleCancel = () => {
    window.location.reload();
    navigate("/content");
    window.location.reload();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h1>Update Question</h1>
        <Form
          name="basic"
          initialValues={{
            question: formData.question,
            category: formData.category,
            state: formData.state,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="question"
            rules={[
              {
                required: true,
                message: "Please input your question!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: "Please select a category!",
              },
            ]}
          >
            <Select
              placeholder="Select a category"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <Option value="IT">IT</Option>
              <Option value="Maths">Maths</Option>
              <Option value="Science">Science</Option>
              <Option value="Arts">Arts</Option>
              <Option value="Commerce">Commerce</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="state"
            rules={[
              {
                required: true,
                message: "Please select an state!",
              },
            ]}
          >
            <Select
              placeholder="Select an state"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <Option value="Draft">Draft</Option>
              <Option value="Publish">Publish</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div
              className="form-buttons"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="registration-btn"
                >
                  Update
                </Button>
              </div>

              <div>
                <Button
                  type="default"
                  onClick={handleCancel}
                  className="registration-btn"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default View;
