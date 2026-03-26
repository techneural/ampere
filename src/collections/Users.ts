// src/collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'totpSecret',
      type: 'text',
      admin: { hidden: true },
    },
    {
      name: 'totpEnabled',
      type: 'checkbox',
      defaultValue: false,
      // ✅ KEY FIX: saveToJWT means this field is embedded in the payload-token JWT.
      // Middleware can read it without any DB call — just by decoding the token.
      saveToJWT: true,
      admin: { hidden: true },
    },
    {
      name: 'totpPendingSecret',
      type: 'text',
      admin: { hidden: true },
    },
  ],
}