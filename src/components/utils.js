export const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM3NDg1OTg3LCJpYXQiOjE2MzQ4OTM5ODcsImp0aSI6Ijk5NDQxNTNlYzI2ZTRjYWFhZTExZThkMGE4Y2ExZDVlIiwidXNlcl9pZCI6MX0.F7O9Egk2VD72yiDmqE-JS9dicq1JASyNZ1-Mp3fqHE8'
export const ADD_EXPENSE_URL = 'http://127.0.0.1:8000/api/expense/'
export const ADD_INCOME_URL = 'http://127.0.0.1:8000/api/income/'
export const GET_CATEGORIES_URL = 'http://127.0.0.1:8000/api/category/'
export const CATEGORY_URL = 'http://127.0.0.1:8000/api/query-category'
export const MONTH_URL = 'http://127.0.0.1:8000/api/query-month-graph/'
export const DAY_URL = 'http://127.0.0.1:8000/api/query-day-graph/'
export const YEAR_URL = 'http://127.0.0.1:8000/api/query-week-graph'
export const DATE_RANGE_URL = 'http://127.0.0.1:8000/api/query-date-range/'
export const RECENT_EXPENSES_URL = 'http://127.0.0.1:8000/api/query-most-recent-expenses'
export const ALL_EXPENSES_URL = 'http://127.0.0.1:8000/api/expense/'
export const ALL_INCOME_URL = 'http://127.0.0.1:8000/api/income/'
export const ALL_USERS_URL = "http://127.0.0.1:8000/api/users/list/"
export const NET_URL = 'http://127.0.0.1:8000/api/query-net/'


export function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}