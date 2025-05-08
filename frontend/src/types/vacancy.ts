export interface Vacancy {
    id: string;
    userId: string;
    title: string;
    description?: string;
    requirements?: string[];
    location?: string;
    salary?: string;
    createdAt: string;
    updatedAt: string;
  }
  