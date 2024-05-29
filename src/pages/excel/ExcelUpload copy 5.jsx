import { SERVER_URL } from 'config';
import React, { useState, useCallback, useRef } from 'react';
import { Form } from 'react-bootstrap'
import URL from 'constants/url';
import axios from 'axios';
import * as XLSX from 'xlsx';
//import SheetJSApp from 'components/EgovExcelLoader';

import { Link, useLocation } from 'react-router-dom';
import * as EgovNet from 'api/egovFetch';

import { EXCEL_BBS_ID } from 'config';

import { getSessionItem } from 'utils/storage';


function ExcelUpload( files ){

    const posblAtchFileNumber = 1;
    const formData = new FormData();
    
    const location = useLocation();
    // const bbsId = EXCEL_BBS_ID;
    const [masterBoard, setMasterBoard] = useState({});

    const [listTag, setListTag] = useState([]);
    const [loginVO, setLoginVO] = useState([]);

    const sessionUser = getSessionItem('loginUser');
    const sessionUserName = sessionUser?.name;
    const [boardAttachFiles, setBoardAttachFiles] = useState();

    let filesTag = [];

    // if (files !== undefined) {
    //     files.forEach(function (item, index) {
    //         filesTag.push(
    //             <React.Fragment key={index}>
    //                 <span>
    //                     <a  href={"#LINK"} onClick={function (e) {
    //                         e.preventDefault();
    //                         onClickDownFile(item.atchFileId, item.fileSn);
    //                     }} download>
    //                         {item.orignlFileNm}
    //                     </a>
    //                     <span>
    //                         [{item.fileMg}byte]
    //                     </span>
    //                 </span>
    //             </React.Fragment>
    //         );

    //         filesTag.push(<br key={["br", `${index}`].join(" ")}/>);
    //     });
    // }
    // console.log("filesTag : ", filesTag);
    console.groupEnd("EgovAttachFile");

    function onClickDownFile(atchFileId, fileSn) {
        window.open(SERVER_URL + "/file?atchFileId=" + atchFileId + "&fileSn=" + fileSn + "");
    }

    const uploadToDatabase = useCallback((file) => {
        console.groupCollapsed("upload.uploadToDatabase()");

        const retrieveListURL = '/excel/upload';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            }
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {
                console.log('retrieveListURL ' + retrieveListURL);
                console.log('requestOptions ' + JSON.stringify(requestOptions));
                console.log('resp ' + JSON.stringify(resp));
                
    //             setMasterBoard(resp.result.brdMstrVO);

    //             const resultCnt = parseInt(resp.result.sucCnt);

    //             if(resultCnt>0){
    //                 alert(resultCnt+"행을 성공적으로 적재했습니다.");
    //             } else {
    //                 alert("다시 시도해주세요.");
    //                 window.location.reload();
    //             }
            
    //         },
    //         function (resp) {
    //             console.log("err response : ", resp);
            }
        );
        console.groupEnd("upload.uploadToDatabase()");
    },[]);


    // 엑셀 파일을 읽어오고 데이터를 파싱하는 함수
    const readExcel = (file) => {
        console.log('readExcel file ' + file);
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        console.log('readExcel fileReader ' + fileReader);
        fileReader.onload = (e) => {
        if (!e.target) return;
        // const bufferArray = e.target.result;
        // const fileInformation = XLSX.read(bufferArray, {
        //     type: 'buffer',
        //     cellText: false,
        //     cellDates: true,
        // });
        // const sheetName = fileInformation.SheetNames[0];
        // const rawData = fileInformation.Sheets[sheetName];
        // const data = XLSX.utils.sheet_to_json(rawData);

        // setUploadedFileData(data);
        uploadToDatabase(file);
        };
    };

    // 파일 입력 변경 이벤트 핸들러
    const handleExcelFileChange = (e) => {
        console.log('handleExcelFileChange ');
        if (!e.target.files) return;
        console.log('e.target.files ' + JSON.stringify(e.target.files));
        const file = e.target.files[0];
        console.log('file ' + JSON.stringify(file));
        readExcel(file);
    };

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
                            {/* start */}
                            <div>
                            {/* 파일 입력 */}
                            <Form.Control
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleExcelFileChange}></Form.Control>
                            {/* <input name="file_0" id="egovComFileUploader" type="file" multiple onChange={e => onChangeFileInput(e)}></input> */}

                            {/* <input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleExcelFileChange}
                            /> */}
                            {/* <EgovAttachFile
                                fnChangeFile={(attachfile) => {
                                    console.log("====>>> Changed attachfile file = ", attachfile);
                                    // const arrayConcat = { ...boardDetail}; // 기존 단일 파일 업로드에서 다중파일 객체 추가로 변환(아래 for문으로)
									// // for ( let i = 0; i < attachfile.length; i++) {
									// 	arrayConcat[`file_${0}`] = attachfile[];
									// // }
                                    // setBoardDetail(arrayConcat);
                                    uploadToDatabase();
                                }}
                                fnDeleteFile={(deletedFile) => {
                                    console.log("====>>> Delete deletedFile = ", deletedFile);
                                    setBoardAttachFiles(deletedFile);
                                }}
                                boardFiles={boardAttachFiles}
                                // mode={props.mode} 
                                posblAtchFileNumber = {masterBoard.posblAtchFileNumber} 
                            /> */}
                            {/* 데이터베이스 적재 버튼 */}
                            {/* <button onClick={uploadToDatabase}>데이터베이스에 적재하기</button> */}
                            {/* 업로드된 파일 데이터 표시 */}
                            {/* <table>
                                <thead>
                                <tr>
                                    <th>Header 1</th>
                                    <th>Header 2</th> */}
                                    {/* 필요한 만큼 헤더 추가 */}
                                {/* </tr>
                                </thead>
                                <tbody>
                                {uploadedFileData.map((row, index) => (
                                    <tr key={index}>
                                    <td>{row.column1}</td>
                                    <td>{row.column2}</td> */}
                                    {/* 필요한 만큼 셀 추가 */}
                                    {/* </tr>
                                ))}
                                </tbody>
                            </table> */}
                            </div>
                             {/* end */}
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExcelUpload;