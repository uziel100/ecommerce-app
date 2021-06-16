

export const sortArrayByDate = ( array ) => {
    return array.sort( (a,b) => {
        return new Date(b.date) - new Date(a.date)
    })
}