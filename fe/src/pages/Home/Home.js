import React, { useEffect, useState } from "react";
import "../../assets/css/bootstrap.min.css";
import "bootstrap";
import logo from "../../assets/logo/jababeka_report_white.png";
import profile from "../../assets/logo/account.png";
import "../../assets/css/home.css";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import ListReports from "./ListReports";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { listDataComment } from "../../api/apiComment";
import { listPostData } from "../../api/apiPost";

const Home = () => {
  const navigate = useNavigate();
  const initSession = JSON.parse(localStorage.getItem("data")) || 0;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectCategory, setSelectCategory] = useState("Accident");
  const listCategory = [
    { id: 1, category: "Accident" },
    { id: 2, category: "Criminal" },
    { id: 3, category: "Environment" },
    { id: 4, category: "Infrastructure" },
  ];
  const {
    data: postsData,
    isLoading: postsDataLoading,
    error: postsDataError,
  } = useQuery(["posts", selectCategory], async () => {
    const response = await listPostData(
      selectCategory,
      initSession.username !== "admin" ? initSession.id : 0
    );

    let result = response.data.data;

    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(result.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(result.length / itemsPerPage));

    return result;
  });

  const {
    data: commentsData,
    isLoading: commentsLoading,
    error: commentsError,
  } = useQuery("comments", async () => {
    const response = await listDataComment();
    const result = response.data.data;

    return result;
  });

  useEffect(() => {
    if (Object.values(initSession).length == 0) {
      navigate("/login");
    }

    setCurrentItems(
      postsData?.filter((item) => item.post_category === selectCategory) || []
    );
  }, [itemOffset, itemsPerPage, selectCategory]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % postsData?.length;
    setItemOffset(newOffset);
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("data");
    navigate("/login");
  };

  return (
    <div className="container_home">
      {commentsLoading && postsDataLoading ? (
        <ClipLoader color={"#fa2626"} loading={"#F37A24"} size={50} />
      ) : (
        <div className="column">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <a className="mt-3">
                <img className="img_logo_home" src={logo} />
              </a>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mt-3">
                  <li className="nav-item account">
                    <div className="wrap_account">
                      <p className="name_profile mt-2 text-white">
                        {initSession.username}
                      </p>

                      <img className="img_profile " src={profile} />

                      <FontAwesomeIcon
                        onClick={() => handleLogout()}
                        className="logout text-white"
                        icon={faSignOutAlt}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="main">
            <section id="category">
              <div className="parents_category">
                {(listCategory || []).map((item) => {
                  if (item.category === selectCategory) {
                    return (
                      <button
                        onClick={() => setSelectCategory(item.category)}
                        className="item_category btn item_active"
                      >
                        {item.category}
                      </button>
                    );
                  } else {
                    return (
                      <button
                        onClick={() => setSelectCategory(item.category)}
                        className="item_category btn border border-danger text-danger"
                      >
                        {item.category}
                      </button>
                    );
                  }
                })}
              </div>
            </section>

            <section id="list_report">
              <div className="container_report">
                {(!currentItems || currentItems.length == 0) ? (
                  <p className="fw-bold mt-5">You don't have data</p>
                ) : null}

                {(currentItems || []).map((item) => {
                  if (selectCategory === item.category)
                    if (initSession.id === item.user_id) {
                      return (
                        <ListReports
                          key={item.id}
                          id={item.id}
                          author={item.author}
                          text={item.header}
                          location={item.location}
                          date={new Date(item.createdAt)}
                          status={item.status}
                          imageReport={item.image}
                          initSession={initSession.username}
                          dataComment={commentsData}
                        />
                      );
                    } else {
                      return (
                        <ListReports
                          key={item.id}
                          id={item.id}
                          author={item.author}
                          text={item.header}
                          location={item.location}
                          date={new Date(item.createdAt)}
                          status={item.status}
                          imageReport={item.image}
                          initSession={initSession.username}
                          dataComment={commentsData}
                        />
                      );
                    }
                })}
              </div>

              {currentItems?.length > 0 ? (
                <div className="row parent_paginate">
                  <div className="paginate">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="Next"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={2}
                      pageCount={pageCount}
                      previousLabel="Previous"
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
