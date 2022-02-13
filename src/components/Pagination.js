import React from 'react';
import { Link } from 'react-router-dom'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import './Pagination.scss'


const Pagination = (props) => {
    const page = parseInt(props.page)
    const url = props.url
    const pageLimit = props.pageLimit
    return (
        <>

            {pageLimit > 1 &&


                <div className='pagination'>

                    {page > 1 &&

                        <Link to={`${url}/${page > 0 && page - 1}`} className='prev'><i><FaAngleLeft /></i></Link>
                    }


                    {pageLimit > 10 ?

                        <>
                            {[...Array(pageLimit)].map((item, i) => {

                                const pageNum = i + 1
                                return (


                                    <>
                                        {pageNum === 1 && page != pageNum &&

                                            <>
                                                <Link
                                                    to={`${url}/${1}`}
                                                    className={`num`}
                                                >
                                                    1
                                                </Link>

                                                <span className='num'>...</span>
                                            </>



                                        }




                                        {page != 1 ?

                                            <>
                                                {pageNum >= page && pageNum <= page + 7 &&

                                                    <Link
                                                        to={`${url}/${pageNum}`}

                                                        className={`
                                                                ${page === 1 && pageNum === 1 ? 'firstNum' : ''} ${pageLimit != pageNum ? 'num' : page === pageLimit ? 'lastNum' : 'num'} ${page === pageNum ? 'active' : ''}`}
                                                    >

                                                        {pageNum}

                                                    </Link>
                                                }
                                            </>



                                            :

                                            <>
                                                {pageNum >= page && pageNum <= page + 9 &&

                                                    <Link
                                                        to={`${url}/${pageNum}`}

                                                        className={`
                                                                ${page === 1 && pageNum === 1 ? 'firstNum' : ''} ${pageLimit != pageNum ? 'num' : page === pageLimit ? 'lastNum' : 'num'} ${page === pageNum ? 'active' : ''}`}
                                                    >

                                                        {pageNum}

                                                    </Link>
                                                }
                                            </>
                                        }
                                    </>

                                )
                            })}
                        </>
                        :
                        <>
                            {[...Array(pageLimit)].map((item, i) => {
                                return (

                                    <Link

                                        to={`${url}/${i + 1}`}

                                        className={`
                                                ${page === 1 && i + 1 === 1 ? 'firstNum' : ''} ${pageLimit != i + 1 ? 'num' : page === pageLimit ? 'lastNum' : 'num'} ${page === i + 1 ? 'active' : ''}`}
                                    >

                                        {i + 1}

                                    </Link>
                                )
                            })}
                        </>
                    }

                    {page < pageLimit &&
                        <Link to={`${url}/${page + 1}`} className='next'><i><FaAngleRight /></i></Link>
                    }


                </div>



            }

        </>
    );
};

export default Pagination;
