import { Modal } from "react-bootstrap"
import { FormControl, CloseButton, FormSelect, Button } from "react-bootstrap";
import { useState } from "react";
import { ProvidersApiRequest } from "../../RequestHeadersToWebApi";
import { useEffect } from "react";
import utf8 from 'utf8';

const ARTICLE_CONTENT_MAX_LENGTH = 1800;
const ARTICLE_MAX_LENGTH_SMALL = 30;

export default function EditArticleModal({ LoadArticlesFromApi, ShowEditArticleModal, CloseEditArticleModal, ArticleName, ArticleContent, ArticleTopic, ArticleId }) {


  const [articleTopics, setArticleTopics] = useState([""]);
  const [topicToUse, setTopicToUse] = useState(ArticleTopic);

  const [content, setContent] = useState(ArticleContent);
  const [title, setTitle] = useState(() => Test());

  const [articleEmptyError, setArticleEmptyError] = useState();
  const [noTopicSelectedError, setNoTopicSelectedError] = useState("");
  const [titleEmptyError, setTitleEmptyError] = useState("");

  useEffect(() => {
    LoadTopics();

    ResetArticleStates();
  }, [ShowEditArticleModal])

  function Test() {

    // console.log("AAAAAAAAAAAAAAAAAAAAAAA")
    // console.log(ArticleName)
    return ArticleName;
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

  function UpdateAndCloseModal(e) {
    e.preventDefault();

    let articleValid = ValidatePostArticleAndChangeErrorMessage();
    console.log(articleValid)

    if (articleValid) {
      let articleNewData = {
        articleId: ArticleId,
        articleTitle: utf8.encode(title),
        articleContent: utf8.encode(content),
        articleTopic: utf8.encode(topicToUse)
      }

      UpdateArticle(articleNewData)
      CloseEditArticleModal();
    }
  }

  async function UpdateArticle(articleNewData) {
    await ProvidersApiRequest("POST", "UpdateArticle", articleNewData)
  }

  function CloseAndResetStates() {
    ResetArticleStates();
    CloseEditArticleModal();
  }

  function ResetArticleStates() {
    setContent(ArticleContent);
    setTitle(ArticleName);
    setTopicToUse("");

    // let topicForm = document.getElementById("selectTopicForm");
    // topicForm.value = ArticleTopic;
  }

  function ChangeSelectedTopic(event) {
    setTopicToUse(event.target.value)
    console.log(event.target.value)
  }


  function SaveContentToLocalStorage(event) {
    setContent(event.target.value)
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

  console.log(title)

  return (
    <Modal show={ShowEditArticleModal}>
      <Modal.Body>
        <div className="d-flex flex-column justify-content-start align-items-center ">

          <form onSubmit={UpdateAndCloseModal}>

            <div className="d-flex flex-column justify-content-start align-items-center publish-article-container">



              <div>
                <CloseButton onClick={CloseAndResetStates} ></CloseButton>

                <div className='d-flex flex-row align-items-center'>
                  <label className="publish-article-field-label">שם המאמר</label>
                  <FormControl maxLength={ARTICLE_MAX_LENGTH_SMALL} className="publish-article-field" type="text" defaultValue={title} onChange={(event) => setTitle(event.target.value)} />
                </div>

                <label>{titleEmptyError}</label>

                <div className='d-flex flex-row align-items-center'>
                  <label className="publish-article-field-label">תחום המאמר</label>

                  <FormSelect onChange={ChangeSelectedTopic} id="selectTopicForm" value={topicToUse} className="publish-article-field">
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
                  <textarea maxLength={ARTICLE_CONTENT_MAX_LENGTH} className="publish-article-textarea" defaultValue={content} rows={10} cols={100} onChange={SaveContentToLocalStorage} />
                </div>
                <br />
                <label>{articleEmptyError}</label>
              </div>


              <Button type="submit" className="publish-article-button">עדכן</Button>
            </div>
          </form>

        </div>
      </Modal.Body>
    </Modal>
  )
}
