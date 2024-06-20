//회원가입
exports.register = (req,res) => {
  res.send('register');
}

//로그인
exports.login = (req,res) =>{
  res.send('login');
}

//로그아웃
exports.logout = (req,res)=>{
  res.send('logout');
}

//회원 탈퇴
exports.quit = (req,res)=>{
  res.send('quit');
}