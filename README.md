### SW_5week

## 작업방식에 대한 설명입니다
1. 원래는 브랜치 용도가 <공통 분야>를 묶어서 작업하는 용도인거 같은데, 저희는 각 개인이 한 브랜치에서 작업하고 있으므로
2. main 브랜치를 직접 수정하진 마시고,
3. 작업을 시작할 때는 메인 브랜치에서 pull을 받아 최신 상태를 유지한 후, 그 상태에서 새로운 브랜치를 생성하여 작업을 시작한다.
4. 로컬에서 작업을 완료 한 후 
5. main 브랜치에 풀리퀘스트요청 -> 머지 해서 main 브랜치를 업데이트 
6. 3~5 작업을 반복해서 채팅창 완성

## 작업 흐름에 대한 설명 + 명령어
물론입니다! 당신의 로컬 저장소 위치를 기반으로 작업 단계를 다시 설명해 드리겠습니다.

1. 터미널을 열고 로컬 저장소 디렉토리로 이동합니다:
   ```
   cd "/path/to/your/local/repository"
   ```

2. 현재 브랜치에서 작업 중인 변경 사항을 커밋하거나 스태시(stash)합니다:
   ```
   git commit -am "Save changes" 
   ```
   또는
   ```
   git stash
   ```

3. 메인 브랜치로 전환합니다:
   ```
   git checkout main
   ```

4. 원격 저장소에서 메인 브랜치의 최신 변경 사항을 가져옵니다: (4번부터 6번까지가 main 브랜치의 내용 pull 하는 방법)
   ```
   git pull origin main
   ```

5. 자신의 작업 브랜치로 다시 전환합니다:
   ```
   git checkout your-branch-name
   ```

6. 메인 브랜치의 변경 사항을 자신의 브랜치에 병합합니다:
   ```
   git merge main
   ```

7. 이제 자신의 브랜치에서 필요한 작업을 진행합니다.

8. 작업이 완료되면 변경 사항을 커밋합니다:
   ```
   git add .
   git commit -m "Commit message"
   ```

9. 자신의 브랜치를 원격 저장소에 푸시합니다:
   ```
   git push origin your-branch-name
   ```
   
10. 허브에서 풀 리퀘스트를 생성하여 자신의 브랜치를 메인 브랜치에 병합하도록 요청합니다.


## 작업 목록

(4.3.수) 김범준: 사용자 이름 추가 기능 추가
(4.8.월) 김범준: 배경: 벚꽃 휘날리는 움직임 추가 + 분홍 배경 추가
(4.8.월) 김범준: 자신의 채팅은 오른쪽에, 다른 사람의 채팅은 왼쪽에 표시 
(4.8.월) 김범준: 채팅 입력 기능을 정 중앙으로 이동
