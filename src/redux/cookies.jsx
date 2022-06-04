// 키값 기준으로 쿠키에 저장된 값을 가져오는 함수
const getCookie = (name) => {
  // 쿠키 값을 가져옵니다.(name)
  let value = "; " + document.cookie;
  // 키 값을 기준으로 파싱합니다.(";"기준으로)
  let parts = value.split("; " + name + "=");
  // value를 return!
  if (parts.length === 2) {
		return parts.pop().split(";").shift();
	}
};

// 쿠키에 저장하는 함수
const setCookie = (name, value, exp = 5) => {
  let date = new Date();
  // 날짜 생성
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  // 저장!  setTime()은 1970년1월1일부터 경과된 시간을 밀리초로 수정함 (날짜정보를 수정)
  //getTime()은 1970년1월1일부터 경과된 시간을 밀리초로 표기함 (날짜정보를 가져올떄)
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  //toUTCString()은 UTC 표준 시간대를 사용하여 지정된 날짜를 나타내는 문자열
};

// 만료일을 예전으로 설정해 쿠키를 삭제
const deleteCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

export { getCookie, setCookie, deleteCookie };