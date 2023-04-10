# Study Planner

## 🌎 Website: https://my-study-planner.netlify.app/

![image](https://user-images.githubusercontent.com/91646438/172052043-ad896f98-eb37-4792-ae5f-1f71a3d7a717.png)

## 💡 Topic

### **오늘의 공부 계획 기록 및 쉬는 시간 음악 타이머 프로젝트**입니다.
- 공부 계획 생성, 수정, 삭제가 가능합니다.
- 원하는 음악과 타이머 시간을 설정할 수 있습니다. 재생 버튼을 클릭하면 설정한 시간 동안 음악이 재생됩니다.

# 📌 Key Function

주요 기능에 대해 간략하게 설명드리겠습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/db4a1f7d-a5bf-465b-b38a-5d4f34ae5890/Untitled.png)

- **날짜**
    - `Date()` **-** `Date`객체는 1970년 1월 1일 UTC(국제표준시) 자정으로부터 지난 시간을 밀리초로 나타냅니다.
    - `Date.prototype.getFullYear()` ****- ****주어진 날짜의 현지 시간 기준 연도를 반환합니다.
    - `Date.prototype.getMonth()` - `Date`객체의 월 값을 현지 시간에 맞춰 반환합니다(월은 0부터 시작).
    - `Date.prototype.getDate()` - 주어진 날짜의 현지 시간 기준 일을 반환합니다.
    - `Date.prototype.getDay()` **-** 주어진 날짜의 현지 시간 기준 요일을 반환합니다.
    - `String.prototype.padStart()` **-** 10미만은 1자리이기 때문에 2자리로 맞추기 위해 사용했고, 좌측에 string “0”으로 채워 넣었습니다.
    
    ---
    

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a2af98a6-a6b5-4f57-8f14-c1f12123f8f4/Untitled.png)

- **계획 생성, 수정, 삭제 기능**
    - **생성**
        
        유저가 계획을 입력한 후 추가 버튼을 클릭하거나 Enter를 누르면 planForm에서 `submit` 이벤트가 발생하여 `submitPlan` 함수가 실행됩니다. `submitPlan()` 함수에서는 유저가 입력한 값과 `Date.now()`를 사용하여 obj 형태로 변수에 할당합니다. 이 할당한 변수를 plans라는 배열에 push 해주고, `paintPlan` 함수의 인자로 전달한 후, `savePlans`함수를 호출합니다. 
        
        `savePlans` 함수에서는 `localStorage.setItem()`을 사용해 key와 plans(여기서 plans는 `JSON.stringify()`로 obj를 string 형태로 바꾼 값)를 전달하여 `localStorage`에 저장해주면 됩니다.
        
    - **수정**
        
        유저가 수정 버튼을 클릭하면 `event.target.parentELement` 로 해당 `li`를 가져옵니다. `filter()` 메서드로 plans 안의 각 plan `id`와 해당 `li`의 `id`가 일치하는 plan을 반환한 후, 반환한 plan의 값을 planInput 안에 넣어줍니다. 그 뒤, `deletePlan` 함수를 호출하는데 이때 함수의 인자로 `event`를 전달하면 됩니다.
        
    - **삭제**
        
        유저가 삭제 버튼을 클릭하면 `event.target.parentELement` 로 해당 `li`를 가져옵니다. 
        
        `li.remove()` 로 `DOM`에서 요소를 제거합니다. `filter()` 메서드로 plans 안의 각 plan `id`와 `li`의 `id`가 일치하지 않는 모든 plan들을 모아 새로운 배열로 반환하여 plans에 할당합니다. 그 후, `savePlan` 함수를 호출하여 `localStorage`에 plans를 다시 저장하면 됩니다.
        
        ---
        

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/379808fe-e925-406b-b1f2-a075309338dd/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/02b7a291-62d3-41e3-b3a5-a400bd857a43/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1820d43d-0c16-4140-bd6a-8717602888c7/Untitled.png)

- **음악 타이머**
    - 유저가 음악을 선택하고, 타이머를 설정한 후 재생 버튼을 클릭하거나 Enter를 누르면 timeForm에서 `submit`이벤트가 발생하여 화살표 함수가 실행됩니다. 화살표 함수에서는
        - 첫째, `initTime`함수를 호출해 `hoursInput`, `minutesInput`, `secondsInput`안에 있는 값들을 가져와 모두 초로 바꾸어 `soundTime`에 더해 줍니다.
        - 둘째, `playSound` 함수를 호출해 `audio.play()`로 음악을 재생시킵니다.
        - 셋째, `printTimeForm` 함수를 호출해 인자로 `HIDDEN_PLAY_BTN`를 전달해 줍니다.
        - 넷째,  `setInterval()`로 1초마다 `soundTime` 을 각각 시간, 분, 초로 바꾸어 `formetText`함수를 호출해 인자로 `getHours`, `getMinutes`, `getSeconds`를 전달합니다. `formetText` 함수에서는 전달받은 매개변수로 유저에게 타이머 시간을 보여줍니다. `soundTime` 이 0이 아니라면 `soundTime` 에서 1씩 빼줍니다.
    - 타이머가 끝나면 `stopSound` 함수가 호출되고, `clearInterval()` 로 매개변수에 `timerId`를 넣어 타이머를 취소해 줍니다. 그 후, 유저에게 “Finish🎉” text를 보여줍니다.
    
    ---
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/721754e5-b2cf-4937-aa05-f760b6cdfce3/Untitled.png)
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fc817bf3-1f1a-4706-8aa4-56096a8033a1/Untitled.png)
    
- **반응형 웹**

---

# 🧐 Learned

- `getFullYear()`**,** `getMonth()`**,** `getDate()`**,** `getDay()` 를 사용하여  날짜를 다루는 방법에 대해 알게 되었습니다.
- `localStorage`를 활용하여 브라우저에 `key-value`를 저장하는 방법에 대해 알게 되었습니다.
- `setInterval()` 로 일정 시간마다 함수를 실행하는 방법과,  설정한 `setInterval()`을 `clearInterval()`로 취소하는 방법에 대해 알게 되었습니다.
- `src`, `volume`, `loop`, `play()`, `pause()`, `currentTime` 을 사용하여 JavaScript에서 `audio`를 다루는 방법에 대해 알게 되었습니다.

## 🛠 Tech Stack
- HTML5
- CSS3
- JavaScript(ES6+)
