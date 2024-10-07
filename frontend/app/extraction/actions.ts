'use server';

import { HarmBlockThreshold, HarmCategory, SchemaType, ResponseSchema, VertexAI } from "@google-cloud/vertexai";
import { Response } from "@/types/response";
import { ExtractContentResponse } from "@/types/extraction";

export async function exportData(prompt: string): Promise<Response<ExtractContentResponse> | undefined>{
    const vertexAI = new VertexAI({
        project: process.env.PROJECT_ID as string,
        location: process.env.LOCATION as string
    });

    // Response schema for the output
    const responseSchema: ResponseSchema = {
        type: SchemaType.OBJECT,
        properties: {
            field1: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.STRING
                }},
    
            field2: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.STRING
                }
            },
    
            field3: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.STRING
                }
            },
    
            field4: {
                type: SchemaType.STRING
            }
    
        }
    }

    // Get the model
    const generativeModel = vertexAI.getGenerativeModel({
        model: process.env.MODEL_NAME as string,
        generationConfig: {
            maxOutputTokens: 2048,
            responseMimeType: "application/json",
            responseSchema: responseSchema
        }
    })

    // Send the request
    try{
        const result = await generativeModel.generateContent(prompt);

        // Throw an error if there's no candidate response
        if(!result.response.candidates){
            throw Error('Error while generating the content')
        }

        // If there's a candidate, we assume there's some text
        const candidates = result.response.candidates[0];

        // Try parsing the response
        try{
            const response: ExtractContentResponse = JSON.parse(candidates.content.parts[0].text as string);
            return {data: response};
        } catch(e) {
            throw Error('Error while parsing response')
        }
        
    } catch (e) {
        console.error(e);
        throw Error("Error while sending the request")
    }
}