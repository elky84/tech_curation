export interface ArticleData {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    reviews: Review[];
    syllabus: string[];
    link: string;
    category: string;
}
  
export interface Review {
    id: number;
    comment: string;
    rating: number;
}