import axios from "axios";

export const BASE_CLIENT = axios({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

export const ENDPOINTS = {
    addExpense: "expense/",
    addIncome: "income/",
    addCategory: "category/",
    getCategories: "category/",
    category: "query-category/",
    month: "query-month-graph/",
    day: "query-day-graph/",
    year: "query-week-graph/",
    dateRange: "query-date-range/",
    recentExpenses: "query-most-recent-expenses/",
    allExpenses: "expense/",
    allIncome: "income/",
    allUsers: "users/list/",
    net: "query-net/",
    exportCsv: "expense/export-csv/",
    exportExcel: "expense/export-excel/",
    exportPdf: "expense/export-pdf/",
    settings: "settings/"
}

export const requestSample = (id) => {
    request = BASE_CLIENT.get(ENDPOINTS.addCategory,
        {id}
    )

    return request
}