import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  labels: {
    singular: 'Appointment',
    plural: 'Appointments',
  },
  admin: {
    defaultColumns: ['name', 'email', 'date', 'status', 'createdAt'],
    useAsTitle: 'name',
    description:
      'Appointments booked via Calendly. Client details are read-only — only Status and Notes can be changed.',
  },
  access: {
    read: authenticated,
    create: () => true, // webhook creates records
    update: authenticated, // restricted per-field via hooks + readOnly
    delete: authenticated,
  },
  fields: [
    // ── Calendly-sourced fields (read-only for everyone) ──────────
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
      admin: {
        readOnly: true,
        description: 'Set by Calendly — cannot be edited.',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      admin: {
        readOnly: true,
        description: 'Set by Calendly — cannot be edited.',
      },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Appointment Date & Time',
      admin: {
        readOnly: true,
        description: 'Set by Calendly — cannot be edited.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'eventType',
      type: 'text',
      label: 'Event Type',
      admin: {
        readOnly: true,
        description: 'Set by Calendly — cannot be edited.',
      },
    },
    {
      name: 'eventUri',
      type: 'text',
      label: 'Calendly Event URI',
      admin: {
        readOnly: true,
        description: 'Unique Calendly event URI — set automatically by webhook.',
      },
    },
    {
      name: 'inviteeUri',
      type: 'text',
      label: 'Calendly Invitee URI',
      admin: {
        readOnly: true,
        description: 'Unique Calendly invitee URI — used to match cancellation events.',
      },
    },

    // ── Admin-editable fields ─────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'scheduled',
      options: [
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Only this field and Notes can be changed by the admin.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes',
      admin: {
        position: 'sidebar',
        description: 'Internal notes visible only to admins.',
      },
    },
  ],
  hooks: {
    // Belt-and-suspenders: strip Calendly fields from any update payload
    // even if readOnly is somehow bypassed (e.g. direct API call)
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'update') {
          delete data.name
          delete data.email
          delete data.date
          delete data.eventType
          delete data.eventUri
          delete data.inviteeUri
        }
        return data
      },
    ],
  },
  timestamps: true,
}
