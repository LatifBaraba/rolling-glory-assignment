import logo from '../assets/images/logo.png'

const header = () => {
    return (
        <header>
            <div className='container'>
                <nav className='header-navigation'>
                    <img src={logo} alt='TipCommerce' />
                    <h1>TipCommerce</h1>
                </nav>
            </div>
        </header>
    )
}

export default header
