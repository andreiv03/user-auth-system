import NextLink from "next/link";
import { useRouter } from "next/router";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"a"> {
  href: string;
  children?: React.ReactNode;
};

const Link: React.FC<Props> = ({ href, children, ...props }) => {
  const router = useRouter();

  return (
    <NextLink href={href}>
      <a className={router.pathname === href ? "active" : ""} {...props}>
        {children}
      </a>
    </NextLink>
  );
}

export default Link;