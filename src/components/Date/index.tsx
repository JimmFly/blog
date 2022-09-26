import { parseISO, format } from "date-fns";
import enUs from "date-fns/locale/en-US";
import zhHans from "date-fns/locale/zh-CN";

export default function Date({
  dateString,
  locale,
}: {
  dateString: string;
  locale: string;
}) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "LLLL d, yyyy", {
        locale: locale === "en-US" ? enUs : zhHans,
      })}
    </time>
  );
}
