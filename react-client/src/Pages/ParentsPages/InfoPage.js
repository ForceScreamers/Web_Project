import { Button, Card } from "react-bootstrap"
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import './InfoPageStuff/InfoPageStyles.css'
import Masonry from 'react-masonry-css'
import { useEffect } from "react"
import { useState } from "react"
import { ProvidersApiRequest } from "../../RequestHeadersToWebApi"

import utf8 from 'utf8'
import InfoPageSearchField from "./InfoPageStuff/InfoPageSearchField"

import Randoms from '../../Randoms'
import ArticleModal from "./InfoPageStuff/ArticleModal"
//TODO: Show all articles when clearing the search field
//! FIX: Games by topic won't show games if there are no games with that matching topic 


const breakpointColumnsObj = {
  default: 4,
  1500: 3,
  1000: 2,
  800: 1
};

const MIN_CARD_HEIGHT_PX = 250;

const DEFUALT_FILTER_VALUE = "";
const DEFUALT_TABLE_NAME = "all";

export default function InfoPage({ SetGamesSearchValue }) {

  const [articles, setArticles] = useState([]);
  const [selectedArticleInfo, setSelectedArticleInfo] = useState({});

  const [filterValue, setFilterValue] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [showArticleModal, setShowArticleModal] = useState(false);



  async function UpdateArticlesFromServerByFilter() {
    console.log("Hellio")

    let filterValues = {
      tableName: filterType,

      //  If the filter value is empty, set it to get all articles
      filterValue: filterValue === "" ? "all" : utf8.encode(filterValue),
    }


    ProvidersApiRequest("GET", "GetArticles", filterValues)
      .then((response) => {
        let responseData = JSON.parse(response.data);
        console.log(JSON.parse(response.data));
        let articlesWithHeight = GenerateArticlesWithCardHeights(responseData);
        setArticles(articlesWithHeight);
      })
  }

  function UpdateArticles() {
    UpdateArticlesFromServerByFilter();
  }

  useEffect(() => {
    UpdateArticlesFromServerByFilter();
  }, [])

  function UpdateFilterValue(event) {
    setFilterValue(event.target.value);
  }

  function UpdateFilterType(event) {
    setFilterType(event.target.value);
  }

  function GenerateArticlesWithCardHeights(articles) {
    let articlesWithCardHeights = [];

    //  For each article, generate a new property with a centain height
    for (let article of articles) {
      articlesWithCardHeights.push({ ...article, cardHeight: MIN_CARD_HEIGHT_PX + Randoms.GetRandomInt(0, 150) });
    }

    return articlesWithCardHeights
  }


  function OnArticleClick(articleInfo) {
    setSelectedArticleInfo(articleInfo);
    setShowArticleModal(true);
  }


  function CloseArticleModal() {
    setShowArticleModal(false);
  }

  function ClearSearch() {
    setFilterValue(DEFUALT_FILTER_VALUE);
    setFilterType(DEFUALT_TABLE_NAME);
  }

  return (
    <div>
      <ParentMainPage title='מידע ומאמרים'>

        <InfoPageSearchField
          UpdateFilterType={UpdateFilterType}
          UpdateFilterValue={UpdateFilterValue}
          FilterValue={filterValue}
          FilterType={filterType}
          ClearSearch={ClearSearch}
          UpdateArticles={UpdateArticles}
        />

        <Masonry className="info-container" breakpointCols={breakpointColumnsObj}>
          {
            articles.map((article, index) => {
              return (
                <Card key={index} onClick={() => OnArticleClick(article)} className="info-card" style={{ height: article.cardHeight, cursor: "pointer" }}>
                  <Card.Title>
                    <div style={{ marginTop: "20" }} className="d-flex flex-column align-items-center">
                      <label>{article.topic_name}</label>
                      <br />
                      <label>{article.article_title}</label>
                      <br />
                      <Button variant="link" style={{ padding: '0px' }}>{article.provider_full_name}</Button>
                    </div>
                  </Card.Title>
                </Card>
              )
            })
          }
        </Masonry>

        <ArticleModal
          SetGamesSearchValue={SetGamesSearchValue}
          ShowArticleModal={showArticleModal}
          CloseArticleModal={CloseArticleModal}

          Title={selectedArticleInfo.article_title}
          Content={selectedArticleInfo.article_content}
          ProviderName={selectedArticleInfo.provider_full_name}
          TopicTitle={selectedArticleInfo.topic_title}
          TopicId={selectedArticleInfo.topic_id}
        />
      </ParentMainPage>
    </div >
  )
}