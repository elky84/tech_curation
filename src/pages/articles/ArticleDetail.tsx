import { useParams } from 'react-router-dom';
import { ArticleData } from './types';
import ArticlesDatas from './articles.json';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();

  // 실제로는 이곳에서 API 호출이나 다른 방법을 통해 강의 데이터를 가져와야 합니다.
  // 여기서는 간단히 JSON 데이터에서 해당 ID의 강의를 찾아서 사용합니다.
  const articleData: ArticleData | undefined = ArticlesDatas.find((Article: ArticleData) => Article.id === parseInt(id || ""));

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', textAlign: 'center' }}>
        {articleData && (
          <>
            <h2>{articleData.title}</h2>
            <img src={articleData.imageUrl} alt={articleData.title} style={{ width: '100%', maxWidth: '100%', marginBottom: '20px' }} />
            <div style={{ textAlign: 'left' }}>
              <p>{articleData.description}</p>
            </div>
            <h3 style={{ textAlign: 'left' }}>Syllabus</h3>
            <ul style={{ textAlign: 'left' }}>
              {articleData.syllabus.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3 style={{ textAlign: 'left' }}>Reviews</h3>
            <ul style={{ textAlign: 'left' }}>
              {articleData.reviews.map((review, index) => (
                <li key={index}>
                  <strong>Comment:</strong> {review.comment}, <strong>Rating:</strong> {review.rating}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
