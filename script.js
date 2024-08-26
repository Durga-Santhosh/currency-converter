const base_url="https://v6.exchangerate-api.com/v6/23b160cd53f19a8475367897/latest";
let opt=document.querySelectorAll(".options select");
let btn=document.querySelector(".btn-70");
let fromCurr=document.querySelector(".one");
let toCurr=document.querySelector(".two");
let result=document.querySelector("#result")
let swap=document.getElementById("swap");
let flg1=document.querySelector(".flg1");
let flg2=document.querySelector(".flg2");
//country list
const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };
// changing options
let i=0;
for(let select of opt)
{
    for(currCode in countryList)
    {
        let newOptions=document.createElement("option");
        newOptions.innerText=currCode;
        newOptions.value=currCode;
          if(select.name==="one" && currCode==="USD")
          {
            newOptions.selected="selected";
          }
          else if(select.name==="two" && currCode==="INR")
            {
              newOptions.selected="selected";
            }
        select.append(newOptions)
    }
    select.addEventListener("change",(evt)=>{
        updateFlage(evt.target)
    })
}
//updating
const updateFlage=(element)=>{
    let currCode=element.value;
    let countrycode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newsrc; 
}
//Geting answers
btn.addEventListener("click",async(evt)=>{
  evt.preventDefault();
  let inp=document.querySelector(".in")
  let amount=inp.value;
  if(amount==="" ||amount<1)
  {
    alert("Please Enter a Valid Amount");
    amount=1;
    amount.value="1";
  }

  if(fromCurr.value==="" || toCurr.value==="")
  {
    alert("Please Select The Options");
    fromCurr.value="USD";
    toCurr.value="INR"
  }
//swaping

let a=fromCurr.value;
let b=toCurr.value;
let temp;

swap.addEventListener("click",()=>{
  let opt1=document.querySelector(".one option");
  let opt2=document.querySelector(".two option");
  temp=a;
  a=b;
  b=temp;
  fromCurr.value=a;
  opt1.innerText=a;
  flg1.src=`https://flagsapi.com/${countryList[a]}/flat/64.png`;
  toCurr.value=b;
  opt2.innerText=b;
  flg2.src=`https://flagsapi.com/${countryList[b]}/flat/64.png`;
})
// get rate from api
let code= await fetch(`${base_url}/${fromCurr.value}`);
const result_code=await code.json();
let exrate=result_code.conversion_rates[toCurr.value];
final_result=(inp.value*exrate)
result.innerText=`${inp.value} ${fromCurr.value} = ${final_result.toFixed(2)} ${toCurr.value}`;
result.style.display="flex";
})











