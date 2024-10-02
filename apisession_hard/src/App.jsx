// App.jsx
import React from "react";
import styled from "styled-components";
import JoinItem from "./Components/JoinItem";
import LoginItem from "./Components/LoginItem";

function App() {
  return (
    <Container>
      <ItemBox>
        <Title>회원가입</Title>
        <JoinItem />
        <Title>로그인</Title>
        <LoginItem />
      </ItemBox>
    </Container>
  );
}

export default App;

// 스타일드 컴포넌트 생성

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #2b2b2b;
`;
const ItemBox = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 1vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 수평 중앙 정렬 */
  padding: 5vh 6vh;
  gap: 1vh;
`;

const Title = styled.div`
  color: #2b2b2b;
  font-family: "Pretendard", sans-serif;
  font-size: 2.5vh;
  font-weight: 900;
`;
