export const useFormattedDate = () => {
    const formatDateTime = (date: string | Date) => {
        return new Date(date).toLocaleString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }

    return {
        formatDateTime,
    }
} 