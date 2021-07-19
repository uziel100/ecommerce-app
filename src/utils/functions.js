

export const sortArrayByDate = ( array ) => {
    return array.sort( (a,b) => {
        return new Date(a.date) - new Date(b.date)
    })
}