// App.jsx
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function LoginItem() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/user/login`,
        {
          userId: id,
          password: password,
        }
      );
      alert(`로그인되었습니다. user id: ${response.data}`);
      // 성공적으로 로그인 후 입력 필드 초기화
      setId("");
      setPassword("");
    } catch (error) {
      let errorMessage =
        "알 수 없는 오류가 발생했습니다. 운영자에게 문의하세요.";
      let statusCode = null;

      if (error.response) {
        statusCode = error.response.status;
        if (statusCode === 401) {
          errorMessage = "잘못된 ID 또는 비밀번호입니다.";
        }
      } else {
        console.error("Error:", error);
        errorMessage = "네트워크 오류가 발생했습니다. 연결을 확인하세요.";
      }
      ㅡ;

      // Alert 창으로 에러 메시지 표시
      alert(`${errorMessage} (상태 코드: ${statusCode})`);

      // 에러 발생 후 입력 필드 초기화
      setId("");
      setPassword("");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputBox
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <InputBox
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">로그인</SubmitButton>
      </Form>
    </Container>
  );
}

export default LoginItem;

// 스타일드 컴포넌트 생성
const Container = styled.div`
  font-family: "Pretendard", sans-serif;
  margin: 0vh 0vh 3vh 0vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
`;

const InputBox = styled.input`
  padding: 1.5vh;
  border: 1px solid #717171;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5vh;
  font-weight: 900;
  font-size: 2vh;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
