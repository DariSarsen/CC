export interface Experience {
    company: string;
    position: string;
    duration: string;
}

export interface Skill {
    name: string;
    level: string;
}

export interface Language {
    name: string;
    proficiency: string;
}

export interface Resume {
    experience: Experience[];
    skills: Skill[];
    languages: Language[];
    additionalInfo: string;
}

export const defaultResume: Resume = {
    experience: [],
    skills: [],
    languages: [],
    additionalInfo: "",
};
