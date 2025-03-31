const useUser = () => {
  const registerUserBySupabase = async (userData) => {
    const { insertData, signUpData, error } = await registerUser(userData);

    if (error) {
      alert('회원가입에 실패했습니다 : ' + error.message);
      return false;
    }
    setLogin(insertData, signUpData.session.access_token);
    alert('회원가입에 성공했습니다');
    return true;
  };

  const loginUserBySupabase = async (e) => {
    const id = e.target.id.value;
    const password = e.target.password.value;

    if (!id || !password) {
      alert('모든 항목을 입력해주세요');
      return false;
    }

    const { error } = await login({ id, password });

    if (error) {
      alert('로그인에 실패했습니다 : ' + error.message);
      return false;
    }
    alert('로그인에 성공했습니다');
    return true;
  };

  return { registerUserBySupabase, loginUserBySupabase };
};

export default useUser;
