import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios"; // axios 임포트

// 서버 URL을 환경 변수에서 가져옴
const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

function JoinItem() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // 비밀번호 입력창 포커스 상태
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isLongEnough: false,
  });

  const validatePassword = (value) => {
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);
    const isLongEnough = value.length >= 6;

    setPasswordCriteria({
      hasUppercase,
      hasNumber,
      hasSpecialChar,
      isLongEnough,
    });

    if (!hasUppercase || !hasNumber || !hasSpecialChar || !isLongEnough) {
      setError("");
    } else {
      setError("사용 가능한 비밀번호입니다.");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      setError("ID와 비밀번호는 필수 입력 사항입니다.");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/api/user/signup`, {
        userId: id,
        password: password,
        email: email,
      });

      console.log(response.data);
      alert(`회원가입에 성공하셨습니다.`);

      // 성공적으로 회원가입 후 입력 필드 초기화
      setId("");
      setPassword("");
      setEmail("");
      setError(""); // 에러 메시지 초기화
    } catch (error) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          alert(
            `이미 있는 아이디입니다. 다른 아이디로 다시 회원가입해주십시오 (statuscode: ${statusCode})`
          );
        } else {
          alert(
            `알 수 없는 에러입니다. 운영자에게 문의하여 주십시오 (statuscode: ${statusCode})`
          );
        }
      } else {
        console.error("Error:", error);
        alert(
          "회원가입 중 오류가 발생했습니다. 네트워크 연결을 확인해 주세요."
        );
      }

      // 에러 발생 시 입력 필드 초기화
      setId("");
      setPassword("");
      setEmail("");
      setError(""); // 에러 메시지 초기화
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputBox
          type="text"
          placeholder="ID (필수)"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <InputBox
          type="password"
          placeholder="Password (필수)"
          value={password}
          onChange={handlePasswordChange}
          onFocus={() => setIsPasswordFocused(true)} // 포커스 시 상태 변경
          onBlur={() => setIsPasswordFocused(false)} // 블러 시 상태 변경
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {/* 비밀번호 입력창이 포커스되고 모든 조건이 충족되지 않으면 PasswordCriteria를 보여줌 */}
        {isPasswordFocused &&
          !(
            passwordCriteria.hasUppercase &&
            passwordCriteria.hasNumber &&
            passwordCriteria.hasSpecialChar &&
            passwordCriteria.isLongEnough
          ) && (
            <PasswordCriteria>
              <CriteriaItem isvalid={passwordCriteria.hasUppercase}>
                {passwordCriteria.hasUppercase ? "✅ 대문자" : "❌ 대문자"}
              </CriteriaItem>
              <CriteriaItem isvalid={passwordCriteria.hasNumber}>
                {passwordCriteria.hasNumber ? "✅ 숫자" : "❌ 숫자"}
              </CriteriaItem>
              <CriteriaItem isvalid={passwordCriteria.hasSpecialChar}>
                {passwordCriteria.hasSpecialChar
                  ? "✅ 특수문자"
                  : "❌ 특수문자"}
              </CriteriaItem>
              <CriteriaItem isvalid={passwordCriteria.isLongEnough}>
                {passwordCriteria.isLongEnough
                  ? "✅ 6자리 이상"
                  : "❌ 6자리 이상"}
              </CriteriaItem>
            </PasswordCriteria>
          )}
        <InputBox
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>
    </Container>
  );
}

export default JoinItem;

// 스타일드 컴포넌트 생성
const Container = styled.div`
  font-family: "Pretendard", sans-serif;
  margin-bottom: 3vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2vh;
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

const ErrorMessage = styled.div`
  color: green;
  font-size: 1.15vh;
  margin-top: -1vh;
  white-space: pre-line;
`;

const PasswordCriteria = styled.div`
  margin-top: -1vh;
`;

const CriteriaItem = styled.div`
  color: ${(props) => (props.isvalid ? "green" : "red")};
  font-size: 1.15vh;
`;
