import QnA from "./QnA.jpeg";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postQuestion, fetchQuestions } from "../Redux/Slice/questionSlice";
import "../../Styles/Header.css";

const Header = () => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [state, setState] = useState("Draft");
  const dispatch = useDispatch();

 

 

  const handleSubmit = (currentState) => {
    setState(currentState);
    console.log("question", question);
    console.log("category", category);
    const data = {
      question: question,
      category: category,
      state: currentState,
    };

    dispatch(postQuestion(data))
      .then(() => {
        console.log("1. uestion created successfully");
       
        dispatch(fetchQuestions());
        console.log("2. uestion created successfully");
      })
      .catch((error) => {
        console.error("3. Error creating question:", error);
      });
  };


  return (
    <div className="p-3">
      <div className="row align-items ">
        <div className="col d-flex gap-3 justify-content-center justify-content-md-start mb-3 ">
          <div className="header-image ">
            <img
              src={QnA}
              alt="QnA_head"
              id="QnA_head"
              className="mx-auto d-block "
              style={{ width: "40px" }}
            />
          </div>
          <div className="header-text d-flex align-items-center ">
            <span className="header-text fs-4  ">FAQ Manager</span>
          </div>
        </div>
        <div className="col-12 col-md-auto d-flex align-item-center justify-content-center justify-content-md-end mb-3">
          <div className="">
            <button
              type="button"
              class="btn btn-secondary add-button "
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle mx-1"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Add a New Question
            </button>
          </div>

          <div
            class="modal fade "
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Add New Questions
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <select
                    class="form-select form-select-sm mb-3"
                    aria-label="Default select example"
                    // value={category}
                    style={{ width: "100%", marginBottom: "10px" }}
                    onChange={(value) => setCategory(value.target.value)}
                  >
                    <option selected value="IT">
                      IT
                    </option>
                    <option value="Maths">Maths</option>
                    <option value="Science">Science</option>
                    <option value="Arts">Arts</option>
                    <option value="Commerce">Commerce</option>
                  </select>

                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    aria-label="Default select example"
                    rows="6"
                    // value={question}
                    placeholder="enter your question"
                    onChange={(e) => setQuestion(e.target.value)}
                  ></textarea>
                </div>

                <div class="modal-footer border-0">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => handleSubmit("Publish")}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => handleSubmit("Draft")}
                  >
                    Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
