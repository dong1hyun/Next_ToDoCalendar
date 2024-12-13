# 📆ToDoCalendar

달력에 일정을 기록하고 할 일과 완료한 일을 한 눈에 파악할 수 있도록 만든 웹 어플리케이션

배포: https://next-to-do-calendar.vercel.app

# Skills

Next, TypeScript, Tailwind CSS, Zustand, PostgreSQL

# Major package version

Node: 20.17.0 / Next: 14.2.4

# Script

- $ dev : 개발모드로 실행
- $ build : Prisma Client를 생성 > Migration 최신화 > 빌드
- $ start : 빌드된 파일로 실행

# 배포

이 프로젝트는 [Vercel](https://vercel.com)을 통해서 배포됩니다.

### 배포 방법

1. Vercel에 접속해서 회원가입 & 로그인
2. 새 프로젝트를 생성하고 깃 리포지토리와 연결
3. 데이터베이스 생성 후 프로젝트와 연결

자세한 내용 [블로그](https://blog.naver.com/limd1238/223603534081) 참고

# 주요 기능 설명

## 🔐로그인

### Iron-Session을 이용한 암호화 쿠키 기반 로그인
![image](https://github.com/user-attachments/assets/cbc40a52-42b6-4bc4-88a7-c25978b36392)

### Next-Auth를 이용한 JWT 기반 구글 로그인
![image](https://github.com/user-attachments/assets/879b8b36-4bb8-4a59-9379-5938b2f0b6d0)

## 메인 페이지

![image](https://github.com/user-attachments/assets/7b2490e0-1854-4b5b-8ee6-0484e8ba9f1a)
1. 달력에서 완료된 업무는 초록색 채도를 통해 파악
2. 남은 업무가 있는 날짜에는 파란색 포인트가 찍혀있음 
3. 날짜 선택을 통해 ToDo 페이지로 넘어갈 수 있음
4. 차트로 남은 업무 파악

## ToDo 페이지

![image](https://github.com/user-attachments/assets/55023fe2-7208-403d-8e8a-e5c790fee52b)
![image](https://github.com/user-attachments/assets/a81fda82-2eb5-4fe6-a99b-a30d12386bea)

1. 플러스 버튼을 통해 할 일 추가 / 할 일 카테고리 설정
2. 완료/ 취소 선택
3. 재생 버튼 클릭으로 업무 진행 시간 측정


### History
[1.0.0](https://github.com/dong1hyun/Next_ToDoCalendar/wiki/1.0.0-V)<br>
[1.1.0](https://github.com/dong1hyun/Next_ToDoCalendar/wiki/1.1.0-V)
