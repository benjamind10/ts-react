import { type ComponentPropsWithoutRef } from "react";

type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "href">;
type AnchorProps = Omit<ComponentPropsWithoutRef<"a">, "type"> & {
  href: string;
};

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return "href" in props;
}

export default function Button(props: ButtonProps | AnchorProps) {
  if (isAnchorProps(props)) {
    const { href, ...restProps } = props; // Extract href for anchor
    return <a className="button" href={href} {...restProps} />;
  }

  return <button className="button" {...props} />;
}
