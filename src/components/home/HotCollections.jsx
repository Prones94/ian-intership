import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HotCollections = () => {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
        setCollections(data)
      } catch (error) {
        console.error("Error fetching hot collections data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <p className="text-center">Loading...</p>
          ): (collections.map((collection, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt="NFT" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collection.authorImage} alt="Author" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                  <span>{collection.code}</span>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
