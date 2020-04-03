
# UX Auto Guide (2019.06.04)

###### 문서 소개
- UX Auto Guide 문서는 markdown 형식으로 작성됩니다. 해당 가이드는 pug, sass 버전에 관한 가이드 입니다. 산출물 제출용인 html, css 가이드는 prototype.html 에 직접 작성합니다.

###### 가이드 목차
- 폴더 및 파일 설명
- 텍스트 번역 가이드
- 네이밍 규칙

## 폴더 설명
폴더 | 설명
----- | -----
_src/ | www 에 생성되지 않습니다. 웹퍼블리싱에 필요한 소스 관리.
_src/_js/  |  각종 js 모음. 사용할 파일은 dev/inc/js/ 폴더로 복사 한다. 파일 설명은 파일이 너무 많아서 js 파일은 google 에서 이름으로 검색하면 됨.
_src/_pug/  |  pug 관련 세팅 파일 모음 (extend 등)
_src/_scss/  |  sass 관련 세팅 파일 모음
_src/doc/  |  가이드 문서등

## pug 파일설명
파일 | 설명
----- | -----
_src/_pug/_extend_html5.pug  | 레이아웃이 설정되어있는 기본 extend 파일.
_src/_pug/_extend_cl.pug  |  코딩리스트를 위한 extend 파일.
_src/_pug/_mixin.pug  | pug 믹스인 모음 파일
_src/_pug/_seo.pug  | 페이지의 title, keywords, description, og: tag 등의 내용을 한번에 관리하는 페이지.
_src/_pug/_setting.pug  | _mixin.pug, _seo.pug 포함하여 extend 파일에서 불러 와서 사용되는 파일들을 세팅하는 파일.
_guide.pug  | 코딩 스타일 가이드
prototype.pug | 코딩 프로토타입 (_guide.pug 파일이 인클루드 되어있음.)
cl.pug | 코딩리스트 (카테고리 별로 _c01.pug, _c02.pug 등으로 분리 됨.)


## sass 파일설명
파일 | 설명
----- | -----
_mixin.scss  |  sass 믹스인 파일
magic.scss  |  css3 애니메이션 모음. 필요시 inc/css 로 복사하기
swiper.scss  | swiper.min.js 사용시 inc/css 로 복사하기
_setting.scss  | pug 와 마찬가지로 sass 관련 설정 파일. _mixin 소스 및 css sprite 스타일이 세팅 되어 있다.

## gulp 설정 파일설명
파일 | 설명
----- | -----
.csscomb.json | sass 에서 css 로 변환될때 css 속성을 정리해주는 json 파일
.gitignore | git 에서 파일을 주고 받을때 불필요한 파일을 주고 받지 않도록 처리해주는 파일
config.js | gulpfile.js 에 설정된 경로등을 따로 관리하는 파일
gulpfile.js | gulp 를 구동시키기 위한 설정 파일
package.json | gulp 에 필요한 패키지를 설치하기 위한 목록을 관리하는 파일
README.md | gulp 실행방법등을 안내해주는 파일
* 설명이 없는 파일들은 사용되지 않는 파일들

## 텍스트 번역 가이드

국문 | 영문 | 국문 | 영문
----- | ----- | ----- | -----
새창열기	| Opens in new window | 선택됨 | Selected
축소됨  | Reduced  |  확장됨 | Expanded
전체메뉴 열기 | Open entire menu | 전체메뉴 닫기  | Close entire menu
계열사 선택 퀵메뉴 | Affiliate selection quick menu | 페이지 상단으로 이동  | Go to top
첫 페이지	|	First page | 이전 페이지 | Previous page
다음 페이지  |	Next page | 마지막 페이지  |	Last page
이전 컨텐츠  |  Previous |  다음 컨텐츠 | Next
왼쪽으로 컨텐츠 스크롤  |	Scroll contents to the left | 오른쪽으로 컨텐츠 스크롤 | Scroll contents to the right
언어선택  |	Language selection |  |
국문 | Korean  | 영문  | English  |
언어선택 영문 페이지 바로가기  |  Language selection: See website in English | 언어선택 국문 페이지 바로가기  | Language selection: See website in Korean
국문 페이지 바로가기  |  Go to website in Korean |  영문 페이지 바로가기 | Go to website in English
검색 확장됨  |  Search expanded | 검색 축소됨  | Search reduced
팝업 열기  | Open popup  |  팝업 닫기 | Close popup
첨부파일 다운로드  | Download attachment  | 영상보기  | View video
시작날짜를 년월일형식으로 숫자 8자리로 입력해 주세요  |  Please enter the start date in 8 digits (yyyy/mm/dd). | 종료날짜를 년월일형식으로 숫자 8자리로 입력해 주세요  | Please enter the end date in 8 digits (yyyy/mm/dd).
시작날짜를 선택해 주세요  |  Please select the start date. |  종료날짜를 선택해 주세요 |  Please select the end date.
시작날짜 선택  |  Select start date | 종료날짜 선택  | Select end date
검색 조건 선택  | Select search criteria  | 검색어 입력  | Enter search term
검색어를 입력해주세요  |  Please enter the search term. | 검색닫기  | Close search
공유 url복사  |  Copy URL to share |  공유 페이스북 |  Share in Facebook
공유 트위터  | Share in Twitter  | 공유 지메일  | Share in Gmail
공유상자 열기  |  Open sharing frame |  공유상자 닫기 | Close sharing frame
땡땡땡 새창열림  | Opens 땡땡땡 in a new window  | 컨텐츠 바로가기  | Go to the content
  |   |   |

## 네이밍
### 네이밍 참고
- 아래 단어들을 참고로 조합하여 네이밍 합니다.
- 예) list-tit, mypage-wrap, btn-prev, bu-arrow, box-list, btn-more, step-group

### 영역구분
영역구분 | 영역구분
----- | -----
wrap | area
group | section
container | layout
body | head
footer | article
inner |

### 형태
형태 | 단어 | 형태 | 단어
----- | ----- | ----- | -----
버튼 | btn | 박스 | box
블릿 | bu | 아이콘 | ico
제목 | title, tit | 문장 | txt
이미지 | img, image, images | 목록 | list
네비게이션 | gnb, lnb, snb, menu, nav | 탭 | tab
테이블 | table, tbl | 컨텐츠 | content, cont
팝업 | popup, pop | 레이어 | layer
페이지 | page | 썸네일 | thumb
라인 | line | 점 |  dot
폼 | form

### 의미
의미 | 단어 | 의미     | 단어 | 의미 | 단어 | 의미     | 단어
------ | --- | ------- | --- | ------- | --- | ------- | ---
읽기 | read | 쓰기 | write | 수정 | modify | 삭제 | del, delete
답변, 답글 | reply | 댓글 | comment | 취소 | cancel | 검색 | search
찾기 | find | 등록 | reg, registration | 확인 | confirm | 전송 | submit
업로드 | upload | 다운로드 | download | 설치 | install, setup | 파일 | file
정지 | stop | 실행 | run, play | 이전 | prev | 다음 | next
위로 | up | 아래로 | down | 새로고침 | refresh | 열기 | open
닫기 | close | 확대 | zoom | 축소 | reduction | 펼치기 | spread
접기 | unfold | 잠금 | lock | 해제 | unlock | 스텝 | step
과정 | process | 카운트 | count | 마지막 | last, end | 처음 | first
로고 | logo | 집 | home | 체크 | check | 상세 | desc, detail
라운드 | round | 사각 | square | 원형 | circle | 화살 | arrow
별 | star | 숫자 | num, number | 영문 | eng, en, english | 한글 | kor, ko, korean
일어 | jp, japanese, jpn | 중어 | ch, chinese | 신규 | new | 업데이트 | update
수평 | h | 수직 | v | 광고 | ad | 강조 | spot, point
좀더 | more | 달력 | calender | 계산기,계산 | calculator, calc | 가리는 영역, 딤드관련 | dimm
링크 | link | 그림자 | shadow | 순위 | rank, ranking


### 상태
상태 | 단어
------ | ---
비활성 | off, inactive
활성 | on, active
오버 | over
포커스 | focus
체크 | checked
영역 선택 불가 | disabled
