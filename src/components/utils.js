export const BASE_URL = process.env.REACT_APP_BACKEND_URL

export const ADD_EXPENSE_URL = `${BASE_URL}/expense/`
export const ADD_INCOME_URL = `${BASE_URL}/income/`
export const ADD_CATEGORY_URL = `${BASE_URL}/category/`
export const GET_CATEGORIES_URL = `${BASE_URL}/category/`
export const CATEGORY_URL = `${BASE_URL}/query-category`
export const MONTH_URL = `${BASE_URL}/query-month-graph/`
export const DAY_URL = `${BASE_URL}/query-day-graph/`
export const WEEK_URL = `${BASE_URL}/query-week-graph`
export const DATE_RANGE_URL = `${BASE_URL}/query-date-range/`
export const RECENT_EXPENSES_URL = `${BASE_URL}/query-most-recent-expenses`
export const ALL_EXPENSES_URL = `${BASE_URL}/expense/`
export const ALL_INCOME_URL = `${BASE_URL}/income/`
export const ALL_USERS_URL = `${BASE_URL}/users/list/`
export const NET_URL = `${BASE_URL}/query-net/`
export const EXPORT_CSV_URL = `${BASE_URL}/expense/export-csv`
export const EXPORT_EXCEL_URL = `${BASE_URL}/expense/export-excel`
export const EXPORT_PDF_URL = `${BASE_URL}/expense/export-pdf`
export const SETTINGS_URL = `${BASE_URL}/settings/`

export function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function capitalize(s){
    return s[0].toUpperCase() + s.slice(1);
}
