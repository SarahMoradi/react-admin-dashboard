/* eslint-disable jsx-a11y/anchor-is-valid */
import usFlag from '@assets/images/us.png'
import faFlag from '@assets/images/fa.png'
import {useEffect, useRef, useState} from 'react'
import {useAppContext} from '../contexts/app/app-context'

const ChangeLanguage = () => {
  const [show, setShow] = useState(false)
  const ref = useRef()
  const {language, changeLanguage} = useAppContext()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    // avoid memory lick
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [show])

  // close after selection
  useEffect(() => {
    setShow(false)
  }, [language])

  return (
    <div className='dropdown'>
      <a className='nav-flag dropdown-toggle' onClick={() => setShow(true)}>
        <img src={language === 'fa' ? faFlag : usFlag} alt='english' />
      </a>
      <div ref={ref} className={`dropdown-menu dropdown-menu-end ${show ? 'show' : undefined}`}>
        <a
          className='dropdown-item fw-bolder d-flex align-items-center gap-2'
          //   style={{display: 'flex', justifyContent: 'space-around'}}
          style={{textAlign: language === 'fa' ? 'right' : 'left'}}
          onClick={() => changeLanguage('fa')}
        >
          <img src={faFlag} alt='farsi' width='20' className='ms-2' />
          <span className='align-middle'>فارسی</span>
        </a>
        <a
          className='dropdown-item fw-bolder d-flex align-items-center gap-2'
          //   style={{display: 'flex', justifyContent: 'space-around'}}
          style={{textAlign: language === 'fa' ? 'right' : 'left'}}
          onClick={() => changeLanguage('en')}
        >
          <img src={usFlag} alt='english' width='20' className='ms-2' />
          <span className='align-middle'>English</span>
        </a>
      </div>
    </div>
  )
}

export default ChangeLanguage
