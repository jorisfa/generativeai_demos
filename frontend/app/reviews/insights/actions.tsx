'use server';

import { fetchFromBackend } from "@/lib/utils";


export const generateInsights = async (reviews: string[]) => {
    try {
      console.log('fetching', process.env.INSIGHTS_ENDPOINT as string)
      const response = await fetchFromBackend(process.env.INSIGHTS_ENDPOINT as string, 'POST', {reviews: reviews})
      return response
    } catch(e) {
      return {"error": "Issue while generating insights"}
    }
  }