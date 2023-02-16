const gtagFake = (event: string, conversion: string, data: any) => {
  console.log('gtagFake', event, conversion, data);
}

export const gTavEvent = (event: string, conversion: string, data: any) => {
 let gtag = (window as any).gtag || gtagFake

 gtag(event, conversion, data);
}
