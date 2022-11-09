import Script from 'next/script';
declare global {
  interface Window {
    daum: any;
  }
}

export type addrInfo = {
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
};

interface AddressProps {
  onSuccessAddr: (addrInfo: addrInfo) => void;
}

const Address = ({ onSuccessAddr }: AddressProps) => {
  const onClickAddrerss = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        const roadAddress = data.roadAddress;
        const jibunAddress = data.jibunAddress;
        const zonecode = data.zonecode;
        const addrInfo = {
          zonecode,
          jibunAddress,
          roadAddress,
        };
        onSuccessAddr(addrInfo);
        var extraRoadAddr = ''; // 참고 항목 변수
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }
      },
    }).open();
  };
  return (
    <>
      <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' />
      <button onClick={onClickAddrerss} className='btn'>
        주소 입력
      </button>
    </>
  );
};
export default Address;
