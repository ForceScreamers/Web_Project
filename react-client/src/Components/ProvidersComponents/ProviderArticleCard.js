import { Card, Image } from "react-bootstrap"

import editIcon from '../../website-images/provider-edit-article-icon.png';
import deleteIcon from '../../website-images/provider-delete-article-icon.png';
import articleImage from '../../website-images/provider-article-image.png';
// import Image from "react-bootstrap";
import '../../Pages/ProvidersPages/ProviderArticlesStyles.css'
import { ProvidersApiRequest } from "../../RequestHeadersToWebApi";


export default function ProviderArticleCard({ UpdateArticles, Title, ArticleId }) {

  function DeleteArticleFromApi(articleId) {
    console.log("Deleting article " + articleId)
    ProvidersApiRequest("POST", "DeleteArticle", { articleId: articleId })
      .then(() => {

        UpdateArticles()

      })
    // LoadArticlesFromApi();
  }

  return (
    <Card className="article-container">
      <div className="icons-container">
        <img alt="edit-article" className="article-icon" src={editIcon} width={80} />
        <br />
        <img onClick={() => DeleteArticleFromApi(ArticleId)} width={80} alt="delete-article" className="article-icon" src={deleteIcon} />
      </div>

      <div>
        <img alt="article" className="article-icon" src={articleImage} width={200} />

        <div className="d-flex justify-content-center article-title-container">
          <label className="article-title-label">{Title}</label>
        </div>
      </div>

    </Card>
  )
}