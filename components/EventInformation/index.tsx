import { Col, Row, Slider } from "antd";
import {
  AddressText,
  AnswerText,
  Container,
  ContainerReserveData,
  DateText,
  MarkTitle,
  MonthName,
  RunInformation,
  RunText,
  SectionTitle,
  Title,
  WhatsappButton,
} from "./styles";
import { useEffect, useState } from "react";
import { MAX_TIME_IN_MINUTES, PRODUCT_COLOR, PRODUCT_NAME } from "../../constants";

interface EventInformationProps {
  position?: string;
  eventSelected?: string;
}

const MAX_POSITIONS = 3;
const vacancyQuantity = Math.floor(Math.random() * MAX_POSITIONS) + 1;

const MONTHS: any = {
  1: 'JAN',
  2: 'FEV',
  3: 'MAR',
  4: 'ABR',
  5: 'MAI',
  6: 'JUN',
  7: 'JUL',
  9: 'AGO',
  10: 'OUT',
  11: 'NOV',
  12: 'DEZ',
}

export const EventInformation = (data: EventInformationProps) => {
  const maxSeconds = MAX_TIME_IN_MINUTES * 60;
  const [elapsedTime, setElapsedTime] = useState(0);
  const [minutesElapsed, setMinutesElapsed] = useState(MAX_TIME_IN_MINUTES);
  const [secondsElapsed, setSecondElapsed] = useState(60);
  const [timeMarks, setTimeMarks] = useState<any>({
    0: {
      style: {
        color: PRODUCT_COLOR,
      },
      label: <MarkTitle>{MAX_TIME_IN_MINUTES}:00</MarkTitle>,
    },
  });
  const [cityInfo, setCityInfo] = useState({
    name: '',
    state: '',
  })
  const [dateInfo, setDateInfo] = useState({
    date: '',
    month: '',
    day: '',
    year: '',
  })

  const updateTime = (
    minutesElapsed: any,
    secondsElapsed: any,
    elapsedTime: any
  ) => {
    let actualSecond = secondsElapsed - 1;
    const once = elapsedTime + 1;
    let minute = minutesElapsed;
    const isFinish = elapsedTime >= maxSeconds;
    const formatNumber = (value: number) => (value < 10 ? `0${value}` : value);

    if (actualSecond === 59) {
      minute -= 1;
    }

    if (actualSecond === 0) {
      actualSecond = 60;
    }

    setSecondElapsed(actualSecond);
    setMinutesElapsed(minute);
    setElapsedTime(once);

    setTimeMarks({
      [once]: {
        style: {
          color: PRODUCT_COLOR,
        },
        label: (
          <MarkTitle>
            {isFinish ? "00" : formatNumber(minute)}:
            {isFinish ? "00" : formatNumber(actualSecond)}
          </MarkTitle>
        ),
      },
    });

    setTimeout(() => {
      if (!isFinish) {
        updateTime(minute, actualSecond, once);
      }
    }, 1000);
  };

  const extractInformation = (event: string) => {
    const [ extractedCity = '' ] = event.match(/^[\D]+\//gm) || [];
    const [ extractedState = '' ] = event.match(/\/[\D]+/gm) || [];
    const [ date = '' ] = event.match(/[0-9]+\/[0-9]+\/[0-9]+/gm) || [];
    const [day, monthNumber, year] = date!.split('/');
    const month = MONTHS[parseInt(monthNumber || '0')];
    const state = (extractedState || '').replace(/\W/gm, '');
    console.log(date, 'event', event)
    setCityInfo({
      name: extractedCity.replace('/', ''),
      state, 
    })

    setDateInfo({
      date,
      month,
      day,
      year,
    })
  }

  useEffect(() => {
    updateTime(minutesElapsed, secondsElapsed, elapsedTime);
  }, []);

  useEffect(() => {
    if (data.eventSelected) {
      extractInformation(data.eventSelected);
    }
  }, [data]);

  return (
    <Container>
      <ContainerReserveData>
        <Title>Sua reserva vai expirar em</Title>
        <Slider
          defaultValue={0}
          max={maxSeconds}
          marks={timeMarks}
          value={elapsedTime}
          disabled={true}
          tooltip={{ formatter: null }}
        />
      </ContainerReserveData>

      {
        data.position && data.eventSelected && (
          <Row style={{ marginBottom: "2rem" }}>
            <Col span={24}>
            <Row>
              <Col span={24} style={{ marginBottom: "1rem" }}>
                <SectionTitle>RESUMO</SectionTitle>
              </Col>
            </Row>
            </Col>

            <Col span={24} style={{ marginBottom: "2rem" }}>
              <Row>
                <Col xs={7} md={4}>
                  <svg width="81" height="104" viewBox="0 0 81 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M71.2222 15.9954H9.77778C4.92994 15.9954 1 20.3074 1 25.6266V93.0448C1 98.3639 4.92994 102.676 9.77778 102.676H71.2222C76.0701 102.676 80 98.3639 80 93.0448V25.6266C80 20.3074 76.0701 15.9954 71.2222 15.9954Z" stroke={PRODUCT_COLOR} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M62.0786 1V21.4815" stroke={PRODUCT_COLOR} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.1157 1V21.4815" stroke={PRODUCT_COLOR} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1 33.551L80 33.551" stroke={PRODUCT_COLOR} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <DateText  x="25%" y="70%">{dateInfo.day}</DateText>
                    <MonthName  x="25%" y="90%">{dateInfo.month}</MonthName>
                  </svg>
                </Col>

                <Col style={{ paddingTop: "15px" }} xs={15} md={20}>
                  <AddressText>{cityInfo.name} ({cityInfo.state})</AddressText>
                  {/* <p>R. das Imbuias, 515 - Jardim São Paulo, Americana - SP • 13468-090</p> */}
                  <AddressText>{dateInfo.date}</AddressText> {/* • 14h */}
                </Col>

              </Row>
            </Col>
            
            <Row style={{ width: "100%" }}>
              <Col xs={24} md={24}>
                <RunText>Corre!</RunText>
              </Col>
              <Col xs={24} md={13}>
                <RunInformation><span>Restam apenas</span> 0{vacancyQuantity} vaga{vacancyQuantity > 1 ? 's' : ''} <span>para a categoria {dateInfo.year}, posição</span> {data.position} <span>em</span> {cityInfo.name} <span>no dia</span> {dateInfo.date}<span>.</span></RunInformation>
              </Col>
            </Row>

          </Row>
        )
      }

      <Row style={{ marginBottom: "3rem" }}>
        <Col xs={24} md={18}>
          <SectionTitle>DÚVIDAS</SectionTitle>
          <AnswerText>
            Ainda tem dúvidas sobre a seletiva de futebol Next Academy?{" "}
          </AnswerText>
        </Col>
        <Col xs={21} md={13}>
          <WhatsappButton target="_blank" href={`https://api.whatsapp.com/send?phone=5555119580781&text=Ol%C3%A1.%20Gostaria%20de%20saber%20mais%20sobre%20a%20${PRODUCT_NAME}.`}>
            FALE COM A GENTE{" "}
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7958 3.21604C17.8041 2.21043 16.6454 1.42303 15.3199 0.853816C13.9944 0.284603 12.5782 0 11.0715 0C11.0715 0 11.0668 0 11.0572 0C11.0477 0 11.0429 0 11.0429 0C9.53619 0 8.11531 0.284603 6.78023 0.853816C5.46423 1.42303 4.31036 2.20569 3.3186 3.20181C2.32683 4.19794 1.53533 5.35058 0.944083 6.65977C0.371909 7.98793 0.0858256 9.40146 0.0858256 10.9004C0.0858256 11.8681 0.209795 12.812 0.457737 13.7322C0.70568 14.6524 1.06805 15.53 1.54486 16.3648L0 22L5.80754 20.4916C6.57044 20.909 7.39531 21.2316 8.28218 21.4592C9.16905 21.6869 10.0893 21.8008 11.0429 21.8008C12.5496 21.8008 13.9705 21.5162 15.3056 20.947C16.6407 20.3777 17.8041 19.5998 18.7958 18.6132C19.7876 17.6266 20.5696 16.4692 21.1417 15.141C21.7139 13.8318 22 12.4183 22 10.9004C22 10.9004 22 10.8909 22 10.8719C22 9.373 21.7139 7.96422 21.1417 6.64554C20.5696 5.32686 19.7876 4.1837 18.7958 3.21604ZM11.0429 19.9793C10.1847 19.9793 9.35978 19.8655 8.56827 19.6378C7.77676 19.4101 7.04725 19.097 6.37971 18.6986H6.40832L6.06502 18.5278L2.63199 19.4101L3.54746 16.0802L3.3472 15.7387C2.90854 15.0556 2.56524 14.3062 2.3173 13.4903C2.06935 12.6744 1.94538 11.8206 1.94538 10.9288C1.94538 10.9288 1.94538 10.9241 1.94538 10.9146C1.94538 10.9051 1.94538 10.9004 1.94538 10.9004C1.94538 9.64812 2.18379 8.47176 2.6606 7.37128C3.13741 6.2708 3.79063 5.31264 4.62029 4.49677C5.44994 3.68089 6.41785 3.03579 7.52406 2.56145C8.63026 2.0871 9.8032 1.84994 11.0429 1.84994C11.062 1.84994 11.0715 1.84994 11.0715 1.84994C12.3303 1.84994 13.508 2.0871 14.6047 2.56145C15.7013 3.03579 16.6597 3.68089 17.4798 4.49677C18.319 5.31264 18.977 6.2708 19.4538 7.37128C19.9306 8.47176 20.1691 9.64812 20.1691 10.9004C20.1691 10.9004 20.1691 10.9099 20.1691 10.9288V10.9004C20.1691 12.1527 19.9211 13.329 19.4252 14.4295C18.9484 15.53 18.3 16.4929 17.4798 17.3182C16.6597 18.1436 15.6966 18.7934 14.5904 19.2678C13.4842 19.7421 12.3017 19.9793 11.0429 19.9793ZM16.0494 13.1772C15.9159 13.1203 15.6012 12.9733 15.1053 12.7361C14.6094 12.4989 14.2948 12.3519 14.1612 12.295C14.0468 12.257 13.9419 12.238 13.8466 12.238C13.7512 12.238 13.6558 12.3044 13.5605 12.4373C13.4651 12.5701 13.3173 12.7598 13.117 13.0065C12.9168 13.2531 12.7785 13.4239 12.7022 13.5188C12.6068 13.5947 12.5163 13.6373 12.4304 13.6468C12.3446 13.6563 12.2349 13.6326 12.1014 13.5757C11.9679 13.4998 11.6961 13.3717 11.2861 13.1915C10.876 13.0112 10.4135 12.6839 9.89857 12.2096C9.49805 11.8491 9.16428 11.4791 8.89727 11.0996C8.63025 10.7201 8.4586 10.464 8.38231 10.3312C8.30602 10.1984 8.28695 10.0893 8.3251 10.0039C8.36324 9.9185 8.42046 9.84735 8.49675 9.79043C8.55397 9.71453 8.62072 9.63389 8.69701 9.54851C8.7733 9.46313 8.84005 9.38249 8.89727 9.3066C8.97356 9.2307 9.02601 9.15955 9.05462 9.09314C9.08322 9.02674 9.12614 8.9461 9.18336 8.85123C9.2215 8.75636 9.2358 8.67098 9.22627 8.59508C9.21673 8.51919 9.19289 8.4433 9.15475 8.3674C9.1166 8.2915 8.99263 8.00216 8.78284 7.49935C8.57304 6.99655 8.41092 6.61233 8.29649 6.3467C8.20113 6.08107 8.09623 5.93877 7.98179 5.91979C7.86736 5.90082 7.772 5.89133 7.69571 5.89133C7.61942 5.87236 7.54313 5.86287 7.46684 5.86287C7.39055 5.86287 7.30473 5.86287 7.20936 5.86287C7.20936 5.86287 7.20459 5.86287 7.19506 5.86287C7.18552 5.86287 7.18075 5.86287 7.18075 5.86287C7.02817 5.88185 6.8899 5.91979 6.76593 5.97671C6.64196 6.03364 6.53229 6.10953 6.43693 6.2044C6.3225 6.33722 6.13654 6.58387 5.87906 6.94437C5.62159 7.30487 5.49285 7.81716 5.49285 8.48124C5.49285 9.14532 5.65973 9.75722 5.9935 10.3169C6.32727 10.8767 6.53229 11.204 6.60858 11.2988C6.6658 11.3937 7.114 11.9582 7.95319 12.9922C8.79238 14.0263 9.89856 14.8374 11.2718 15.4256C11.596 15.5584 11.8869 15.6675 12.1443 15.7529C12.4018 15.8383 12.6355 15.9189 12.8453 15.9948C13.1695 16.0897 13.4794 16.1371 13.775 16.1371C14.0707 16.1371 14.3329 16.1276 14.5618 16.1087C14.8288 16.0707 15.1769 15.9237 15.606 15.6675C16.0351 15.4114 16.3069 15.122 16.4213 14.7995C16.5358 14.4769 16.5977 14.1971 16.6073 13.9599C16.6168 13.7227 16.6025 13.5757 16.5644 13.5188C16.5262 13.4618 16.4642 13.4097 16.3784 13.3622C16.2926 13.3148 16.1829 13.2531 16.0494 13.1772Z"
                fill="#F35B04"
              />
            </svg>
          </WhatsappButton>
        </Col>
      </Row>
    </Container>
  );
};
