UX AUTO GULP 사용 가이드
======================

- _src/doc/guide.md 파일을 열면 가이드 내용 볼 수 있음.
- md 파일은 markdown 파일로 관련 뷰어가 있어야 볼 수 있음.
- 직접 보는 방법은 https://git.etribe.co.kr/ux/ux_auto_gulp 에서 dev 폴더로 직접 들어가서 _src/doc/guide.md 파일을 클릭하면 볼 수 있음.

## 인터넷이 안되는 환경에서 gulp를 실행하기 위해 필요한 것들
1. node js
2. 프로젝트 폴더의 node_modules 필요
3. 윈도우PC -> C:/Users/사용자이름/AppData/Roaming/nvm/버전폴더 전부복사하여 가져가기
4. Mac OS -> /Users/사용자이름/.nvm/versions/node/버전폴더 전부복사하여 가져가기
- 참고로 윈도우PC 의 사용자 이름은 윈도우 설치시 영문으로 만들어야 함

## 환경 설정

package.json 내에 name 속성에 프로젝트 이름을 넣어주세요.
이 이름은 uxdev.etribe.co.kr에 파일을 올릴 경우에 겹치지 않은 이름이어야 합니다.

## 설치 방법

### nvm 설치
nvm 을 이용하면 node.js 의 버전을 쉽게 변경할 수 있습니다. nvm 을 설치하기전에 먼저 설치된
node.js를 **삭제**해주어야 합니다.

> NVM 설치 방법
> * windows : https://sharryhong.github.io/2016/12/20/nodejs-nvm/
> * mac : https://gist.github.com/falsy/8aa42ae311a9adb50e2ca7d8702c9af1

UX Auto Gulp 는 현재 v8.9.4 node.js 버전에 최적화되어 있습니다. 아래와 같이 설치해주세요.
```javascript
$ nvm install v.8.9.4
$ nvm use 8.9.4
// 노드버전 확인
$ node -v
v8.9.4
```
UX Auto Gulp 참고사항
```html
2020년 1월 29일 package.json 내에 모듈을 최신으로 업데이트 하였습니다.
노드버전은 v8.9.4 상위 버전을 사용해도 됩니다.
단, 노드버전 변경시 기존의 node_modules 폴더는 삭제해주세요.
변경된 노드버전에서 npm install 다시 하면 gulp 실행 됩니다.
```


### gulp-cli 설치

cmd실행 후
> npm i -g gulp-cli

입력(실행)합니다.

> [참고] nvm 으로 여러버전의 노드 사용시 버전별로 npm i -g gulp-cli 가 실행되어야 합니다.

### 생성한 git 폴더의 node_modules설치

cmd로 터미널을 연 후
> npm install --save-dev

입력하거나

<!-- node_modules.zip 압축 해제합니다.(windows 7 64bit 권장) - 구버전 -->
node_modules_20170829.zip 압축 해제합니다.(windows 7 64bit 권장)

*mac os 환경에서는 xcode 설치 팝업이 뜨면 설치합니다.*

### 실행방법

cmd로 터미널을 연 후
> cd 생성한 git 폴더의 경로

> ex)
> * cd Desktop/ux_auto_gulp
> * cd d:/user/ux_auto_gulp

입력하면 해당 git 폴더가 로드(이동)됩니다.

이동 후

> gulp --reloadable

입력(실행)합니다.

--reloadable 옵션을 주면, 파일 수정이 감지되면 자동으로 브라우저에 결과를 반영합니다.

이 기능을 원치않으면 옵션을 빼면됩니다.

#### gulp task 예시

> gulp all

모든 jade(pug), less 파일을 변환합니다.

> gulp deploy

설정한 경로(projectName과 ftp 설정)로 ftp 업로드합니다.

기본설정은 uxdev.etribe.co.kr/프로젝트이름

> gulp bak

백업하기

## 최근 업데이트 내용 (2020.01.29)
- gulp 실행시 __etribe_ux 폴더에 파일 자동 백업
- package.json 모듈 업데이트
- 불필요한 모듈 및 소스 삭제
- 윈도우 PC 이미지 렌더링 오류 수정
- html 스타일 정리 모듈 변경  (jsbeautify -> gulp prettier)
- mac os 와 windows10 에서의 스프라이트 이미지 다시 재배치 되는 문제 수정

## 최근 업데이트 내용 (2019.02.26)
- css sprite pc와 mobile용으로 분리 하여 사용 할 수 있도록 추가 및 수정.
- pug 에서 html로 변환시 span, a 태그등 인라인 태그가 단락 구분이 되지 않던 부분 수정.
- 전체적인 파일 구조 변경
- browser-sync 버전 업데이트. 해당 버전끼리는 여러개의 gulp 실행시 자동으로 다음 포트로 변경해줌.
