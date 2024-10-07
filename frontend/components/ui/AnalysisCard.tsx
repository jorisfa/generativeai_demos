import { marked } from 'marked';


const AnalysisCard: React.FC<{ analysis: string }> = ({ analysis }) => {
  const sanitizedHtml = (marked(analysis))
  
  return (
    <div className="bg-blue-100 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2">Analysis:</h3>
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
}
  

export default AnalysisCard