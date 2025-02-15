const fs = require('fs');
const axios = require('axios');
const RSSParser = require('rss-parser');
const parser = new RSSParser();
const path = require('path');

const jsonFilePath = path.join(__dirname, 'rss.json');
const feedsFilePath = path.join(__dirname, 'feeds.json');
const outputFilePath = path.join(__dirname, 'articles.json');

const feeds = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

const filterRecentPosts = (posts) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return posts.filter(post => new Date(post.isoDate) > oneWeekAgo)
                .map(post => {
                    const { 'content:encoded': _, 'content:encoded': __, ...filteredPost } = post;
                    return filteredPost;
                });
};

const fetchAndFilterFeeds = async () => {
    const results = [];

    for (const feed of feeds) {
        try {
            const response = await axios.get(feed.url);
            const feedData = await parser.parseString(response.data);

            const recentPosts = filterRecentPosts(feedData.items);
            results.push({
                name: feed.name,
                category: feed.category,
                posts: recentPosts
            });
        } catch (error) {
            console.error(`Error fetching ${feed.url}:`, error.message);
        }
    }

    return results;
};

const saveResultsToJson = (data) => {
    fs.writeFileSync(feedsFilePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Filtered feed data saved to ${feedsFilePath}`);
};

const generateArticlesJson = () => {
    try {
        const feedsData = JSON.parse(fs.readFileSync(feedsFilePath, 'utf-8'));
        let allPosts = [];

        feedsData.forEach(feed => {
            allPosts = allPosts.concat(feed.posts);
        });

        // 랜덤하게 15개 추출
        const selectedPosts = allPosts.sort(() => 0.5 - Math.random()).slice(0, 15).map((post, index) => ({
            id: index + 1,
            imageUrl: post.imageUrl || "", // 원본 데이터 유지
            title: post.title || "Untitled",
            description: post.contentSnippet || "No description available",
            reviews: post.reviews || [],
            syllabus: post.syllabus || [],
            link: post.link || "#",
            pubDate : post.pubDate || '',
            creator: post.creator || 'Unknown',
            categories: post.categories || []
        }));

        fs.writeFileSync(outputFilePath, JSON.stringify(selectedPosts, null, 2), 'utf-8');
        console.log(`Extracted articles saved to ${outputFilePath}`);
    } catch (error) {
        console.error('Error processing articles:', error);
    }
};

fetchAndFilterFeeds()
    .then(data => {
        saveResultsToJson(data);
        generateArticlesJson();
    })
    .catch(error => console.error('Error processing feeds:', error));
