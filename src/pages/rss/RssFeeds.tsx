import React, { useState, useEffect, ChangeEvent } from 'react';
import { Post, RSSData } from './types';


const stripHtmlTagsAndImages = (html: string): string => {
    const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
    const contentWithoutImages = html.replace(markdownImageRegex, '');
    const doc = new DOMParser().parseFromString(contentWithoutImages, 'text/html');
    return doc.body.textContent || '';
};

const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};

const parseFirstMarkdownImage = (content: string): string | undefined => {
    const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
    const match = content.match(markdownImageRegex);
    return match ? match[1] : undefined;
};

export const RssFeeds: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  
    useEffect(() => {
      const fetchFeeds = async () => {
        try {
          const response = await fetch('/feeds.json');
          const data: RSSData[] = await response.json();
          const allPosts = data.flatMap(feed => feed.posts);
          setPosts(allPosts);
          setFilteredPosts(allPosts);
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
      <div style={{ padding: '20px' }}>
        <h1>기술트렌드 살펴보기</h1>
        <input
          type="text"
          placeholder="Search by title or creator..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
        />
        <div>
          {filteredPosts.map((post, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '10px' }}>
                <h2>
                <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: '#00BFFF' }}
                >
                    {post.title}
                </a>
                </h2>
                {post.creator && <p><strong>Creator:</strong> {post.creator}</p>}
                <p><strong>Published Date:</strong> {new Date(post.pubDate).toLocaleString()}</p>

                {post.content && (
                    <>
                        <p>{truncateText(stripHtmlTagsAndImages(post.content), 100)}</p>
                        <div>
                        {parseFirstMarkdownImage(post.content) && (
                            <img 
                            src={parseFirstMarkdownImage(post.content)} 
                            alt="First Markdown Image" 
                            style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }} 
                            />
                        )}
                        </div>
                    </>
                )}
            </div>
          ))}
        </div>
      </div>
    );
  };