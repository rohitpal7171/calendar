import * as Yup from 'yup'

export const eventvalidation = Yup.object({
    title: Yup.string().min(3).max(25).required('Please enter title for this event.')
})
