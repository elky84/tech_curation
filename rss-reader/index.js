const fs = require('fs');
const axios = require('axios');
const RSSParser = require('rss-parser');
const parser = new RSSParser();
const path = require('path');

const jsonFilePath = path.join(__dirname, 'rss.json');
const feeds = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

const filterRecentPosts = (posts) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return posts.filter(post => new Date(post.isoDate) > oneWeekAgo);
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
    const outputFilePath = path.join(__dirname, 'feeds.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Filtered feed data saved to ${outputFilePath}`);
};

fetchAndFilterFeeds()
    .then(saveResultsToJson)
    .catch(error => console.error('Error processing feeds:', error));
