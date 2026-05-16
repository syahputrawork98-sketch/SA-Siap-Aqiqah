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

export const DEV_PERSONAS = [
  { role: "user", label: "Konsumen / User", path: "/user" },
  { role: "mitra_kandang", label: "Mitra Kandang", path: "/mitra-kandang" },
  { role: "mitra_catering", label: "Mitra Catering", path: "/mitra-catering" },
  { role: "mitra_kurir", label: "Mitra Kurir", path: "/mitra-kurir" },
  { role: "admin", label: "Admin", path: "/admin" },
  { role: "superadmin", label: "Superadmin", path: "/superadmin" },
];
