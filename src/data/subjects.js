import { FaAllergies, FaBaby } from "react-icons/fa";

export const subjectsData = [
    {
        id: 'dermatologia',
        name: 'Dermatología',
        icon: FaAllergies,
        tests: [
            { id: 1, name: 'Estructura y Fisiología de la Piel Normal' },
            { id: 2, name: 'Bases del Diagnóstico en Dermatología' },
            { id: 3, name: 'Lesiones Elementales Clínicas' },
            { id: 4, name: 'Lesiones Elementales Histopatológicas Cutáneas' },
            { id: 5, name: 'Terapéutica en Dermatología' },
            { id: 6, name: 'Terapias Físicas en Dermatología' },
        ]
    },
    {
        id: 'pediatria',
        name: 'Pediatría',
        icon: FaBaby,
        tests: [
            { id: 1, name: 'Recién Nacido a Término y Pretérmino' }, 
            { id: 2, name: 'Defectos y Enfermedades Congénitas' },
            { id: 3, name: 'Dificultad Respiratoria Neonatal' },
            { id: 4, name: 'Infección Neonatal' },
            { id: 5, name: 'Hipoxia/Depresión Perinatal' },
            { id: 6, name: 'Ictericia Neonatal' },
        ]
    }
];