import ko from "@workspace/common/i18n/messages/ko";

type Messages = typeof ko;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
