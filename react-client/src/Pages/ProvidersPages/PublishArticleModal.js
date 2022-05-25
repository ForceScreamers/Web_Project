import React, { useEffect, useState } from 'react'
import { Button, CloseButton, FormControl, FormSelect, FormText, Modal } from 'react-bootstrap';
import ProviderNavigationBar from '../../Components/ProvidersComponents/ProviderNavigationBar'
import { ProvidersApiRequest } from '../../RequestHeadersToWebApi';
import utf8 from 'utf8'
import ProviderMainPage from '../../ProviderMainPage';

import './ProviderPublishArticleStyles.css';

const ARTICLE_CONTENT_MAX_LENGTH = 1800;
const ARTICLE_MAX_LENGTH_SMALL = 30;

const MAX_ARTICLES = 10;

export default function PublishArticleModal({ LoadArticlesFromApi, ShowPublishArticleModal, ClosePublishArticleModal }) {

  const [articleTopics, setArticleTopics] = useState([""]);
  const [topicToUse, setTopicToUse] = useState("");

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [articleEmptyError, setArticleEmptyError] = useState("");
  const [noTopicSelectedError, setNoTopicSelectedError] = useState("");
  const [titleEmptyError, setTitleEmptyError] = useState("");


  //  Used for counting how many articles have been posted without leaving the page
  const [currentPublishes, setCurrentPublishes] = useState(0);

  useEffect(() => {
    LoadTopics();
    LoadSavedContent();

    //  Reset current publishes
    setCurrentPublishes(0);
  }, [])


  async function PublishArticle(articleData) {
    //  Increment current publishes count
    setCurrentPublishes((prevCurrentPublishes) => prevCurrentPublishes + 1);

    //  Publish
    ProvidersApiRequest("POST", "PostArticle", articleData);
  }

  async function PublishAndCloseModal(e) {
    e.preventDefault();

    let isArticleValid = ValidatePostArticleAndChangeErrorMessage() && IsArticleCountValid();

    if (isArticleValid) {
      let parsedTopicData = JSON.parse(topicToUse);

      let articleData = {
        providerId: JSON.parse(sessionStorage.getItem("Info")).Id,
        topicId: parsedTopicData.id,
        content: utf8.encode(content),
        title: utf8.encode(title),
      }

      PublishArticle(articleData);
      CloseAndResetStates();
      LoadArticlesFromApi();
    }
  }

  function ResetArticleStates() {
    setContent("");
    setTitle("");
    setTopicToUse("");
  }

  function CloseAndResetStates() {
    ClosePublishArticleModal();
    ResetArticleStates();
  }

  async function LoadTopics() {
    let response = await ProvidersApiRequest("GET", "GetAllTopics", null);
    let articleTopics = ExtractTopicsFromApiData(response.data.Topics);

    setArticleTopics(articleTopics);
  }


  function ExtractTopicsFromApiData(apiData) {
    let topics = [];
    for (let topicData of apiData) {
      //  Destructure topic object
      topics.push({
        title: topicData.topic_title,
        id: topicData.topic_id,
      });
    }
    return topics;
  }


  function IsArticleCountValid() {
    console.log(GetArticleCount())
    console.log("Current publuishes " + currentPublishes)
    return GetArticleCount() < MAX_ARTICLES && currentPublishes < MAX_ARTICLES;
  }


  function ValidatePostArticleAndChangeErrorMessage() {
    let isValid = true;//TODO: Shorten this function 

    if (title === "") {
      setTitleEmptyError("חסרה כותרת")
      isValid = false;
    }
    else {
      setTitleEmptyError("")
    }

    if (content === "") {
      setArticleEmptyError("המאמר ריק מתוכן")
      isValid = false;
    }
    else {
      setArticleEmptyError("")
    }

    if (topicToUse === "") {
      setNoTopicSelectedError("לא נבחר נושא")
      isValid = false;
    }
    else {
      setNoTopicSelectedError("")
    }

    return isValid;
  }



  function ChangeSelectedTopic(event) {
    setTopicToUse(event.target.value)
    console.log(event.target.value)
  }

  function SaveContentToLocalStorage(event) {
    // localStorage.setItem("content", JSON.stringify(event.target.value));
    setContent(event.target.value)
  }

  function LoadSavedContent() {
    // setContent(JSON.parse(localStorage.getItem("content")));
  }

  function GetArticleCount() {
    let articles = JSON.parse(sessionStorage.getItem("articles"));
    return articles.length;
  }


  return (
    <Modal show={ShowPublishArticleModal}>
      <Modal.Body>
        <div className="d-flex flex-column justify-content-start align-items-center ">

          <form onSubmit={PublishAndCloseModal}>

            <div className="d-flex flex-column justify-content-start align-items-center publish-article-container">



              <div>
                <CloseButton onClick={CloseAndResetStates} ></CloseButton>

                <div className='d-flex flex-row align-items-center'>
                  <label className="publish-article-field-label">שם המאמר</label>
                  <FormControl maxLength={ARTICLE_MAX_LENGTH_SMALL} className="publish-article-field" type="text" onChange={(event) => setTitle(event.target.value)} />
                </div>

                <label>{titleEmptyError}</label>

                <div className='d-flex flex-row align-items-center'>
                  <label className="publish-article-field-label">תחום המאמר</label>

                  <FormSelect onChange={ChangeSelectedTopic} className="publish-article-field">
                    <option hidden={true}>בחר</option>
                    {
                      articleTopics.map((topic, index) => {
                        return (
                          <option key={index} value={JSON.stringify(topic)} >{topic.title}</option>
                        )
                      })
                    }
                  </FormSelect>
                </div>
                <label>{noTopicSelectedError}</label>

                <div className='d-flex flex-column align-items-start'>
                  <label className="publish-article-field-label">תוכן</label>
                  <br />
                  <textarea maxLength={ARTICLE_CONTENT_MAX_LENGTH} className="publish-article-textarea" rows={10} cols={100} onChange={SaveContentToLocalStorage} />
                </div>
                <br />
                <label>{articleEmptyError}</label>
              </div>


              <Button type="submit" className="publish-article-button">פרסם</Button>
            </div>
          </form>

        </div>
      </Modal.Body>
    </Modal>
  )
}
