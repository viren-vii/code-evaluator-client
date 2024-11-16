import Link from "next/link";
import React from "react";

const Footer = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <footer
      className={`border-t-[1px] flex items-center justify-center ${props.className}`}>
      For any queries, contact&nbsp;
      <Link href="mailto:vbhosale1@student.gsu.edu" className="text-blue-500">
        here
      </Link>
      .
    </footer>
  );
};

export default Footer;
