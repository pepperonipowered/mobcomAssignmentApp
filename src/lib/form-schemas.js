import * as yup from 'yup'

export const addAssignmentSchema = yup.object().shape({
    title: yup.string()
                .min(3, 'Assignment title must have at least 3 characters.')
                .max(50, 'Assignment title must not exceed 50 characters.')
                .required('Assignment title is required.'),
    description: yup.string()
                    .max(255,'Assignment description must not exceed 255 characters.')
                    .required('Assignment description is required.'),
    notif_mins: yup.number('Input must be a number').integer('Pleas put a whole number.')
                    .min(0, 'Please enter a valid time between 0-59 minutes.')
                    .max(59, 'Please enter a valid time between 0-59 minutes.')
                    .required('Please enter the time you want to be notified before due date.'),
    date: yup.date().required('Assignment date is required.'),
    // subject: yup.string().required('Subject is required.'),
    // paper: yup.string().required('Format is required.'),
})

export const addSubjectSchema = yup.object().shape({
    name: yup.string().min(5, 'Subject name must have at least 5 characters.').max(50, 'Subject name must not exeed 50 characters.').required('Subject name is required.'),
    code: yup.string().max(50, 'Subject code must not exeed 50 characters.').required('Assignment code is required.'),
})