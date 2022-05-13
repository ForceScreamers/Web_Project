import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import ProviderNavigationBar from '../../Components/ProvidersComponents/ProviderNavigationBar';
import { ProvidersApiRequest } from '../../RequestHeadersToWebApi'
import ProviderArticleCard from '../../Components/ProvidersComponents/ProviderArticleCard';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Masonry from 'react-masonry-css'


import './ProviderArticlesStyles.css'

import addArticleIcon from '../../website-images/provider-add-article-icon.png'


const breakpointColumnsObj = {
  default: 4,
  1900: 3,
  1500: 2,
  1000: 1
};

export default function ProviderArticles({ LoadArticlesFromApi }) {
  const [articles, setArticles] = useState([]);

  const history = useHistory();


  function UpdateArticles() {
    console.log("E")
    LoadArticlesFromApi().then(() => {
      setArticles(JSON.parse(sessionStorage.getItem("articles")))
      console.log(JSON.parse(sessionStorage.getItem("articles")))
      console.log(articles)
    })
    // ;
  }

  useEffect(() => {
    UpdateArticles();
  }, [])

  return (
    <div>
      <ProviderNavigationBar />
      <div className="d-flex justify-content-center">
        <Masonry className="provider-articles-grid-container" breakpointCols={breakpointColumnsObj}>
          {
            articles.map((article, index) => {
              return (
                <ProviderArticleCard
                  UpdateArticles={UpdateArticles}
                  Title={article.article_title}
                  ArticleId={article.article_id}
                />
              )
            })
          }

          <div className="d-flex justify-content-center align-items-center">
            <img onClick={() => history.push("/Provider/PublishArticle")} alt="add-article" className="add-article-image" src={addArticleIcon} width={110} />
          </div>
        </Masonry>
      </div>
    </div >
  )
}



