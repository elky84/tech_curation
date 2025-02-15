import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Article from './Article';
import { ArticleData } from './types';

const ArticlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Articles = () => {

  const [articles, setArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
      const fetchFeeds = async () => {
          try {
              const response = await fetch(`${process.env.PUBLIC_URL}/articles.json`);
              const datas: ArticleData[] = await response.json();

              setArticles(datas);
          } catch (error) {
              console.error('Error fetching the feeds:', error);
          }
      };

      fetchFeeds();
  }, []);


  return (
    <>
      <ArticlesContainer>
        {articles.map((article, index) => (
          <Article key={index} articleData={article} />
        ))}
      </ArticlesContainer>
    </>
  );
};

export default Articles;
