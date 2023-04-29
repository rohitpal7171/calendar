import moment from "moment/moment";
// initial values for form validations.
export const eventInitialValues = {
    title: '',
    category: 'work',
    start: moment().format('YYYY-MM-DDTHH:MM'),
    end: moment().format('YYYY-MM-DDTHH:MM')
}
