// ReplyGenerator.tsx

import React, { useState } from 'react';      // Import React core and useState hook for managing component state
import LoadingIndicator from './LoadingIndicator'; // Import a component to show loading state
import Button from './Button';             // Import a custom button component
import { answerReview } from '@/app/reviews/analysis/actions'; // Import the function to generate a reply

// Define an interface for the component's props
interface ReplyGeneratorProps {
  review: string;                           // The original review to which the reply will be generated
}

// The main functional component for generating replies to reviews
const ReplyGenerator: React.FC<ReplyGeneratorProps> = ({ review }) => {
  const [answer, setAnswer] = useState<string>('');     // State to store the generated answer (starts as empty)
  const [isLoading, setIsLoading] = useState(false);  // State to track whether a reply is being generated (starts as false)

  // Function to handle changes in the textarea input (updates the answer state)
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value); 
  };

  // Function to handle the "Generate Reply" button click
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();         // Prevent default form submission behavior (e.g., page refresh)
    setIsLoading(true);         // Start the loading indicator
    const response = await answerReview(review); // Call the function to generate a reply (await the result)
    setIsLoading(false);        // Stop the loading indicator
    setAnswer(response);        // Update the textarea with the generated reply
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Button to trigger reply generation */}
      <Button onClick={handleSubmit} disabled={isLoading}> 
        Generate Reply 
      </Button>
      
      {/* Loading indicator, displayed when a reply is being generated */}
      {isLoading && <LoadingIndicator className="self-center" />} 

      {/* Textarea to display the generated reply */}
      <textarea
        className="border rounded p-2 w-full h-32"
        value={answer}
        onChange={handleChange}
        disabled={isLoading} // Disable editing while a reply is being generated
      />
    </div>
  );
};

export default ReplyGenerator;
