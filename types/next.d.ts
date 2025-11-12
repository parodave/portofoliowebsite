declare module "next/link" {
  import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
  import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

  type LinkProps = {
    href: string;
    children?: ReactNode;
  } & Omit<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href">;

  const Link: ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>;
  export default Link;
}

declare module "next-mdx-remote/rsc" {
  import type { ComponentType } from "react";

  type MDXRemoteProps = {
    source: string;
    components?: Record<string, ComponentType<any>>;
    options?: Record<string, unknown>;
  };

  export const MDXRemote: (props: MDXRemoteProps) => JSX.Element | Promise<JSX.Element>;
}
