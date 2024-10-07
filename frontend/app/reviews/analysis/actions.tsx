'use server';

import { fetchFromBackend } from "@/lib/utils"


export const analyzeReview = async (review: string) => {
    try {
      console.log('fetching', process.env.ANALYSIS_ENDPOINT as string)
      const response = await fetchFromBackend(process.env.ANALYSIS_ENDPOINT as string, 'POST', {review_text: review})
      console.log(response)
      return JSON.parse(response)
    } catch(e) {
      console.error(e)
    }
  }

export const answerReview = async (review: string) => {
    try {
      console.log('fetching', process.env.ANSWER_ENDPOINT as string)
      const response = await fetchFromBackend(process.env.ANSWER_ENDPOINT as string, 'POST', {review_text: review})
      return response.answer
    } catch(e) {
      console.error(e)
    }
  }