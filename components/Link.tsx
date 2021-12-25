import NextLink from "next/link";
import { useRouter } from "next/router";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"a"> {
  href: string;
  children?: React.ReactNode;
  styles?: {
    readonly [key: string]: string;
  };
};

const Link: React.FC<Props> = ({ href, children, styles, ...props }) => {
  const router = useRouter();

  return (
    <NextLink href={href}>
      <a className={styles ? (router.pathname === href ? styles.active : "") : ""} {...props}>
        {children}
      </a>
    </NextLink>
  );
}

export default Link;