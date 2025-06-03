import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchExploreItems = async (filterValue = "") => {
    try {
      setLoading(true);
      const url = filterValue
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
        : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;
      const { data } = await axios.get(url);
      setItems(data);
      setVisibleCount(filterValue ? 8 : 8);
    } catch (err) {
      console.error("Error fetching explore items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExploreItems(filter);
  }, [filter]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  };

  const visibleItems = filter ? items.slice(0, 8) : items.slice(0, visibleCount);

  return (
    <>
      <div>
        <select id="filter-items" onChange={handleFilterChange} defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        visibleItems.map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip">
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>

              <CountdownTimer expiry={item.expiryDate} />

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                      <a href="#"><i className="fa fa-twitter fa-lg"></i></a>
                      <a href="#"><i className="fa fa-envelope fa-lg"></i></a>
                    </div>
                  </div>
                </div>
                <Link to="/item-details">
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {!filter && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
