'use client'; // Indicates this component is optimized for client-side rendering

// ReplyEditor.tsx (Simplified with Comments)

import React, { useState } from 'react'; // Import React core and useState hook for managing component state
import TextField from './TextField'; // Import custom TextField component (assumed to be an input field)
import Button from './Button';     // Import custom Button component
import Card from './CardBlock';         // Import custom Card component (assumed for display/layout)
import ScoreCard from './ScoreCard'; // Import custom ScoreCard component (likely to show a score/rating)
import AspectList from './AspectList'; // Import custom AspectList component (probably displays a list of positive/negative aspects)
import { analyzeReview } from '../../app/reviews/analysis/actions'; // Import the review analysis function
import LoadingIndicator from './LoadingIndicator'; // Import a component to show loading state

// Define an interface for the component's props (properties)
interface ReviewAnalyzerProps {
  review: string;                 // The review text to be analyzed
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional function to handle changes in the TextField
  handleSubmit?: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void; // Optional function to handle form submission
  className?: string;           // Optional CSS class name for styling the component
}

// The main functional component, which will analyze a review and display results
const ReviewAnalyzer: React.FC<ReviewAnalyzerProps> = ({ review, handleChange, className }) => {
  const [ analysis, setAnalysis ] = useState<ReviewAnalysis>() // State to store the analysis results (starts as undefined)
  const [ isLoading, setIsLoading ] = useState<boolean>(false); // State to track whether analysis is in progress (starts as false)

  // Function to handle the submission of the review for analysis
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();       // Prevent default form submission behavior (page refresh)
    setIsLoading(true);       // Start the loading indicator
    const response = await analyzeReview(review); // Call the review analysis function and wait for the results
    setIsLoading(false);      // Stop the loading indicator
    setAnalysis(response);    // Update the state with the analysis results
  };

  return (
    <div className='w-full flex flex-col gap-y-6'> {/* Container for the form and results, using flexbox for layout */}

      {/* // Form */}
      <form className="flex gap-2" onSubmit={handleSubmit}> {/* Form for entering the review text */}
        <TextField value={review} onChange={handleChange} placeholder="Enter the review here..."/>  {/* Input field for the review */}
        <Button onClick={handleSubmit} disabled>Analyze</Button> {/* Button to trigger the analysis */}
      </form>

      {/* Results */}

      {isLoading && <LoadingIndicator className='self-center'/>} {/* Show loading indicator if analysis is in progress */}

      {analysis && ( 
        <>
          <div className="grid grid-cols-3 gap-4"> {/* Grid layout for scorecard and explanation card */}
            <ScoreCard score={analysis?.score} label={analysis?.label as string} className="col-span-1"/> {/* Display the ScoreCard */}
            <Card variant = 'info' className="col-span-2"> 
              <div className="flex flex-col space-y-2">
                <h4 className="text-lg font-semibold">Explanation</h4>
                <p className="text-gray-600">{analysis?.explanation}</p> {/* Display the analysis explanation */}
              </div>
            </Card>
          </div>

          {analysis && <AspectList aspects={{positive: analysis?.positive ?? {}, negative: analysis?.negative ?? {}}}/>} {/* Display the AspectList if analysis results are available */}
        </>
      )}
    </div>
  );
};

export default ReviewAnalyzer; 
