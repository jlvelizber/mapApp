import Logo from './../logo.svg'

export const ReactLogo = () => {
    return (
        <img src={Logo} alt='My App' style={{ position: 'fixed', bottom: '20px', right: '20px', width: '130px' }} />
    )
}
