export interface ExtractContentForm{
    prompt: string;
    content: string;
}

export interface ExtractContentResponse{
    product_names: string[];
    product_ID: string[];
    sap_product_code: string[];
    package_number: string;
}

