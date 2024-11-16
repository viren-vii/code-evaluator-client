import Analysis from "./analysis";
import CodeEditor from "./code-editor";

const TitleBar = ({ title }: { title: string }) => {
  return (
    <div className="border-b-[1px] p-2 flex items-center justify-center bg-accent">
      <h1 className="font-semibold">{title}</h1>
    </div>
  );
};

export default function Home() {
  return (
    <div className="h-full flex justify-between">
      <div className="flex flex-1 flex-col border-r-[1px]">
        <TitleBar title="Code editor" />
        <CodeEditor />
      </div>
      <div className="flex flex-1 flex-col">
        <TitleBar title="Analysis" />
        <Analysis />
      </div>
    </div>
  );
}

