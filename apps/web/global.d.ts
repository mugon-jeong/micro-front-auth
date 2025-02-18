import ko from "./messages/ko.json";

type Messages = typeof ko;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
