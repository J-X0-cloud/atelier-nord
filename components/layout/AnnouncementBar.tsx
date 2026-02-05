import { Fragment } from "react";
import { announcement } from "@/lib/data/site";

export function AnnouncementBar() {
  return (
    <div className="announce">
      {announcement.map((message, index) => (
        <Fragment key={message}>
          {index > 0 ? <span className="x">·</span> : null}
          <span className={index > 0 ? "x msg" : "msg"}>{message}</span>
        </Fragment>
      ))}
    </div>
  );
}
