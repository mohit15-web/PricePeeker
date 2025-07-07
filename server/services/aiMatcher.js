import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDikPhk8SpEBd_gKEWJbtFszGNHIctI02I");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const validateMatch = async (productTitle, userQuery, hasRetried = false) => {
  try {
    const prompt = `
Does the product title: "${productTitle}" 
match or relate to the search query: "${userQuery}"?

Consider a match if:
- The product title contains the main keywords from the search query
- The product is a variant/model of what the user is searching for
- The product title includes additional specifications but is fundamentally the same product

Examples:
- Query: "iPhone 16" → Title: "iPhone 16 128 GB: 5G Mobile Phone..." → TRUE
- Query: "Samsung TV" → Title: "Samsung 55-inch 4K Smart TV..." → TRUE  
- Query: "laptop" → Title: "Dell Inspiron 15 3000 Laptop..." → TRUE
- Query: "iPhone" → Title: "Samsung Galaxy S24..." → FALSE

Reply with only "true" or "false".
`;

    console.log("inside validate function");
    
    const result = await model.generateContent(prompt);
    console.log("temp - result", result);
    
    const text = result.response.text().toLowerCase().trim();
    console.log("temp - text", text);
    
    console.log(`Validation: "${userQuery}" vs "${productTitle}" → ${text}`);
    return text === "true" || text.includes("true");

  } catch (error) {
    if (error.status === 429 && !hasRetried) {
      console.warn("Rate limit hit. Waiting to retry once...");
      await new Promise(res => setTimeout(res, 60000)); // Wait 1 minute
      return validateMatch(productTitle, userQuery, true); // Retry only once
    }

    if (error.status === 429) {
      console.error(`Gemini API rate limit hit. Skipping validation for: ${productTitle}`);
      return null; // Skip validation
    }

    console.error("Gemini validation failed:", error);
    return false;
  }
};
