/**
 * Normalizes location names by removing special characters, 
 * converting to lowercase, and standardizing common variations
 */
export function normalizeLocation(location: string): string {
  if (!location) return '';
  
  // Convert to lowercase
  let normalized = location.toLowerCase();
  
  // Remove special characters and extra spaces
  normalized = normalized.replace(/[^\w\s]/g, ' ')
                         .replace(/\s+/g, ' ')
                         .trim();
  
  // Replace common variations
  const replacements: Record<string, string> = {
    'vit ap': 'vit andhra pradesh',
    'vitap': 'vit andhra pradesh',
    'vit-ap': 'vit andhra pradesh',
    'vit a p': 'vit andhra pradesh',
    'amaravati': 'amaravathi',
    'vijayawada airport': 'gannavaram airport',
    'gannavaram': 'gannavaram airport',
    // Add more common variations as needed
  };
  
  // Check if the location matches any known variations
  for (const [variant, standard] of Object.entries(replacements)) {
    if (normalized === variant || normalized.includes(variant)) {
      return standard;
    }
  }
  
  return normalized;
}