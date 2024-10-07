# Base Image - Use a slim Python image for efficiency
FROM python:3.9-slim

# Working directory - Sets the context for future commands
WORKDIR /app

# Install dependencies 
COPY requirements.txt requirements.txt 
RUN pip install -r requirements.txt

# Copy your application code
ADD src .

# Specify how to start the application (assuming 'main.py' and app variable 'app')
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
