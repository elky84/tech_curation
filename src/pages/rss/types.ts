export interface Post {
    creator?: string;
    title: string;
    link: string;
    pubDate: string;
    'content:encodedSnippet'?: string;
    'dc:creator'?: string;
    comments?: string;
    content?: string;
    contentSnippet?: string;
    guid?: string;
    categories?: string[];
    isoDate?: string;
}
  
export interface RSSData {
    name: string;
    category: string;
    posts: Post[];
}
