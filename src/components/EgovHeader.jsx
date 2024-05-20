import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import * as EgovNet from 'api/egovFetch';

import URL from 'constants/url';
import CODE from 'constants/code';
import { getSessionItem, setSessionItem } from 'utils/storage';

function EgovHeader() {
    console.group("EgovHeader");
    console.log("[Start] EgovHeader ------------------------------");

    const sessionUser = getSessionItem('loginUser');
    const sessionUserId = sessionUser?.id;
    const sessionUserName = sessionUser?.name;
    const sessionUserSe = sessionUser?.userSe;

    const navigate = useNavigate();

    const logInHandler = () => { // 로그인 정보 없을 시
        navigate(URL.LOGIN);
    }
    const logOutHandler = () => {// 로그인 정보 존재할 때
        const logOutUrl = '/auth/logout';
        const requestOptions = {
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include',
        }
        EgovNet.requestFetch(logOutUrl, requestOptions,
            function (resp) {
                console.log("===>>> logout resp= ", resp);
                if (parseInt(resp.resultCode) === parseInt(CODE.RCV_SUCCESS)) {
                    //onChangeLogin({ loginVO: {} });
                    setSessionItem('loginUser', {"id":""});
                    setSessionItem('jToken', null);
                    window.alert("로그아웃되었습니다!");
                    navigate(URL.MAIN);
                }
            }
        );
    }

    console.log("------------------------------EgovHeader [End]");
    console.groupEnd("EgovHeader");

    return (
        // <!-- header -->
        <div className="header">
            <div className="inner">
                <h1 className="logo">
                    <Link to={URL.MAIN} className="w">HOME🏠</Link>
                    <Link to={URL.MAIN} className="m">HOME🏠</Link>
                </h1>

                <div className="gnb">
                    <h2 className="blind">주메뉴</h2>
                    <ul>
                        <li><NavLink to={URL.BOARD} className={({ isActive }) => (isActive ? "cur" : "")}>게시판</NavLink></li>
                        <li><NavLink to={URL.EXCEL} className={({ isActive }) => (isActive ? "cur" : "")}>엑셀 다운로드/업로드</NavLink></li>
                        {sessionUserSe ==='USR' &&
                            <li><NavLink to={URL.ADMIN} className={({ isActive }) => (isActive ? "cur" : "")}>사이트관리</NavLink></li>
                        }
                    </ul>
                </div>

                {/* <!-- PC web에서 보여지는 영역 --> */}
                <div className="user_info">
                    {/* 로그아웃 : 로그인 정보 있을때 */}
                    {sessionUserId &&
                        <>
                            <span className="person">{sessionUserName} </span> 님이, 관리자로 로그인하셨습니다.
                            <button onClick={logOutHandler} className="btn">로그아웃</button>
                        </>
                    }
                    {/* 로그인 : 로그인 정보 없을 때 */}
                    {!sessionUserId &&
                        <button onClick={logInHandler} className="btn login">로그인</button>
                    }
                </div>
                {/* <!--// PC web에서 보여지는 영역 --> */}

            </div>
           </div>
        // <!--// header -->
    );
}

export default EgovHeader;