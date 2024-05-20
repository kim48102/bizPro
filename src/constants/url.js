
const URL = {
    //COMMON
    MAIN                        : "/", //메인페이지   
    
    LOGIN                       : "/login", //로그인
    ERROR                       : "/error", //로그인

    //BOARD
    BOARD                       : "/board",             //게시판
    BOARD_LIST                  : "/board/boardlist",   //게시판/게시판목록
    BOARD_MODIFY                : "/board/boardmodify", //게시판/게시판수정
    BOARD_DETAIL                : "/board/boarddetail", //게시판/게시판상세
    BOARD_CREATE                : "/board/boardcreate", //게시판/게시판등록
    BOARD_REPLY                : "/board/boardreply", //게시판/게시판등록

    //EXCEL
    EXCEL                       : "/excel",             //엑셀다운로드 업로드
    EXCEL_SELECT                : "/excel/excelselect",    //엑셀다운로드 버튼선택
    EXCEL_DOWNLOAD              : "/excel/exceldownload",   //엑셀다운로드 파일
    EXCEL_UPLOAD                : "/excel/excelupload",   //엑셀업로드 파일

    //ADMIN
    ADMIN                       : "/admin", // 사이트관리
    ADMIN_SCHEDULE              : "/admin/schedule", // 사이트관리/일정관리
    ADMIN_SCHEDULE_DETAIL       : "/admin/schedule/detail", // 사이트관리/일정관리상세
    ADMIN_SCHEDULE_CREATE       : "/admin/schedule/create", // 사이트관리/일정관리생성
    ADMIN_SCHEDULE_MODIFY       : "/admin/schedule/modify", // 사이트관리/일정관리수정

    ADMIN_BOARD                 : "/admin/board", // 사이트관리/게시판생성관리 목록
    ADMIN_BOARD_DETAIL          : "/admin/board/detail", // 사이트관리/게시판생성관리 상세
    ADMIN_BOARD_CREATE          : "/admin/board/create", // 사이트관리/게시판생성관리 등록
    ADMIN_BOARD_MODIFY          : "/admin/board/modify", // 사이트관리/게시판생성관리 상세/수정

    ADMIN_USAGE                 : "/admin/usage", // 사이트관리/게시판사용관리 목록
    ADMIN_USAGE_DETAIL          : "/admin/usage/detail", // 사이트관리/게시판사용관리 상세
    ADMIN_USAGE_CREATE          : "/admin/usage/create", // 사이트관리/게시판사용관리 등록
    ADMIN_USAGE_MODIFY          : "/admin/usage/modify", // 사이트관리/게시판사용관리 상세/수정

    ADMIN_NOTICE                : "/admin/notice/", // 사이트관리/공지사항관리 목록
    ADMIN_NOTICE_DETAIL         : "/admin/notice/detail", // 사이트관리/공지사항관리 상세
    ADMIN_NOTICE_CREATE         : "/admin/notice/create", // 사이트관리/공지사항관리 등록
    ADMIN_NOTICE_MODIFY         : "/admin/notice/modify", // 사이트관리/공지사항관리 수정
    ADMIN_NOTICE_REPLY          : "/admin/notice/reply", // 사이트관리/공지사항관리 답글 등록

    ADMIN_GALLERY               : "/admin/gallery", // 사이트관리/사이트갤러리관리
    ADMIN_GALLERY_DETAIL        : "/admin/gallery/detail", // 사이트관리/사이트갤러리관리 상세
    ADMIN_GALLERY_CREATE        : "/admin/gallery/create", // 사이트관리/사이트갤러리관리 등록
    ADMIN_GALLERY_MODIFY        : "/admin/gallery/modify", // 사이트관리/사이트갤러리관리 수정
    ADMIN_GALLERY_REPLY         : "/admin/gallery/reply", // 사이트관리/사이트갤러리관리 답글 등록
    
	ADMIN_MANAGER               : "/admin/manager/", // 사이트관리/사이트관리자 암호변경 기능
}

export default URL;