# LeaseLens_BackEnd

### 폴더의 구조 및 역할
#### 1. config
- 데이터베이스 설정, 서버 설정 등을 포함.
- .env 파일을 최상단에 포함하고, config.js에서 불러와 전역 설정을 하나의 config.js 파일에서 진행할 수 있도록 한다.
#### 2. models
- 데이터베이스 관련 설정. index.js 파일을 제외한 나머지는 테이블 생성 및 관계설정에 관한 테이블이다.
- index.js는 db 객체에 sequelize로 생성한 table들을 넣어주고, 물리적 database에 넣어주는 역할을 한다. 각각 파일에서  생성한 테이블을 삽입해준다.
#### 3. controller
-  router에서 가져온 API Endpoint에서 이루어질 작업들을 작성하여 export한다.
-  실질적인 기능구현의 대부분을 차지할 예정.
#### 4. routes
- 기능별로 엔드포인트를 분류한다. 유사한 기능은 같은 파일에서 처리한다.
#### 5. Middlewares
> 이 부분은 controller에 들어가는 파일로 대체될 가능성이 높습니다.
- middlewares.js 파일을 통해 isLoggedIn 콜백함수, isNotLoggedIn 콜백함수 두가지를 선언합니다.
  
#### app.js
- 서버 실행 및 옵션 설정에 직접적인 역할을 하는 파일입니다. 포트번호 및 db 생성 등 중점적인 내용을 담고 있습니다.