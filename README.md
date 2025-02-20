## 초대할 어플리케이션
- 깃허브
- 슬랙
- 트렐로
- 피그잼
- 카톡

## 0. 인텔리제이 설치

## 1. 몽고DB 서버 구현(http://localhost:27017)
```
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=NodeProject
```
## 2. 네오포제이 서버 구현(bolt://localhost:7687)
```
spring.neo4j.uri=bolt://localhost:7687
spring.neo4j.authentication.username=neo4j
spring.neo4j.authentication.password=KKKB2025
```
## 3. 오라마 서버 구현(http://localhost:11434)
```
// WebClient를 DI로 주입받아 초기화
public GenerativeAiUtil(WebClient.Builder webClientBuilder) {
this.webClient = webClientBuilder.baseUrl("http://localhost:11434").build();
}
```
## 4. 포스트맨 설치(백서버 로직 잘 돌아가는지 확인하는 프로그램)

# [백엔드]
* 종속성 체크(JAVA 17)
* 종속성 클린 빌드
```
./gradlew clean build
```

# [프론트엔드]
* npm 환경 설정
```
npm install
npm run dev
```
* 크롬에서 localhost:5173 실행 (edited)
