import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArticleData } from './types';

const ArticleContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  transition: transform 0.2s ease-in-out, background-color 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;

const ArticleTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.palette.link.default};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.palette.link.hover};
  }
`;

const CategoryTag = styled.div`
  background-color: ${({ theme }) => theme.palette.category};
  color: black;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 12px;
  display: inline-block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const MetaInfo = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Creator = styled.span`
  color: ${({ theme }) => theme.palette.creator};
`;

const PubDate = styled.span`
  color: ${({ theme }) => theme.palette.pubDate};
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
        {articleData.categories && articleData.categories.map((item, index) => (
          <CategoryTag>{item}</CategoryTag>
        ))}
        <ArticleTitle>{articleData.title}</ArticleTitle>
        <MetaInfo>
          <Creator>🖊 {articleData.creator}</Creator>
          <PubDate>📅 {articleData.pubDate}</PubDate>
        </MetaInfo>
      </ArticleContainer>
    </StyledLink>
  );
};

export default Article;
