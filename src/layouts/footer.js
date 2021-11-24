import ig from '../assets/images/ig.svg'
import fb from '../assets/images/fb.svg'
import twt from '../assets/images/twt.svg'

const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <div className='footer-content'>
                    <div className='footer-social'>
                        <img src={ig} alt='Instagram' />
                        <img src={fb} alt='Facebook' />
                        <img src={twt} alt='Twitter' />
                    </div>
                    <div className='footer-term'>
                        <span>Terms & Condition | Copyright © 2018. All rights reserved. PT Radya Gita Bahagi</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
