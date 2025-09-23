# 함께 사서, 알뜰하게 나누는 소비, 소분소분

## ⚙️ 기술 스택
- 코어: TypeScript, Next.js
- 스타일링: Tailwind CSS
- 상태 관리: Redux
- 테스트: Jest-ts
- CI/CD: GitHub Actions, Husky, lint-staged

## 🌿 Git Convention

### 🌱 Commit/Issue Message Convention

- feat : 새로운 기능 추가  
- fix : 버그 수정  
- docs : 문서 수정 (README.md 등)  
- style : 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등), 기능 수정이 없는 경우  
- design : 사용자 UI 디자인 변경 (CSS 등)  
- test : 테스트 코드, 리팩토링 테스트 코드 추가  
- refactor : 코드 리팩토링  
- build : 빌드 파일 수정  
- ci : CI 설정 파일 수정  
- perf : 성능 개선  
- chore : 빌드 업무 수정, 패키지 매니저 수정 (gitignore 수정 등)  
- rename : 파일 혹은 폴더명을 수정만 한 경우  
- remove : 파일을 삭제만 한 경우  
- setting : 프로젝트 세팅 관련 작업  
- comment : 주석 추가 및 변경  

### 🌱 Branch Convention

1. **main 브랜치**: 배포를 위한 브랜치

2. **dev 브랜치**: 개발 통합 브랜치

3. **feature 브랜치**: 기능 단위로 개발하는 브랜치
  - 네이밍: `feature/이슈번호-기능명`
  - 예시
     - `feature/#11-login`
     - `fix/#13-login`
