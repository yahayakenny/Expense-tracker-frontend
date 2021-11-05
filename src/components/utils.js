export const ADD_EXPENSE_URL = 'https://expense-tracker-yhk.herokuapp.com/api/expense/'
export const ADD_INCOME_URL = 'https://expense-tracker-yhk.herokuapp.com/api/income/'
export const ADD_CATEGORY_URL = 'https://expense-tracker-yhk.herokuapp.com/api/category/'
export const GET_CATEGORIES_URL = 'https://expense-tracker-yhk.herokuapp.com/api/category/'
export const CATEGORY_URL = 'https://expense-tracker-yhk.herokuapp.com/api/query-category'
export const MONTH_URL = 'https://expense-tracker-yhk.herokuapp.com/api/query-month-graph/'
export const DAY_URL = 'https://expense-tracker-yhk.herokuapp.com/api/query-day-graph/'
export const YEAR_URL = 'https://expense-tracker-yhk.herokuapp.com/api/query-week-graph'
export const DATE_RANGE_URL = 'https://expense-tracker-yhk.herokuapp.com/api/query-date-range/'
export const RECENT_EXPENSES_URL = 'https://expense-tracker-yhk.herokuapp.com/api/query-most-recent-expenses'
export const ALL_EXPENSES_URL = 'https://expense-tracker-yhk.herokuapp.com/api/expense/'
export const ALL_INCOME_URL = 'https://expense-tracker-yhk.herokuapp.com/api/income/'
export const ALL_USERS_URL = "https://expense-tracker-yhk.herokuapp.com/api/users/list/"
export const NET_URL = 'https://expense-tracker-yhk.herokuapp.com/api/query-net/'

export function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function capitalize(s){
    return s[0].toUpperCase() + s.slice(1);
}