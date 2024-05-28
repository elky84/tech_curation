import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArticleData } from './types';

const ArticleContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ArticleImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ArticleTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

interface ArticleProps {
  articleData: ArticleData;
}

const Article: React.FC<ArticleProps> = ({ articleData }) => {
  return (
    <StyledLink to={articleData.link}>
      <ArticleContainer>
        <ArticleImage src={articleData.imageUrl} alt={articleData.title} />
        <ArticleTitle>{articleData.title}</ArticleTitle>
      </ArticleContainer>
    </StyledLink>
  );
};

export default Article;
