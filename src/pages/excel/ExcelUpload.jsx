import { SERVER_URL } from 'config';
import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import * as EgovNet from 'api/egovFetch';
import * as xlsx from 'xlsx';

function ExcelUpload() {

    const formData = new FormData();

    const uploadToDatabase = useCallback((file) => {
        console.groupCollapsed("upload.uploadToDatabase()");

        formData.append("file", file); // FormData 객체에 파일 추가

        const retrieveListURL = '/excel/upload';
        const requestOptions = {
            method: "POST",
            body: formData // body에 FormData 객체를 직접 전달
        }

        EgovNet.requestFetch(retrieveListURL, requestOptions, (resp) => {
            if(resp != null) {

                if(resp.resultCode != 200) {
                    alert("해당 데이터가 테이블에 정상적으로 입력되지 않았습니다.");
                    window.location.reload();
                    return;
                }

                if(resp.result.sucCnt > 0) {
                    alert("해당 데이터가 테이블에 정상적으로 입력되었습니다.");
                    
                }
            }
            window.location.reload();
        });

        console.groupEnd("upload.uploadToDatabase()");
    }, []);

    const readExcel = (file) => {
        console.log('readExcel file ' + file);
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        console.log('readExcel fileReader ' + fileReader);
        // fileReader.onload = (e) => {
        //     if (!e.target) return;
        //     uploadToDatabase(file);
        // };
    };

    const handleExcelFileChange = (e) => {
        console.log('handleExcelFileChange ');
        if (!e.target.files) return;
        const file = e.target.files[0];
        // const maxSize = 3 * 1024 * 1024;
        // const fileSize = e.target.files[0]?.size;
        // if (fileSize > maxSize) {
        //     alert("첨부 파일 사이즈는 3MB 이내로 등록 가능합니다.");
        //     return;
        // }
        readExcel(file);
    };

    const generateExcel = (e) => {
        console.log('handleExcelFileChange ');
        if (!e.target.files) return;
        const file = e.target.files[0];
        
        // const workbook = new ExcelJS.Workbook();
        // const sheet = workbook.addWorksheet('Employee List');

        // // 헤더 추가
        // sheet.addRow(['', '이름', '성별', '전화번호']);

        // // 데이터 추가
        // data.forEach(emp => {
        //     sheet.addRow([emp.e_code, emp.e_name, emp.e_gender, emp.e_phone]);
        // });

        // // 엑셀 파일을 바이트 배열로 변환
        // return workbook.xlsx.writeBuffer().then(buffer => buffer);

        const xlsx = require('xlsx');

        const workbook = xlsx.readFile('.xlsx'); // 액샐 파일 읽어오기
        const firstSheetName = workbook.SheetNames[0]; // 첫 번째 시트 이름 가져오기
        const firstShee = workbook.Sheets[firstSheetName]; // 시트 이름을 이용해 엑셀 파일의 첫 번째 시트 가져오기
    
        const firstSheeJson = xlsx.utils.sheet_to_json(firstShee); // 첫 번째 시트 내용을 json 데이터로 변환
    
        console.log(firstSheeJson);
    
    };

    return (
        <div className="container">
            <div className="c_wrap">
                <div className="layout">
                    <div className="contents BOARD_LIST" id="contents">
                        <>
                            <div className="excel_texta">DB에 올리고자하는 엑셀파일을 첨부합니다</div><br></br>
                            <div>
                                <Form.Control
                                    type='file'
                                    className='shadow-none'
                                    accept='.xlsx, .xls'
                                    onChange={(e) => { generateExcel(e) }}></Form.Control>
                                <input type="button" onClick={(e)=>{ handleExcelFileChange(e) }}/>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExcelUpload;