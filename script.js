document.addEventListener('DOMContentLoaded', function() {
    const cherryBlossoms = document.querySelectorAll('.cherry-blossom');
  
    cherryBlossoms.forEach(function(blossom) {
      const x = Math.random() * window.innerWidth;
      const delay = Math.random() * 5;
      const duration = Math.random() * 5 + 5;
  
      blossom.style.left = x + 'px';
      blossom.style.animationDelay = delay + 's';
      blossom.style.animationDuration = duration + 's';
    });
  });
  
  const ws = new WebSocket('ws://localhost:8080');
  const chat = document.getElementById('chat');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const fontSizeRange = document.getElementById('fontSizeRange');
  let username = '';
  
  while (!username) {
    username = prompt('Enter your username:');
  }
  
  ws.onmessage = function (event) {
    // event.data가 Blob 인스턴스일 경우 FileReader를 사용해서 읽어오기
    if (event.data instanceof Blob) {
      const reader = new FileReader();
      reader.onload = function () {
        const data = JSON.parse(reader.result);
        if (data.action === 'delete') {
          document.querySelectorAll(`p[data-id='${data.messageId}']`).forEach(el => el.remove());
        } else {
          addMessageToChat(data.text, data.messageId, data.username);
        }
      };
      reader.readAsText(event.data);
    } else {
      // 메시지가 문자열인 경우, 직접 표시
      const data = JSON.parse(event.data);
      if (data.action === 'delete') {
        console.log(data);
        document.querySelectorAll(`p[data-id='${data.messageId}']`).forEach(el => el.remove());
      } else {
        addMessageToChat(data.text, data.messageId, data.username);
      }
    }
  };
  
  function addMessageToChat(messageText, messageId, messageUsername) {
    const message = document.createElement('p');
    message.dataset.id = messageId; // 메시지 ID 할당
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = "delete";
    deleteButton.onclick = function () {
      // 삭제 하는 채팅이 본인의 것인지 확인
      if (messageUsername === username) {
        ws.send(JSON.stringify({ action: 'delete', messageId: message.dataset.id }));
      } else {
        alert("자신의 채팅만 삭제할 수 있습니다.");
      }
    };
    message.classList.add('chat-message');
    if (messageUsername === username) {
      message.classList.add('self');
    } else {
      message.classList.add('other');
    }
    message.style.fontSize = fontSizeRange.value + 'px';
    message.textContent = messageText;
    setTextColor(message);
    message.appendChild(deleteButton);
    chat.appendChild(message);
  }
  
  function sendMessage() {
    const messageId = Date.now().toString(); // 메시지 ID 생성
    const messageText = messageInput.value.trim();
    if (messageText) {
      const messageData = {
        text: `${username}: ${messageText}`, // 사용자 이름과 메시지를 여기서 조합
        messageId: messageId,
        username: username
      };
      ws.send(JSON.stringify(messageData)); // 메시지 객체를 JSON 문자열로 변환하여 전송
      messageInput.value = '';
    }
  }
  
  function enterkey(e) {
    if (e.keyCode === 13) {
      sendMessage();
    }
  }
  
  messageInput.addEventListener('keyup', event => enterkey(event));
  
  function setTextColor(element) {
    const firstChar = element.textContent.trim().charAt(0); // 첫 글자 가져오기
    if (/[a-zA-Z]/.test(firstChar)) { // 영어 알파벳인지 확인
      if (firstChar.toLowerCase() === 'a') {
        element.classList.add('red'); // 알파벳이 'a'면 빨간색
        element.classList.remove('blue'); // 파란색 클래스 제거
      } else {
        element.classList.add('blue'); // 그렇지 않으면 파란색
        element.classList.remove('red'); // 빨간색 클래스 제거
      }
    } else {
      element.classList.remove('red'); // 영어 알파벳이 아닌 경우 색상 클래스 제거
      element.classList.remove('blue');
    }
  }
  
  function changeFontSize(size) {
    const chatMessages = document.querySelectorAll('.chat-message');
    chatMessages.forEach(function (message) {
      message.style.fontSize = size + 'px';
    });
  }