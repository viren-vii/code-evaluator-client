import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { Editor } from "@monaco-editor/react";
import { ChartData } from "./types";

const CodeSnippet = ({
  openSheet,
  setOpenSheet,
  sheetContent,
}: {
  openSheet: boolean;
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  sheetContent: ChartData | undefined;
}) => {
  return (
    <Sheet
      open={openSheet}
      onOpenChange={(val) => {
        setOpenSheet(val);
      }}>
      <SheetContent className="min-w-[40vw]">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-1">
              Code snippet and analysis
              {sheetContent?.improving ? (
                <p className="text-green-500 text-sm p-1 px-3 bg-green-500/10 rounded-3xl">
                  Improving
                </p>
              ) : (
                <p className="text-red-500 text-sm p-1 px-3 bg-red-500/10 rounded-3xl">
                  Not improving
                </p>
              )}
            </div>
          </SheetTitle>
          <SheetDescription>
            {sheetContent && (
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-black">Status</span>:{" "}
                  {sheetContent.status}
                </p>
                <p>
                  <span className="font-black">Score</span>:{" "}
                  {sheetContent.score}
                </p>
                <p>
                  <span className="font-black">Comment</span>:{" "}
                  {sheetContent.comment}
                </p>
                <p>
                  <span className="font-black">Hint</span>: {sheetContent.hint}
                </p>
                <p>
                  <span className="font-black">Time</span>: {sheetContent.time}
                </p>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Editor
            value={sheetContent?.code || ""}
            height="80vh"
            language="python"
            options={{
              readOnly: true,
              minimap: {
                enabled: false,
              },
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CodeSnippet;
