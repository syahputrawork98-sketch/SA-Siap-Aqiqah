/**
 * Developer Persona Helper
 * Centralizes localStorage logic for developer testing roles.
 */

export const PERSONA_KEY = 'user_role';

export const getPersona = () => {
  return localStorage.getItem(PERSONA_KEY) || 'public';
};

export const setPersona = (role) => {
  if (role && role !== 'public') {
    localStorage.setItem(PERSONA_KEY, role);
  } else {
    localStorage.removeItem(PERSONA_KEY);
  }
};

export const clearPersona = () => {
  localStorage.removeItem(PERSONA_KEY);
};

export const isPersonaActive = () => {
  const persona = getPersona();
  return persona !== 'public';
};
