export enum Tone {
  PROFESSIONAL = 'Professional',
  CASUAL = 'Casual',
  CREATIVE = 'Creative',
  ACADEMIC = 'Academic',
  PERSUASIVE = 'Persuasive'
}

export enum Complexity {
  BASIC = 'Basic',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum Format {
  TEXT = 'Plain Text',
  MARKDOWN = 'Markdown',
  JSON = 'JSON',
  TABLE = 'Table'
}

export interface PromptConfig {
  tone: Tone;
  complexity: Complexity;
  format: Format;
  includeExamples: boolean;
}

export interface GeneratedResult {
  content: string;
  error?: string;
}