import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import About from './pages/about/About';
import Articles from './pages/articles/Articles';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Community from './pages/community/Community';
import Chat from './pages/chat/Chat';
import { CssBaseline } from '@mui/material';
import ArticleDetail from './pages/articles/ArticleDetail';
import { RssFeeds } from './pages/rss/RssFeeds';

const customTheme = createTheme({
  palette: {
    background: { default: "#121212" }, // 어두운 배경
    primary: { main: "#64B5F6" }, // 어두운 테마의 주요 색상
    text: { primary: "#ffffff" } // 텍스트 색상을 밝게 설정
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorInherit: {
          backgroundColor: "#121212", // 어두운 배경
          color: "#64B5F6", // 어두운 테마의 텍스트 색상
          boxShadow: "none",
          borderBottom: "1px solid #424242", // 어두운 테마의 분할선 색상
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
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <BrowserRouter basename='tech_curation'> 
      <Header/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/articles' element={<Articles />}></Route>
          <Route path='/article/:id' element={<ArticleDetail />}></Route> {/* ArticleDetail 컴포넌트 추가 */}
          <Route path='/chat' element={<Chat />}></Route>
          <Route path='/feeds' element={<RssFeeds />}></Route>
          <Route path='/community' element={<Community />}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
