'use client';

import { useState } from 'react'
import AnalysisCard from '@/components/ui/AnalysisCard'
import ReviewCard from '@/components/ui/ReviewCard';
import { generateInsights } from './actions';
import Button from '@/components/ui/Button';
import LoadingIndicator from '@/components/ui/LoadingIndicator';
import CardBlock from '@/components/ui/CardBlock';


const customerReviews: string[] = [
    "Ce produit a dépassé mes attentes ! Qualité et performances incroyables.",
    "C'est correct, rien de spécial. Fait ce qu'il est censé faire.",
    "Expérience horrible. Je ne recommanderais ce produit à personne.",
    "Excellent rapport qualité-prix. Je suis très satisfait de mon achat.",
    "Déçu par la qualité. Ça fait bon marché.",
    "J'adore ! C'est le meilleur produit que j'ai jamais utilisé.",
    "Ça marche bien, mais ce n'est pas très convivial.",
    "Gaspillage d'argent. N'achetez pas ça.",
    "Je suis impressionné par la façon dont ce produit fonctionne. Je le recommande vivement.",
    "Ne vaut pas le prix. Vous pouvez trouver de meilleures options pour moins cher.",
    "Je ne m'attendais pas à grand-chose, mais j'ai été agréablement surpris.",
    "Produit solide, fait le travail sans problème.",
    "Je suis mitigé, quelques points positifs mais aussi des défauts.",
    "Un peu cher pour ce que c'est, mais ça reste un bon produit.",
    "Franchement déçu, je m'attendais à mieux de cette marque.",
    "Rien à redire, tout simplement parfait !",
    "Pas mal, mais il y a certainement mieux sur le marché.",
    "À éviter, passez votre chemin.",
    "Excellent produit, je le recommande à tous mes amis.",
    "Moyen, sans plus. Je ne rachèterai pas.",
    "Je suis conquis, ce produit a changé ma vie !",
    "Ça fait l'affaire, mais il ne faut pas en demander trop.",
    "Une véritable arnaque, fuyez !",
    "Super produit, rapport qualité-prix imbattable.",
    "Je suis dubitatif, je ne sais pas si je le conseillerais.",
    "Satisfait dans l'ensemble, mais il y a de la marge d'amélioration.",
    "Produit correct, sans plus. Je ne suis ni déçu ni enchanté.",
    "Un bon choix si vous avez un budget limité.",
    "Pas convaincu, je m'attendais à quelque chose de plus innovant.",
    "Plutôt content de mon achat, je le recommande.",
    "Pas terrible, il y a clairement mieux ailleurs.",
    "Je suis agréablement surpris par la qualité de ce produit.",
    "Rien d'extraordinaire, mais ça fait le job.",
    "Un peu déçu, le rapport qualité-prix n'est pas au rendez-vous.",
    "Globalement satisfait, même si ce n'est pas parfait."
];

const InsightsPage: React.FC = () => {
    const [analysis, setAnalysis] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [errors, setErrors] = useState<string[]>([])
  
    const generateAnalysis = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsGenerating(true);
      const insights = await generateInsights(customerReviews);
      setIsGenerating(false);

      if(typeof(insights) !== 'string'){
        setErrors(prev => [...prev, insights?.error])
        return
      }

      console.log(insights)
      setAnalysis(insights);
    };
  
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Customer Reviews</h1>
        <Button
          onClick={generateAnalysis}
          className="mb-6"
          disabled={isGenerating}
        >
          Generate Analysis
        </Button>
  
        {isGenerating && <LoadingIndicator />}
        {errors && errors.map((error, index) => <CardBlock key={index} variant='danger'>{error}</CardBlock>)}
        {analysis && <AnalysisCard analysis={analysis}/>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {customerReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    );
  };

export default InsightsPage