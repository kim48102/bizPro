import React, { useState } from 'react';
import URL from 'constants/url';
import ExcelUpload from './ExcelUpload';

import { Link } from 'react-router-dom';

function ExcelLoader(){
    const [masterBoard, setMasterBoard] = useState({});

    const [jsonData, setJsonData] = useState([]);

    const hJsonData=(data)=>{
        setJsonData(data);
        console.log(data);
    }

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
                            <h1 className="tit_1">엑셀 다운로드 업로드</h1>
                        </div>
                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2>

                        <>
                        <br></br>
                            <div className="excel_text">
                                <Link to={URL.EXCEL_DOWNLOAD } className="excel_text" >다운로드</Link>
                                
                            </div>
                            <br></br>
                            <div className="excel_list"></div>
                            <br></br>
                            <div className="excel_text">
                                <span className="excel_text" >업로드</span>
                                {/* <Link to={URL.EXCEL_UPLOAD } className="excel_text" >업로드</Link> */}
                                <ExcelUpload onJsonData={hJsonData} className="excel_text" />
                            </div>
                        <br></br>
                        </>

                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExcelLoader;