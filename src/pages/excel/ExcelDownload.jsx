import React, { useState, useCallback, useRef } from 'react';
import URL from 'constants/url';

import { Link, useLocation } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';

import { EXCEL_BBS_ID } from 'config';

import { getSessionItem } from 'utils/storage';

function ExcelLoader(){

    const location = useLocation();
    const bbsId = EXCEL_BBS_ID;
    const [masterBoard, setMasterBoard] = useState({});

    const [listTag, setListTag] = useState([]);
    const [loginVO, setLoginVO] = useState([]);

    const sessionUser = getSessionItem('loginUser');
    const sessionUserName = sessionUser?.name;

    // const excelDownload = (data: object[], fileName: string) => {
    //     const excelFileName = `${fileName}_${formatFileNameDate(new Date())}.xlsx`;
      
    //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data); 
    //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
    //     XLSX.writeFile(wb, excelFileName);
    // };

    // const handleExcelDownload = () => {
    //     excelDownload(exampleData, 'test');
    // };

    return(
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.EXCEL}>엑셀 다운로드 업로드</Link></li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">

                    <div className="contents BOARD_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">엑셀 다운로드</h1>
                        </div>
                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2>

                        <>
                            데이터베이스에서 다운받고자하는 데이터를 엑셀파일로 내려받습니다.


                        </>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExcelLoader;