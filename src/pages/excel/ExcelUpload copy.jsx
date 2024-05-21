import React, { useState, useCallback, useRef } from 'react';
import URL from 'constants/url';

import { Link, useLocation } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';

import { EXCEL_BBS_ID } from 'config';

import { getSessionItem } from 'utils/storage';
import XLSX from 'xlsx';

function ExcelUpload(onJSONData){

    const location = useLocation();
    const bbsId = EXCEL_BBS_ID;
    const [masterBoard, setMasterBoard] = useState({});

    const [listTag, setListTag] = useState([]);
    const [loginVO, setLoginVO] = useState([]);

    const sessionUser = getSessionItem('loginUser');
    const sessionUserName = sessionUser?.name;

    return(
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                {/* <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.EXCEL}>엑셀 다운로드 업로드</Link></li>
                    </ul>
                </div> */}
                {/* <!--// Location --> */}

                <div className="layout">

                    <div className="contents BOARD_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        {/* <div className="top_tit">
                            <h1 className="tit_1">엑셀 업로드</h1>
                        </div>
                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2> */}

                        <>
                            <div className="excel_texta">DB에 올리고자하는 엑셀파일을 첨부합니다</div><br></br>
                            {/* <input type='file'
                                    className
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application.vnd.ms-excel" 
                                    onChange={excelLoad}
                                    /> */}
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExcelUpload;