import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faMapMarkerAlt,
  faPencilAlt,
  faSave,
  faSyncAlt,
  faUserCircle,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import ListComments from "./ListComments";
import image from "../../assets/image/image.png";
import { convertTimeToJs, onInputChange } from "../shared/utils";
import { useMutation, useQueryClient } from "react-query";
import { updateRatingComment, createDataComment } from "../../api/apiComment";
import { changePostStatus, updatePostData } from "../../api/apiPost";

const ListReports = ({
  id,
  author,
  text,
  location,
  status,
  date,
  imageReport,
  initSession,
  dataComment,
  bool,
}) => {
  const queryCLient = useQueryClient();
  const [commentId, setCommentId] = useState(0);
  const [commentRating, setCommentRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [show, setShow] = useState(false);
  const [pict, setPict] = useState(null);
  const [file, setFile] = useState(null);
  const [listSelect, setListSelect] = useState({
    text: "",
    location: "",
  });
  const {
    status: commentStatusUpdate,
    error: commentErrorUpdate,
    mutate: handleUpdateRating,
  } = useMutation({
    mutationFn: async () =>
      await updateRatingComment(commentId, commentText, commentRating),
    onSuccess: () => {
      return queryCLient.invalidateQueries(["comments"]);
    },
  });
  const {
    status: commentStatusCreate,
    error: commentErrorCreate,
    mutate: handleAddComment,
  } = useMutation({
    mutationFn: async () =>
      await createDataComment(messageInput, 0, 1, "Admin"),
    onSuccess: () => {
      setMessageInput("");
      return queryCLient.invalidateQueries(["comments"]);
    },
  });
  const {
    status: postStatusUpdate,
    error: postStatusError,
    mutate: handleChangePostStatus,
  } = useMutation({
    mutationFn: async () => {
      const postStatus = status === "Waiting" ? "Finish" : "Waiting";
      await updatePostData("", "", "", "", postStatus, "", id);
    },
    onSuccess: (data) => {
      queryCLient.invalidateQueries(["posts"]);
    },
  });

  const selectGiveComment = (item) => {
    setCommentRating(item.rating);
    setCommentId(item.id);
    setCommentText(item.message);
  };

  const selectDescription = () => {
    setListSelect({
      text: text,
      location: location,
    });

    if (!show) setShow(true);
    else setShow(false);
  };

  // const enterUpdate = (e) => {
  //   e.preventDefault();

  //   if (file) {
  //     let formData = new FormData();

  //     formData.append("post_text_report", listSelect.post_text_report);
  //     formData.append("post_location", listSelect.post_location);
  //     formData.append("post_image", file);

  //     axios
  //       .put(
  //         process.env.REACT_APP_BACKEND_PORT + "/api/post/updateImage/" + id,
  //         formData
  //       )
  //       .then((res) => {
  //         setShow(false);
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     axios
  //       .put(process.env.REACT_APP_BACKEND_PORT + "/api/post/update/" + id, {
  //         post_text_report: listSelect.text,
  //         post_location: listSelect.location,
  //       })
  //       .then((res) => {
  //         setShow(false);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  return (
    <div className="wrap_item">
      <div className="row main_report">
        <div className="col-lg-6">
          {imageReport ? (
            <img
              className="image_report"
              src={`${process.env.REACT_APP_BACKEND_PORT}/public/uploads/${imageReport}`}
            />
          ) : (
            <img className="image_report" src={image} />
          )}
        </div>
        <div className="col-lg-6 mt-5">
          <div className="top_report">
            <h2>{author}</h2>
            <h2>{convertTimeToJs(date)}</h2>

            {initSession === author &&
              (show ? (
                <>
                  <FontAwesomeIcon
                    onClick={() => setShow(false)}
                    className="mt-2 ml-1 windowClose"
                    icon={faWindowClose}
                  />
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    onClick={() => selectDescription()}
                    className="mt-1 mr-2"
                    icon={faPencilAlt}
                  />
                </>
              ))}
          </div>

          {show ? (
            <>
              <textarea
                className="form-control mt-2 text_area_description"
                value={listSelect.text}
                onChange={(e) =>
                  onInputChange("text", e, listSelect, setListSelect)
                }
                rows="4"
                cols="50"
              />
              <input
                className="form-control mt-2 location_description"
                onChange={(e) =>
                  onInputChange("location", e, listSelect, setListSelect)
                }
                value={listSelect.location}
              />

              <button
                className="btn btn-danger save_description mt-2"
                // onClick={(e) => enterUpdate(e)}
              >
                <FontAwesomeIcon className="windowSave" icon={faSave} />
              </button>
            </>
          ) : (
            <>
              <div className="main_change">
                <p className="text_report mt-2">{text}</p>
                <div className="location_report">
                  <FontAwesomeIcon
                    className="icon_location "
                    icon={faMapMarkerAlt}
                  />
                  <p className="ml-5 text_location">{location}</p>
                </div>

                <div className="bar_status">
                  {initSession === "admin" &&
                    (status === "Waiting" ? (
                      <>
                        <div className="bar_status_belum">
                          <p className="ml-5 status_progress">{status}</p>
                        </div>

                        <FontAwesomeIcon
                          onClick={handleChangePostStatus}
                          className="ml-2 change_status"
                          icon={faSyncAlt}
                        />
                      </>
                    ) : (
                      <>
                        <div className="bar_status_sudah">
                          <p className="ml-5 status_progress">{status}</p>
                        </div>

                        <FontAwesomeIcon
                          onClick={handleChangePostStatus}
                          className="ml-2 change_status"
                          icon={faSyncAlt}
                        />
                      </>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {(dataComment || []).map((item) => {
        if (item.post_id == id) {
          return (
            <ListComments
              key={item.id}
              name={item.name}
              text={item.message}
              itemAll={item}
              initSession={initSession}
              star={() => selectGiveComment(item)}
              submit={handleUpdateRating}
              bool={bool}
              commentRating={(e) => setCommentRating(e)}
              commentValRating={commentRating}
            />
          );
        }
      })}

      {initSession === "admin" && (
        <div className="input-group">
          <hr />
          <span className="input-group-text bg-icon">
            <FontAwesomeIcon className="icon-left" icon={faUserCircle} />
          </span>
          <input
            type="text"
            className="form-control "
            placeholder="Send your message"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            className="btn btn-send"
            type="button"
            id="button-addon2"
            onClick={(e) => handleAddComment(e)}
          >
            <FontAwesomeIcon className="icon-btn" icon={faLocationArrow} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ListReports;
