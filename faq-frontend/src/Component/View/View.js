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
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [state, setState] = useState("Draft");
  const [formdata, setFormdata] = useState({
    category: "",
    question: "",
    state: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const data = await dispatch(fetchQuestionById(id)).unwrap();
        setFormdata(data);
        console.log("fdff", data);
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };
    fetchQuestionDetails();
  }, [dispatch, id]);

  const onFinish = (value) => {
    value.preventDefault();
    console.log("onFinis ", formdata);
    dispatch(updateQuestionById({ questionId: id, updatedData: formdata }))
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

  return (
    <div className=" d-flex justify-content-center align-items-center pt-5 pb-5">
      <form class=" g-3 rounded shadow p-4" onSubmit={onFinish}>
        <h1>Update Question</h1>

        <div class="">
          <select
            class="form-select form-select-sm mb-3"
            aria-label="Default select example"
            value={formdata && formdata.category}
            name="category"
            onChange={onChange}
          >
            <option selected value="IT">
              IT
            </option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="Arts">Arts</option>
            <option value="Commerce">Commerce</option>
          </select>
        </div>
        <div>
          <textarea
            class="form-control mb-3"
            id="exampleFormControlTextarea1"
            aria-label="Default select example"
            rows="6"
            value={formdata && formdata.question}
            placeholder="enter your question"
            name="question"
            onChange={onChange}
          ></textarea>
        </div>

        <div>
          <select
            class="form-select form-select-sm mb-3"
            aria-label="Default select example"
            value={formdata && formdata.state}
            name="state"
            onChange={onChange}
          >
            <option value="Draft">Draft</option>
            <option value="Publish">Publish</option>
          </select>
        </div>

        <div class="d-flex justify-content-end gap-3">
          <button type="submit" class="btn btn-secondary ">
            Update
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            onClick={() => handleCancel("Draft")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default View;
