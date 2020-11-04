// FrontEnd view
interface Onboarding {
    searchStatus: 'ready' | 'open' | 'notLooking' //string
    role: string
    roleExp: number
    specialities: {
        speciality?: string,
        experinece?: number
    }[] // array of object
    skills: string[] // array of strings
    options: string
    remote: string
    annualSalary: number
    perHour: number
    education: {
        type: string
        univercity: string
        field: string
        degree: string
    },
}

// Backend view of interfaces
interface User {
    id: number
    email: string
    password: string
}

interface Candidate {
    id: number
    user: User
    onboarded: boolean // false
    remote: 'yes' | 'no' | 'only' // string
    salary: number
    perHour: number
    educationType: 'degree' | 'self'
}

interface Recruiter {
    id: number
    user: User
}

interface OnboardingBe {
    searchStatus: 'ready' | 'open' | 'notLooking' //string
    role: Role
}

interface Role {
    name: string
    experience: number
}

interface Speciality {
    name: string
    role: Role
    experience: number
}

interface Skill {
    id: number
    name: string
}

interface CandidateSkills {
    id: number
    user: Candidate
    skill: Skill
}

interface EmpOption {
    id: number
    name: string
}

interface CandidateOptions {
    id: number
    user: Candidate
    empOption: EmpOption
}

interface Education {
    id: number
    user: Candidate
    university: string
    field: string
    degree: string
}

interface Work {
    id: number
    user: Candidate
    companyName: string
    currentWork: boolean 
    startDate: Date
    endDate?: Date
    description: string
}