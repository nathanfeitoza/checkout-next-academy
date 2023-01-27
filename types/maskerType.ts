export type MaskerType = {
  masked: any;
  transform?: any;
  maskDefault?: any;
};

export type MaskerObject = {
    mask: any,
    maskInput: (value: any) => string,
    transform: MaskerType["transform"],
    unmask: any,
    maskDefault: MaskerType["maskDefault"],
}
