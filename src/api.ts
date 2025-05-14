const API_KEY =
  "HuX1NwcwTbHSLzp50BXegf%2BOaASI915zd8BcovxkJi0pnPAuy9HslJ1afPXlkGseeJrteL72Ck7MYsNh%2Fg8egQ%3D%3D";

export interface Iitems {
  auspcInsttNm: string;
  fstvlCo: string;
  fstvlEndDate: string;
  fstvlNm: string;
  fstvlStartDate: string;
  homepageUrl: string;
  insttCode: string;
  insttNm: string;
  latitude: string;
  lnmadr: string;
  longitude: string;
  mnnstNm: string;
  opar: string;
  phoneNumber: string;
  rdnmadr: string;
  referenceDate: string;
  relateInfo: string;
  suprtInsttNm: string;
}

export interface IApi {
  response: {
    body: {
      items: Iitems[];
      numOfRows: string;
      pageNo: string;
      totalCount: string;
    };
    header: {
      resultCode: string;
      resultMsg: string;
      type: string;
    };
  };
}

export async function testApi() {
  const url = `http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api?serviceKey=${API_KEY}&pageNo=1&numOfRows=1500&type=json`;
  const res = await fetch(url);
  const json: IApi = await res.json();
  return json;
}
