// 시/도 옵션
export const PROVINCE_OPTIONS = [
  { value: '', label: '전체' },
  { value: '서울특별시', label: '서울특별시' },
  { value: '경기도', label: '경기도' },
  { value: '인천광역시', label: '인천광역시' },
];

export const MODEL_PROVINCE_OPTIONS = [
  { value: '서울특별시', label: '서울특별시' },
  { value: '경기도', label: '경기도' },
  { value: '인천광역시', label: '인천광역시' },
];

// 시/군/구 옵션 (시/도별로 매핑)
export const CITY_OPTIONS_BY_PROVINCE = {
  서울특별시: [
    { value: '강남구', label: '강남구' },
    { value: '강동구', label: '강동구' },
    { value: '광진구', label: '광진구' },
    { value: '마포구', label: '마포구' },
    { value: '서대문구', label: '서대문구' },
    { value: '서초구', label: '서초구' },
    { value: '용산구', label: '용산구' },
    { value: '종로구', label: '종로구' },
    { value: '중구', label: '중구' },
  ],
  경기도: [
    { value: '고양시', label: '고양시' },
    { value: '남양주시', label: '남양주시' },
    { value: '성남시', label: '성남시' },
    { value: '수원시', label: '수원시' },
    { value: '시흥시', label: '시흥시' },
    { value: '파주시', label: '파주시' },
    { value: '평택시', label: '평택시' },
    { value: '화성시', label: '화성시' },
  ],
  인천광역시: [
    { value: '계양구', label: '계양구' },
    { value: '연수구', label: '연수구' },
    { value: '중구', label: '중구' },
  ],
};

// 동/읍/면 옵션 (시/군/구별로 매핑)
export const DISTRICT_OPTIONS_BY_CITY = {
  강남구: [
    { value: '논현동', label: '논현동' },
    { value: '대치동', label: '대치동' },
    { value: '삼성동', label: '삼성동' },
    { value: '신사동', label: '신사동' },
    { value: '압구정동', label: '압구정동' },
    { value: '역삼동', label: '역삼동' },
    { value: '청담동', label: '청담동' },
  ],
  마포구: [
    { value: '공덕동', label: '공덕동' },
    { value: '서교동', label: '서교동' },
    { value: '상암동', label: '상암동' },
    { value: '연남동', label: '연남동' },
    { value: '합정동', label: '합정동' },
  ],
  서대문구: [
    { value: '신촌동', label: '신촌동' },
    { value: '연희동', label: '연희동' },
    { value: '창천동', label: '창천동' },
    { value: '홍제동', label: '홍제동' },
  ],
  서초구: [
    { value: '반포동', label: '반포동' },
    { value: '방배동', label: '방배동' },
    { value: '서초동', label: '서초동' },
    { value: '양재동', label: '양재동' },
    { value: '잠원동', label: '잠원동' },
  ],
  용산구: [
    { value: '남영동', label: '남영동' },
    { value: '용산동', label: '용산동' },
    { value: '이태원동', label: '이태원동' },
    { value: '한남동', label: '한남동' },
  ],
  종로구: [
    { value: '사직동', label: '사직동' },
    { value: '삼청동', label: '삼청동' },
    { value: '종로1가', label: '종로1가' },
    { value: '평창동', label: '평창동' },
  ],
  중구: [
    { value: '명동', label: '명동' },
    { value: '을지로동', label: '을지로동' },
    { value: '장충동', label: '장충동' },
    { value: '중림동', label: '중림동' },
    { value: '회현동', label: '회현동' },
  ],
  강동구: [
    { value: '상원동', label: '상원동' },
    { value: '성내동', label: '성내동' },
    { value: '천호동', label: '천호동' },
    { value: '풍납동', label: '풍납동' },
  ],
  광진구: [
    { value: '광장동', label: '광장동' },
    { value: '구의동', label: '구의동' },
    { value: '능동', label: '능동' },
    { value: '중곡동', label: '중곡동' },
    { value: '화양동', label: '화양동' },
  ],
  고양시: [
    { value: '덕양구', label: '덕양구' },
    { value: '일산동구', label: '일산동구' },
    { value: '일산서구', label: '일산서구' },
    { value: '주엽동', label: '주엽동' },
    { value: '화정동', label: '화정동' },
  ],
  성남시: [
    { value: '분당구', label: '분당구' },
    { value: '수정구', label: '수정구' },
    { value: '중원구', label: '중원구' },
  ],
  수원시: [
    { value: '권선구', label: '권선구' },
    { value: '영통구', label: '영통구' },
    { value: '장안구', label: '장안구' },
    { value: '팔달구', label: '팔달구' },
  ],
  파주시: [
    { value: '문발동', label: '문발동' },
    { value: '법원읍', label: '법원읍' },
    { value: '연다산동', label: '연다산동' },
    { value: '조리읍', label: '조리읍' },
    { value: '파주읍', label: '파주읍' },
  ],
  평택시: [
    { value: '서정동', label: '서정동' },
    { value: '중앙동', label: '중앙동' },
    { value: '평택동', label: '평택동' },
  ],
  화성시: [
    { value: '봉담읍', label: '봉담읍' },
    { value: '동탄읍', label: '동탄읍' },
    { value: '매송면', label: '매송면' },
    { value: '범계면', label: '범계면' },
    { value: '양감면', label: '양감면' },
  ],
  시흥시: [
    { value: '대야동', label: '대야동' },
    { value: '은행동', label: '은행동' },
    { value: '장곡동', label: '장곡동' },
    { value: '정왕동', label: '정왕동' },
    { value: '정자동', label: '정자동' },
  ],

  남양주시: [
    { value: '별내동', label: '별내동' },
    { value: '퇴계원읍', label: '퇴계원읍' },
    { value: '평내동', label: '평내동' },
    { value: '호평동', label: '호평동' },
  ],
  // 인천광역시
  계양구: [
    { value: '계산동', label: '계산동' },
    { value: '작전동', label: '작전동' },
  ],
  연수구: [
    { value: '선학동', label: '선학동' },
    { value: '송도동', label: '송도동' },
  ],
  중구: [
    { value: '신포동', label: '신포동' },
    { value: '신흥동', label: '신흥동' },
    { value: '중앙동', label: '중앙동' },
  ],
};

// 하위 항목이 없을 경우 기본 옵션
const DEFAULT_DISTRICT_OPTIONS = [{ value: '기타', label: '기타' }];

// 필터용 전체 시/군/구 옵션 (시/도 선택 없이 사용)
export const CITY_OPTIONS = [
  { value: '', label: '전체' },
  { value: '강남구', label: '강남구' },
  { value: '강동구', label: '강동구' },
  { value: '광진구', label: '광진구' },
  { value: '마포구', label: '마포구' },
  { value: '서대문구', label: '서대문구' },
  { value: '서초구', label: '서초구' },
  { value: '용산구', label: '용산구' },
  { value: '종로구', label: '종로구' },
  { value: '중구', label: '중구' },
];

// 선택된 시/도에 따라 시/군/구 옵션을 반환하는 함수
export const GET_CITY_OPTIONS = (province) => {
  if (!province || province === '') {
    return [];
  }
  const cities = CITY_OPTIONS_BY_PROVINCE[province] || [];
  return cities;
};

// 선택된 시/군/구에 따라 동/읍/면 옵션을 반환하는 함수
export const GET_DISTRICT_OPTIONS = (city) => {
  if (!city || city === '') {
    return [];
  }
  const districts = DISTRICT_OPTIONS_BY_CITY[city] || DEFAULT_DISTRICT_OPTIONS;
  return districts;
};

// 모델용 (초기 label이 다름)
export const GET_MODEL_CITY_OPTIONS = (province) => {
  if (!province || province === '') {
    return [];
  }
  const cities = CITY_OPTIONS_BY_PROVINCE[province] || [];
  return cities;
};

export const GET_MODEL_DISTRICT_OPTIONS = (city) => {
  if (!city || city === '') {
    return [];
  }
  const districts = DISTRICT_OPTIONS_BY_CITY[city] || DEFAULT_DISTRICT_OPTIONS;
  return districts;
};

// 하위 호환성을 위해 기존 변수명 유지 (deprecated)
export const MODEL_CITY_OPTIONS = [];
export const MODEL_DISTRICT_OPTIONS = [];
export const DISTRICT_OPTIONS = [{ value: '', label: '전체' }];

// 모임 인원 옵션
export const CAPACITY_OPTIONS = [
  { value: 2, label: '2명' },
  { value: 3, label: '3명' },
  { value: 4, label: '4명' },
  { value: 5, label: '5명' },
];
