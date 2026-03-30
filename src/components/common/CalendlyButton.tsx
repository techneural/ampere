'use client'

import { useState, useEffect } from 'react'
import { PopupModal } from 'react-calendly'
import AppButton from '@/components/ui/AppButton'

interface CalendlyButtonProps {
  label?: string
  calendlyUrl: string
  className?: string
}

const CalendlyButton: React.FC<CalendlyButtonProps> = ({
  label = 'Book an Appointment',
  calendlyUrl,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setRootElement(document.getElementById('root') || document.body)
  }, [])

  if (!calendlyUrl) return null

  return (
    <>
      <AppButton
        label={label}
        variant="primary"
        size="lg"
        className={className}
        onClick={() => setIsOpen(true)}
      />

      {rootElement && (
        <PopupModal
          url={calendlyUrl}
          open={isOpen}
          onModalClose={() => setIsOpen(false)}
          rootElement={rootElement}
        />
      )}
    </>
  )
}

export default CalendlyButton

// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { PopupModal } from 'react-calendly'
// import AppButton from '@/components/ui/AppButton'

// interface CalendlyButtonProps {
//   label?: string
//   calendlyUrl: string
//   className?: string
// }

// const CalendlyButton: React.FC<CalendlyButtonProps> = ({
//   label = 'Book an Appointment',
//   calendlyUrl,
//   className = '',
// }) => {
//   const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
//   const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

//   const dialogRef = useRef<HTMLDialogElement>(null)

//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [error, setError] = useState('')

//   useEffect(() => {
//     setRootElement(document.getElementById('root') || document.body)
//   }, [])

//   if (!calendlyUrl) return null

//   const openModal = () => {
//     dialogRef.current?.showModal()
//   }

//   const closeModal = () => {
//     dialogRef.current?.close()
//   }

//   const handleSubmit = () => {
//     if (!name.trim()) {
//       setError('Name is required')
//       return
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError('Enter a valid email')
//       return
//     }

//     setError('')
//     closeModal()
//     setIsCalendlyOpen(true)
//   }

//   const calendlyWithParams = `${calendlyUrl}?name=${encodeURIComponent(
//     name
//   )}&email=${encodeURIComponent(email)}`

//   return (
//     <>
//       {/* Button */}
//       <AppButton
//         label={label}
//         variant="primary"
//         size="lg"
//         className={className}
//         onClick={openModal}
//       />

//       {/* DaisyUI Dialog */}
//       <dialog ref={dialogRef} className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg mb-4">
//             Book Appointment
//           </h3>

//           <div className="space-y-3">
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="input input-bordered w-full"
//             />

//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input input-bordered w-full"
//             />

//             {error && (
//               <p className="text-error text-sm">{error}</p>
//             )}
//           </div>

//           <div className="modal-action">
//             <button className="btn" onClick={closeModal}>
//               Cancel
//             </button>

//             <button className="btn btn-primary" onClick={handleSubmit}>
//               Continue
//             </button>
//           </div>
//         </div>

//         {/* backdrop click close */}
//         <form method="dialog" className="modal-backdrop">
//           <button>close</button>
//         </form>
//       </dialog>

//       {/* Calendly Popup */}
//       {rootElement && (
//         <PopupModal
//           url={calendlyWithParams}
//           open={isCalendlyOpen}
//           onModalClose={() => setIsCalendlyOpen(false)}
//           rootElement={rootElement}
//         />
//       )}
//     </>
//   )
// }

// export default CalendlyButton
