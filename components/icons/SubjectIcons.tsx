
import React from 'react';

const createIcon = (path: React.ReactNode) => (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    {path}
  </svg>
);

export const MathIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 7.5l6 9m-6-9l6-4.5M9 7.5L3 3m6 4.5L3 12m6-4.5h12M9 16.5l6-9m-6 9L3 12m6 4.5L3 21m6-4.5h12"
  />
);

export const PhysicsIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L12 12m0 0l-1.18.941m1.18-.941L13.18 11.06m-1.18 1.882l-3.181-3.183a8.25 8.25 0 0111.667 0l3.181 3.183"
  />
);

export const ChemistryIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M14.25 6.087c0-.597.484-1.087 1.088-1.087h.003a1.088 1.088 0 011.087 1.087v11.826c0 .597-.484 1.087-1.088 1.087h-.003a1.088 1.088 0 01-1.087-1.087V6.087zM6 18.75a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zM12 15a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z"
  />
);

export const BiologyIcon = createIcon(
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M3.75 21a3.75 3.75 0 01-3.75-3.75V3.75A3.75 3.75 0 013.75 0h16.5a3.75 3.75 0 013.75 3.75v13.5A3.75 3.75 0 0120.25 21H3.75zM12 18.75a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h0a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h0zM8.25 18.75a.75.75 0 00.75-.75V10.5a.75.75 0 00-.75-.75h0a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h0zM15.75 18.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h0a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h0z"
  />
);
