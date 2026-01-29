import type { CSSProperties } from "react";
import type { PromiseItem } from "@/lib/data/home";
import { Icon } from "./Icon";

export function PromiseStrip({ items, style }: { items: PromiseItem[]; style?: CSSProperties }) {
  return (
    <section className="promise" style={style}>
      {items.map((item) => (
        <div key={item.title}>
          <Icon name={item.icon} />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
}
