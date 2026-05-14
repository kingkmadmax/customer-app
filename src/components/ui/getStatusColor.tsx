"use client" 
 export default function getStatusColor(situation: string | undefined) {
  switch (situation?.toUpperCase()) {
    case 'AVAILABLE':
      return 'bg-green-800';
    case 'RENTED':
      return 'bg-red-800';
    case 'UNAVAILABLE':
      return 'bg-yellow-800';
    default:
      return 'bg-gray-500'; 
  }
};