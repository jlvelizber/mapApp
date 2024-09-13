export const getUserLocation = async (): Promise<[number, number]> => {
    return new Promise((revolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                revolve([coords.longitude, coords.latitude])
            },
            (err) => {
                alert('No se pudo obtener la geolocation')
                console.log(err)
                reject()
            }
        )
    })
}