import * as Yup from 'yup'

// Yup validation only for title because rest all fields are by-default filled.
export const eventvalidation = Yup.object({
    title: Yup.string().min(3).max(25).required('Please enter title for this event.')
})
