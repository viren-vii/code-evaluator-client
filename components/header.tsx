import React from "react";

const Header = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header
      className={`border-b-[1px] text-center flex items-center justify-center ${props.className}`}>
      <h1 className="text-xl font-bold">PyCode Evaluator</h1>
    </header>
  );
};

export default Header;
