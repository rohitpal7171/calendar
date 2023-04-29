import moment from "moment/moment";

export const eventInitialValues = {
    title: '',
    category: 'work',
    start: moment().format('YYYY-MM-DDTHH:MM'),
    end: moment().format('YYYY-MM-DDTHH:MM')
}
