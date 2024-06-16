import React, { useState, useCallback } from 'react';
import * as EgovNet from 'api/egovFetch';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

function ExcelDownload(){

    const [tableId, setTableId] = useState("");
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const downloadToDatabase = useCallback(() => {
        console.groupCollapsed("upload.downloadToDatabase()");

        const retrieveListURL = '/excel/download';
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                startDate: startDate
                , endDate: endDate
            })

        }

        EgovNet.requestFetch(retrieveListURL, requestOptions, (resp) => {
            console.log("retrieveListURL : " +  JSON.stringify(retrieveListURL));
            console.log("requestOptions : " +  JSON.stringify(requestOptions));
            if(resp != null) {

                if(resp.resultCode != 200) {
                    alert("다시 시도해주세요.");
                    window.location.reload();
                    return;
                }

                try {
                    // 데이터를 엑셀 파일로 변환
                    const worksheet = XLSX.utils.json_to_sheet(resp.result.downloadData);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                    
                    // 엑셀 파일 다운로드
                    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
                    saveAs(blob, `${formattedDate}_${hours}${minutes}${seconds}_data.xlsx`);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            }

        });

        console.groupEnd("upload.downloadToDatabase()");
    }, [startDate, endDate]);

    const handleExcelDownload = () => {
        downloadToDatabase();
    };


    return (
        <div className="container">
            <div className="c_wrap">
                <div className="layout">
                    <div className="contents" id="contents">
                        <div className="excel_texta">DB에서 가져오고자 하는 조건의 날짜를 선택합니다. (필수)</div><br></br>
                        <div>
                            <>
                                <DatePicker
                                    locale={ko}
                                    dateFormat="yyyy-MM-dd"
                                    className="datepicker"
                                    onChange={date => setStartDate(date)}
                                    selected={startDate}
                                    selectedStart
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            </>
                            <>
                                <DatePicker
                                    locale={ko}
                                    dateFormat="yyyy-MM-dd"
                                    className="datepicker"
                                    onChange={date => setEndDate(date)}
                                    selected={endDate}
                                    selectedEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                />
                            </>
                            {/* <!-- 버튼영역 --> */}
                            <div className="excel_button">
                                <div className="left_col btn1">
                                    <div className="btn btn_skyblue_h46 w_100" onClick={(e) => { handleExcelDownload(); }}>다운로드</div>
                                </div>
                            </div>
                            {/* <!--// 버튼영역 --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExcelDownload;