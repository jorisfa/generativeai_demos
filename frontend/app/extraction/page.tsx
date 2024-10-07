'use client';

import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import Button from "@/components/ui/Button"   
import { ExtractContentForm } from '@/types/extraction';
import { exportData } from './actions';
import LoadingIndicator from '@/components/ui/LoadingIndicator';
import TicketExtractDisplay from '@/components/ui/TicketExtractDisplay';
import AlertBlock from '@/components/ui/AlertBlock';


const defaultPrompt: string = `Sample prompt`

export default function Page() {
  const [formData, setFormData] = useState<ExtractContentForm>({
    prompt: defaultPrompt,
    content: ''
  });
  const [structuredData, setStructuredData] = useState<any>(null);
  const [showExtraSection, setShowExtraSection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prevState => {
        return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  };

  const handleButtonClick = async () => {
    // Check if the form is filled
    if(formData?.content === '' || formData?.prompt === '') {
      setErrors(prevErrors => [...prevErrors, 'Please fill the form properly'])
      return;
    }
  
    // Reset the state
    setStructuredData(null)
    setIsLoading(true);
    setErrors([])

    try{
      // Format the prompt
      const formattedPromp = formData?.prompt.replace('|ticket_data|', formData?.content)
      const response = await exportData(formattedPromp);
      setStructuredData(response?.data);
    } catch (e) {
      setErrors(prevErrors => [...prevErrors, 'Error while extracting the data'])
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExtraSection = () => {
    setShowExtraSection(!showExtraSection);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full align-center space-y-8">
      <Textarea
        name="content"
        className="max-w-2xl"
        placeholder="Enter some text..."
        value={formData?.content}
        onChange={handleInputChange}
      />
      <Button className="mt-4" onClick={handleButtonClick} disabled={false}>
        Process Text
      </Button>

      {structuredData && (
        <TicketExtractDisplay data={structuredData} />
      )}

      {structuredData && (
        <div className="mt-4 bg-slate-100 p-4 rounded-md">
          <pre>{JSON.stringify(structuredData, null, 2)}</pre>
        </div>
      )}

      <Button className="mt-4 bg-blue-400 hover:bg-blue-500" onClick={toggleExtraSection} disabled={false}>
        {showExtraSection ? 'Hide Prompt' : 'Show Prompt'}
      </Button>

      {isLoading && <LoadingIndicator />}

      {showExtraSection && (
        <div className="mt-4 border p-4 rounded-md w-full">
          <Textarea
            className="max-w-2xl m-auto"
            placeholder="Enter a prompt here"
            value={formData?.prompt}
            onChange={handleInputChange}
          />
          {/* Add more components to this section as needed */}
        </div>
      )}

      {errors.length > 0 && <AlertBlock title="Error" description={errors[0]} variant="destructive" />}
    </div>
  );
}