import * as yup from 'yup'

export const addAssignmentSchema = yup.object().shape({
    title: yup.string().min(3).max(50).required('Assignment title is required.'),
    description: yup.string().max(255).optional(),
    notif_mins: yup.number().integer().min(0).max(59, 'Please enter a valid time between 0-59 minutes.').optional(),
    date: yup.date().required('Assignment date is required.'),
    status: yup.boolean(),
})