import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Post, RSSData } from './types';

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: 20px;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.palette.primary.main}; 
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 5px;
  background: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.primary};
`;

const PostContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.divider};
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  transition: transform 0.2s ease-in-out, background-color 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;

const PostTitle = styled.h2`
  a {
    color: ${({ theme }) => theme.palette.link.default};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.palette.link.hover};
    }
  }
`;

const Category = styled.span`
  color: ${({ theme }) => theme.palette.category};
  font-weight: bold;
`;

const Creator = styled.span`
  color: ${({ theme }) => theme.palette.creator};
  font-weight: bold;
`;

const PubDate = styled.span`
  color: ${({ theme }) => theme.palette.pubDate};
  font-weight: bold;
`;

export const RssFeeds: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/feeds.json`);
        const data: RSSData[] = await response.json();
        const allPosts = data.flatMap(feed => feed.posts);
        const sortedPosts = allPosts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching the feeds:', error);
      }
    };

    fetchFeeds();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.creator && post.creator.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, posts]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <Title>기술트렌드 살펴보기</Title>
      <SearchInput
        type="text"
        placeholder="Search by title or creator..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        {filteredPosts.map((post, index) => (
          <PostContainer key={index}>
            <PostTitle>
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
            </PostTitle>
            {post.categories && <p><Category>📌 Categories:</Category> {post.categories.join(', ')}</p>}
            {post.creator && <p><Creator>🖊 Creator:</Creator> {post.creator}</p>}
            <p><PubDate>📅 Published Date:</PubDate> {new Date(post.pubDate).toLocaleString()}</p>
          </PostContainer>
        ))}
      </div>
    </Container>
  );
};
