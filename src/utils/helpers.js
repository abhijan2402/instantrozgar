export const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1990; year--) {
      years.push({ label: year.toString(), value: year.toString() });
    }
    return years;
};