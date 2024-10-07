interface ReviewAspect{
    item: string;
    quotes: string[];
}

type ReviewCategory = ReviewAspect[] | [];

interface ReviewAnalysis{
    score: number;
    label: string;
    explanation: string;
    positive: Record<string, ReviewCategory> | {};
    negative: Record<string, ReviewCategory> | {};
}