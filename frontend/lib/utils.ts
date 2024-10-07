import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function fetchFromBackend(endpoint: string, method: string = "GET", data?: Record<string, any>, options?: Omit<RequestInit, "method" | "body">) {
  const response = await fetch(endpoint, {
    ...options,
    method,
    headers: { ...(options?.headers || {}), "Content-Type": "application/json" },
    body: method === "POST" && data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error fetching from backend: ${response.status} ${response.statusText}`);
  }

  try {
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Error parsing JSON response from backend");
  }
}
