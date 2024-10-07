import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AlertBlockProps{
    title: string;
    description: string;
    variant: "default" | "destructive";
}

const AlertBlock: React.FC<AlertBlockProps> = ({title, description, variant}) => {
   return (
    <Alert variant={variant}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
            {description}
        </AlertDescription>
    </Alert>
   ) 
}

export default AlertBlock;