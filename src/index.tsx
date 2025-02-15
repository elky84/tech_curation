import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {   
  HashRouter as Router,
  Routes, 
  Route 
} from 'react-router-dom';

import Home from './pages/home/Home';
import Articles from './pages/articles/Articles';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';
import { RssFeeds } from './pages/rss/RssFeeds';

export const customTheme = createTheme({
  palette: {
    background: {
      default: "#121212", // 전체 배경 (다크)
      paper: "#1e1e1e", // 카드 배경 (짙은 회색)
    },
    primary: {
      main: "#64B5F6", // 주요 색상 (파란색 계열)
    },
    secondary: {
      main: "#ff4081", // 보조 색상 (핑크)
    },
    text: {
      primary: "#ffffff", // 기본 텍스트 (흰색)
      secondary: "#bdbdbd", // 보조 텍스트 (회색)
    },
    action: {
      hover: "#2c2c2c", // 호버 시 배경
    },
    divider: "#424242", // 구분선
    link: {
      default: "#4db6ff", // 기본 링크 색상 (밝은 블루)
      hover: "#ff7043", // 호버 시 색상 (오렌지)
    },
    category: "#ffeb3b", // 카테고리 (골드)
    creator: "#ff8a65", // 작성자 (주황빛)
    pubDate: "#66bb6a", // 날짜 (연한 초록색)
    syllabusText: "#ffa726", // 강의 리스트 색상 (주황색)
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorInherit: {
          backgroundColor: "#121212", // 어두운 배경
          color: "#64B5F6", // 텍스트 색상
          boxShadow: "none",
          borderBottom: "1px solid #424242", // 구분선
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e", // 카드 배경
          color: "#e0e0e0", // 카드 텍스트
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)", // 그림자 효과
          borderRadius: "10px",
          transition: "transform 0.2s ease-in-out, background-color 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            backgroundColor: "#2c2c2c", // 호버 시 배경 변경
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: "#4db6ff", // 제목 강조
        },
        h2: {
          color: "#ff4081", // 보조 제목 강조
        },
      },
    },
  },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MuiThemeProvider theme={customTheme}>
      <StyledThemeProvider theme={customTheme}>
        <CssBaseline />
        <Router> 
        <Header/>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/articles' element={<Articles />}></Route>
            <Route path='/feeds' element={<RssFeeds />}></Route>
          </Routes>
          <Footer/>
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
