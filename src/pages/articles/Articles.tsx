import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

const Articles = ({ isHome = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<number>(0);

  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>(articlesData);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') ?? "product";
    const currentIndex = menuArr.findIndex(item => item.path.includes(category));
    if (currentIndex !== -1) {
      setCurrentTab(currentIndex);
    }

    const filtered = articlesData.filter(article => article.category === category);
    setFilteredArticles(filtered);
  }, [location.search, isHome]);

  const handleTabClick = (index: number) => {
    const category = menuArr[index].path.split('=')[1];
    if (isHome) {
      setCurrentTab(index);
      const filtered = articlesData.filter(article => article.category === category);
      setFilteredArticles(filtered);
    } else {
      navigate(menuArr[index].path);
    }
  };

  return (
    <>
      <TabMenu>
        {menuArr.map((el, index) => (
          <li
            key={index}
            className={index === currentTab ? "submenu focused" : "submenu"}
            onClick={() => handleTabClick(index)}
          >
            <StyledLink to={isHome ? "#" : el.path}>{el.name}</StyledLink>
          </li>
        ))}
      </TabMenu>
      {!isHome && (
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      )}
      <ArticlesContainer>
        {filteredArticles.map((article, index) => (
          <Article key={index} articleData={article} />
        ))}
      </ArticlesContainer>
    </>
  );
};

export default Articles;
