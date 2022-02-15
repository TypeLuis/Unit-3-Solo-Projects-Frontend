import './HeaderSmall.scss';

import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from "../context/UserContext"
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as Pokeball } from '../logos/Poké_Ball_icon.svg'

import { ReactComponent as CaretIcon } from '../logos/caret.svg';
import { ReactComponent as ArrowIcon } from '../logos/arrow.svg';
import { ReactComponent as PlusIcon } from '../logos/plus.svg';
import { ReactComponent as ChevronIcon } from '../logos/chevron.svg';
import { ReactComponent as OnePiece } from '../logos/OnePiece.svg';
import { ReactComponent as Totoro } from '../logos/TOTORO.svg';
import { ReactComponent as DBZ } from '../logos/DBZ.svg';
import { ReactComponent as JUJU } from '../logos/JUJU.svg';
import { ReactComponent as LUNA } from '../logos/LUNA.svg';
import { ReactComponent as MOMO } from '../logos/MOMO.svg';
import { ReactComponent as NOFACE } from '../logos/NOFACE.svg';

function HeaderSmall() {
    const { pageState } = useContext(UserContext)

    const [pageId, setPageId] = pageState
    const currentWindow = window.location.pathname.split('/')[2]

    return (
        <Navbar>

            <NavItem menu='main' icon={<CaretIcon className='nav-event nav-control' />}>
                <DropdownMenu></DropdownMenu>
            </NavItem>

            {currentWindow === pageId &&
                <NavItem menu='Anime Details' icon={<CaretIcon className='nav-event nav-control' />}>
                    <DropdownMenu></DropdownMenu>
                </NavItem>
            }

        </Navbar>
    );
}

function Navbar(props) {
    return (
        <nav className="nav-event navbar-small">
            <ul className="nav-event navbar-nav">{props.children}</ul>
        </nav>
    );
}

function NavItem(props) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(false)
    const icon = useRef(null)


    // determines if dropdown is open or closed
    const handleOpenClick = (e) => {
        e.preventDefault()
        // this setTimeout needs to be run before the setTimeout where we set states to True

        // The reason for this is because the icon reference is looking for a class name that contains true
        setTimeout(() => {

            // The window on click is inside the handle click because we need to recall it everytime the button is clicked
            window.onclick = function (e) {
                // each class name has an event to toggle

                // if user clicks on element that doesn't contain 'nav-event' as it's first class name
                if (e.target.classList[0] != 'nav-event') {
                    console.log('hi')
                    setContent(false)

                    // this setTimeOut is here to let the animation of dropdown fade out
                    setTimeout(() => { setOpen(false) }, 400)
                }


                // if the icon refrence has a class name of true which is determined by the open state and if the element clicked has a class named 'nav control'
                else if (icon.current.classList.contains('true') && e.target.classList.contains('nav-control')) {
                    setContent(false)
                    setTimeout(() => { setOpen(false) }, 400)
                }
            }
        }, 100)

        if (open === true) { }
        else {
            setTimeout(() => {
                setOpen(true)
                setContent(true)
            }, 200)
        }
    }

    return (
        <li ref={icon} className={`nav-event nav-control ${open} nav-item`}>
            <a href="#" className="nav-event nav-control icon-button" id='icon' onClick={(e) => { handleOpenClick(e) }}>
                {props.icon}
            </a>

            {/* {open && props.children} */}
            {/* https://stackoverflow.com/questions/64732498/how-to-pass-a-prop-to-children-in-react */}
            {open && React.cloneElement(props.children, { content: content, menu: props.menu })}
        </li>
    );
}

function DropdownMenu(props) {
    const [activeMenu, setActiveMenu] = useState(props.menu);
    const [menuHeight, setMenuHeight] = useState(null);
    const { pageState, userState } = useContext(UserContext)
    const [user, setUser] = userState

    const [pageId, setPageId] = pageState


    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])


    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (

            <>
                {props.dropLink ?


                    <Link to={props.dropLink} className="menu-item" onClick={() => { props.handleUser && setUser({}) && localStorage.removeItem('userId') }}>
                        <span className="icon-button">{props.leftIcon}</span>
                        {props.children}
                        <span className="icon-right">{props.rightIcon}</span>
                    </Link>


                    :



                    <a href='#' className={`nav-event menu-item`} onClick={(e) => { e.preventDefault(); props.goToMenu && setActiveMenu(props.goToMenu) }}>
                        <span className="nav-event icon-button">{props.leftIcon}</span>
                        {props.children}
                        <span className="nav-event icon-right">{props.rightIcon}</span>
                    </a>


                }

            </>



        );
    }

    return (
        <div className={`nav-event ${props.content} dropdown-small`} id='dropDown' style={{ height: menuHeight }} ref={dropdownRef}>


            {/* Main */}
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="nav-event menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="nav-event menu">
                    <DropdownItem leftIcon={<Pokeball />} dropLink='/search'>Search</DropdownItem>

                    <DropdownItem leftIcon={<Pokeball />} dropLink='/chart'>Chart</DropdownItem>

                    {user.id ?


                        <>
                            <DropdownItem leftIcon={<OnePiece />} dropLink='/favorites'>Favorites</DropdownItem>

                            <DropdownItem leftIcon={<Totoro />} dropLink='/watched'>watched</DropdownItem>

                            <DropdownItem leftIcon={<DBZ />} dropLink='/login' handleUser={true} >Logout</DropdownItem>
                        </>

                        :

                        <>

                            <DropdownItem leftIcon={<JUJU />} dropLink='/signup'>Signup</DropdownItem>

                            <DropdownItem leftIcon={<LUNA />} dropLink='/login'>Login</DropdownItem>

                        </>

                    }

                    <DropdownItem
                        leftIcon={<PlusIcon />}
                        rightIcon={<ChevronIcon />}
                        goToMenu="Top Anime"
                    >
                        Top Anime
                    </DropdownItem>

                    {/* {currentWindow === pageId &&
                        <DropdownItem
                            leftIcon={<PlusIcon />}
                            rightIcon={<ChevronIcon />}
                            goToMenu="Anime Details">
                            Anime Details
                        </DropdownItem>
                    } */}



                </div>
            </CSSTransition>




            {/* Top Anime */}
            <CSSTransition
                in={activeMenu === 'Top Anime'}
                timeout={500}
                classNames="nav-event menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="nav-event menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2 className={`nav-event`}>Top Anime</h2>
                    </DropdownItem>

                    <DropdownItem dropLink='/top/tv/1' leftIcon={<MOMO />}>TV</DropdownItem>

                    <DropdownItem dropLink='/top/airing/1' leftIcon={<MOMO />}>airing</DropdownItem>

                    <DropdownItem dropLink='/top/upcoming/1' leftIcon={<MOMO />}>upcoming</DropdownItem>

                    <DropdownItem dropLink='/top/movie/1' leftIcon={<MOMO />}>Movie</DropdownItem>

                    <DropdownItem dropLink='/top/special/1' leftIcon={<MOMO />}>special</DropdownItem>

                    <DropdownItem dropLink='/top/ova/1' leftIcon={<MOMO />}>ova</DropdownItem>
                </div>
            </CSSTransition>


            {/* Anime Details */}
            <CSSTransition
                in={activeMenu === 'Anime Details'}
                timeout={500}
                classNames="nav-event menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="nav-event menu">
                    {/* <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2 className='nav-event'>Anime Details</h2>
                    </DropdownItem> */}

                    <DropdownItem dropLink={`/anime/${pageId}/episodes/1`} leftIcon={<NOFACE />}>Episodes</DropdownItem>

                    <DropdownItem dropLink={`/anime/${pageId}/pictures`} leftIcon={<NOFACE />}>Pictures</DropdownItem>

                    <DropdownItem dropLink={`/anime/${pageId}/characters_staff`} leftIcon={<NOFACE />}>Characters</DropdownItem>

                    <DropdownItem dropLink={`/anime/${pageId}/videos`} leftIcon={<NOFACE />} >Videos</DropdownItem>

                    <DropdownItem dropLink={`/anime/${pageId}/recommendations`} leftIcon={<NOFACE />} >Recommendations</DropdownItem>

                    <DropdownItem dropLink={`/anime/${pageId}`} leftIcon={<NOFACE />} >Anime Page</DropdownItem>
                </div>
            </CSSTransition>




        </div>
    );
}

export default HeaderSmall;