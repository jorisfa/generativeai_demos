# Import necessary libraries and modules
import os  # For interacting with the operating system environment variables
import base64  # For encoding/decoding data in base64 format (likely used elsewhere in your project)
import vertexai  # Google Cloud's Vertex AI library for machine learning
from vertexai.generative_models import GenerativeModel, Part, FinishReason  # For working with generative AI models
import vertexai.preview.generative_models as generative_models  # For access to experimental features
from fastapi.responses import JSONResponse  # For creating JSON responses in a FastAPI application
import logging  # For logging errors and debugging information
from .utils import clean_json  # Custom function (likely from your project) to sanitize JSON output

# Asynchronous function to interact with the Gemini LLM (Large Language Model)
async def call_gemini(prompt: str, input_variables: dict[str, str] = None):
    """
    This function sends a prompt to the Gemini LLM (Large Language Model) 
    and returns the generated text response.

    Args:
        prompt (str): The text prompt to send to the model.
        input_variables (dict[str, str], optional): A dictionary of variables
            to replace placeholders in the prompt. Defaults to None.
    Returns:
        str: The generated text response from the model, or an error message.
    """
    
    # Initialize Vertex AI with project and region from environment variables
    vertexai.init(
        project=os.environ.get('PROJECT_ID'), 
        location=os.environ.get('REGION')
    )

    # Load the specified Gemini LLM model
    model = GenerativeModel(model_name=os.environ.get('LLM'))

    # Configure generation settings for the model (adjust as needed)
    generation_config = {
        "max_output_tokens": 8192,       # Maximum length of generated text (in tokens)
        "temperature": 1,              # Creativity/randomness (0 = deterministic, 1 = high creativity)
        "top_p": 0.95,                 # Controls diversity of generated text (0.1 = focused, 1 = diverse)
    }

    # Disable all safety filters (use with caution in production)
    safety_settings = {
        generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_NONE,
        generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_NONE,
        generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_NONE,
        generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_NONE,
    }

    # Format the prompt with input variables if provided
    prompt = prompt if input_variables is None else prompt.format(**input_variables)
    
    try:
        # Generate content from the LLM asynchronously 
        response = await model.generate_content_async(
            [prompt],                # List of prompts (here, just one)
            generation_config=generation_config, 
            safety_settings=safety_settings
        )
        # Return cleaned JSON response 
        return clean_json(response.text) 
    except Exception as e:
        # Log any errors that occur and return an error message
        logging.error(f"Error while generating content: {e}")
        return {"error": "error while generating content"}
