import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faStar,
  faTrashAlt,
  faUserCircle,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { formulaRating } from "../shared/utils";
import { useMutation, useQueryClient } from "react-query";
import { deleteDataComment } from "../../api/apiComment";

const ListComments = ({
  name,
  text,
  itemAll,
  initSession,
  star,
  submit,
  commentRating,
  commentValRating,
}) => {
  const [show, setShow] = useState(false);
  const [commentText, setCommentText] = useState("");
  const queryCLient = useQueryClient();
  const {
    status: statusDeleteComment,
    error: errorDeleteComment,
    mutate,
  } = useMutation({
    mutationFn: async () => await deleteDataComment(itemAll.id),
    onSuccess: (newComments) => {
      queryCLient.setQueryData(["comments", newComments.id], newComments);
      return queryCLient.invalidateQueries(["comments"]);
    },
  });

  const selectComment = (item) => {
    setCommentText(item.comment_text);

    if (!show) setShow(true);
    else setShow(false);
  };

  return (
    <div className="top_comment">
      <hr />
      <div className="row">
        <div className="top_commentar">
          <div className="account_commentar">
            <FontAwesomeIcon className="icon-comment" icon={faUserCircle} />

            <p className="name_comment mt-3">
              <span className="name_text_comment">{name}</span>
              {formulaRating(itemAll.rating)}
            </p>

            {initSession === "admin" ? (
              show ? (
                <>
                  <FontAwesomeIcon
                    className="mt-1 text-danger trash_delete"
                    icon={faTrashAlt}
                    onClick={() => mutate()}
                  />

                  <FontAwesomeIcon
                    className="mt-1 mr-2 text-danger"
                    icon={faWindowClose}
                    onClick={() => setShow(false)}
                  />
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    className="mt-1 mr-2"
                    icon={faPencilAlt}
                    onClick={() => selectComment(itemAll)}
                  />
                </>
              )
            ) : (
              <>
                <FontAwesomeIcon
                  className="mt-1 mr-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  icon={faStar}
                  onClick={star}
                />
              </>
            )}
          </div>
        </div>

        {show === true ? (
          <input
            className="form-control edit_message"
            value={commentText}
            // onKeyDown={enterUpdate}
            onChange={(e) => setCommentText(e.target.value)}
          />
        ) : (
          <p className="text_commentar">{text}</p>
        )}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Give Rating
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group input_rating mr-2">
                <input
                  className="form-control "
                  type="text"
                  placeholder="Give ratings 1 - 100"
                  value={commentValRating}
                  onChange={(e) => commentRating(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn_modal"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn_modal"
                onClick={submit}
                data-bs-dismiss="modal"
              >
                Give
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListComments;
