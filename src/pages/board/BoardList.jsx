import React, { useState, useEffect, useCallback, useRef } from 'react';
import URL from 'constants/url';

function BoardList(){

    const [listTag, setListTag] = useState([]);

    const retrieveList = useCallback((searchCondition) => {
        console.groupCollapsed("BoardList.retrieveList");

        const retrieveListURL = '/board'+EgovNet.getQueryString(searchCondition);
        const requestOptinos = {
              method : "GET"
            , header : {
                'Content-Type' : 'application/json'
            }
        }

        EgovNet.reqeustFetch(retvieveListURL, requestOptions,
        (resp) => {
            // setMasterBoard(resp.result.brdMatrVO);
            // setPaginationInfo(resp.result.paginationInfo);
            
            let mutListTag = [];

            const resultCnt = parseInt(resp.result.resultCnt);
            const currentPageNo = resp.result.paginationInfo.currentPageNo;
            const pageSize = resp.result.paginationInfo.pageSize;

            //리스트 항목 구성
            resp.result.resultList.forEach(function (item, index) {
                if(index === 0) mutListTag = [];    //목록 초기화
                const listIdx = itemIdxByPage(resultCnt, currentPageNo, pageSize, index);

                mutListTag.push(
                    
                );

            });
            if(!mutListTag.length) mutListTag.push(<p className="no_data" key="0">검색된 결과가 없습니다.</p>); //게시판 목록 초기값
            setListTag(mutListTag);
        },
        function (resp){
            console.log("err response : " , resp);
        }

        );
        console.groupEnd("BoardList.retrieveList()");
    }, []);

    return(
        <div className="container">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li>Home</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">

                    <div className="contents NOTICE_LIST" id="contents">
                        {/* <!-- 본문 --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">자유게시판</h1>
                        </div>

                        {/* <!-- 게시판목록 --> */}
                        <div className="board_list BRD002">
                            <div className="head">
                                <span>글번호</span>
                                <span>제목</span>
                                <span>작성자</span>
                                <span>작성일</span>
                                <span>조회수</span>
                            </div>
                            <div className="result">
                                { listTag }
                            </div>
                        </div>
                        {/* <!--// 게시판목록 --> */}


                        {/* <!--// 본문 --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardList;