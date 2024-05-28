import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Article from './Article';
import ArticleDetail from './ArticleDetail';
import articlesData from './articles.json';
import { ArticleData } from './types';

const TabMenu = styled.ul`
  background-color: #121212;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-top: 10px;

  .submenu {
    display: flex;
    width: calc(100% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
    color: #4d7bf3;
  }

  .focused {
    background-color: #333333;
    color: #4d7bf3;
  }
`;

const ArticlesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #4d7bf3;
  }
`;

const menuArr = [
  { name: 'Product', path: "/articles?category=product" },
  { name: 'Programming', path: "/articles?category=programming" },
  { name: 'Career', path: "/articles?category=career" },
];

const Articles = () => {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState<number>(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') ?? "product";
    const currentIndex = menuArr.findIndex(item => item.path.includes(category));
    if (currentIndex !== -1) {
      setCurrentTab(currentIndex);
    }
  }, [location.search]);

  const hardCodedArticles: ArticleData[] = articlesData;

  const params = new URLSearchParams(location.search);
  const category = params.get('category') ?? "product";

  const filteredArticles = category 
    ? hardCodedArticles.filter(article => article.category === category)
    : hardCodedArticles;

  return (
    <>
      <TabMenu>
        {menuArr.map((el, index) => (
          <li
            key={index}
            className={index === currentTab ? "submenu focused" : "submenu"}
          >
            <StyledLink to={el.path}>{el.name}</StyledLink>
          </li>
        ))}
      </TabMenu>
      <Routes>
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
      <ArticlesContainer>
        {filteredArticles.map((article, index) => (
          <Article key={index} articleData={article} />
        ))}
      </ArticlesContainer>
    </>
  );
};

export default Articles;
