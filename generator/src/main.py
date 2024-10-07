from fastapi import FastAPI
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from schemas import ReviewAnalysisRequest, ReviewAnalysisResponse, ReviewAnswerResponse, InsightsRequest, ExtractionRequest
from utils.llm import call_gemini
import logging

load_dotenv()
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World!"}




@app.post("/reviews/analysis")
async def analyze_review(review: ReviewAnalysisRequest):
    prompt = """Analyze the following customer review and provide a structured sentiment analysis with the following details:

1. **Score:** A numerical score between -1 (extremely negative) and 1 (extremely positive), representing the overall sentiment of the review.
2. **Label:** A simple label classifying the sentiment as "Negative," "Neutral," or "Positive" based on the score.
3. **Explanation:** A concise explanation justifying the assigned score and label, highlighting key phrases or sentiments from the review.
4. **Positive Aspects (By Category):**
    * Extract specific positive aspects mentioned in the review. Group them by relevant categories if multiple positive aspects are mentioned (e.g., "Product," "Service," "Features").
    * For each positive aspect, provide direct quotes from the review that support the identified sentiment.
    * If there is no positive aspect, return an empty object {{}}
5. **Negative Aspects (By Category):**
    * Extract specific negative aspects mentioned in the review. Group them by relevant categories if multiple negative aspects are mentioned (e.g., "Product," "Service," "Features").
    * For each negative aspect, provide direct quotes from the review that support the identified sentiment.
    * If there is no negative aspect, return an empty array {{}}

Important: If a category (positive or negative) does not have any associated aspects, please exclude the category entirely from the output.

Ensure that the output adheres to the following JSON format:

```json
{{
  "score": 0.8,
  "label": "Positive",
  "explanation": "The review expresses high overall satisfaction, with praise for the product's design and functionality. However, concerns about price are noted.",
  "positive": {{
    "Product": [
      {{ "item": "Design", "quotes": ["Great product!", "Love the design."] }},
      {{ "item": "Ease of Use", "quotes": ["Easy to use."] }}
    ]
  }},
  "negative": {{}}
}}```

Review to analyze: {review}

JSON output: 
"""

    try:
      response = await call_gemini(prompt, input_variables={"review": review.review_text})  
      if "error" in response:
        return JSONResponse(status_code=500, content = response)
      return response
    
    except Exception as e:
      logging.error(f"Error while generating content: {e}")  # Log the error for debugging
      return JSONResponse(status_code=400, content={"error": "Error while generating content"})  




@app.post("/reviews/answer")
async def generate_answer(review: ReviewAnalysisRequest) -> ReviewAnswerResponse:
  prompt = """{review}

Analyze the above customer review. Craft a response that:

1. **Empathy First:**  Acknowledge the customer's feelings and experience. If they express frustration, disappointment, or even delight, directly address it. Use phrases that show you understand their perspective.

2. **Solution-Oriented:** Briefly summarize the issue/feedback they provided. If possible, offer a solution, suggestion, or next steps.  If the issue is complex, guide them towards the appropriate channels for assistance (customer service, FAQ, etc.).

3. **Appreciation:** Thank the customer for their feedback, whether it's positive or negative. Highlight how valuable their input is to your company's improvement.

4. **Tone:** Maintain a professional yet warm and friendly tone. Match the level of formality in the original review.

5. **Language:** The answer must be in the language of the customer review (e.g if the user is in French, reply in French).

Answer (in the language of the user): """
  try:
    response = await call_gemini(prompt, input_variables={"review": review.review_text})  
    print('generated answer: ', response)
    if "error" in response:
      return JSONResponse(status_code=500, content = response)

    return ReviewAnswerResponse(answer = response)
  
  except Exception as e:
    logging.error(f"Error while generating answer: {e}")  # Log the error for debugging
    return JSONResponse(status_code=400, content={"error": "Error while generating answer"})  

@app.post("/reviews/insights")
async def generate_suggestions(reviews: InsightsRequest) -> str:
  prompt = """Please anayze the following reviews:
  
{reviews}

Consider the following aspects when crafting your analysis and recommendations:
1. Summarize the reviews in maximum 2 sentences.
2. Give a list of actionable next steps.

Please present your analysis and next steps in a clear, concise format. Use bullet points or numbered lists for readability.
You must answer in the languages of the review (e.g if the reviews are in French, reply in French).

Analysis: """

  try:
    response = await call_gemini(prompt, input_variables={"reviews": "\n\n".join(reviews.reviews)})  
    print('generated analysis: ', response)
    if "error" in response:
      return JSONResponse(status_code=500, content = response)

    return response
  
  except Exception as e:
    logging.error(f"Error while generating suggestions: {e}")  # Log the error for debugging
    return JSONResponse(status_code=400, content={"error": "Error while generating suggestions"})  


# Health Check
@app.get("/health")
async def root():
    return "OK"