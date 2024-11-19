import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { BaseMessage } from "@langchain/core/messages";
import { MessageCircleQuestion } from "lucide-react";

const QuestionCard = ({
  submitQuestion,
  messages,
  threadId,
}: {
  submitQuestion: ({
    question,
    messages,
    thread_id,
  }: {
    question: string;
    messages: BaseMessage[];
    thread_id: string;
  }) => void;
  messages: BaseMessage[];
  threadId: string;
}) => {
  const [question, setQuestion] = React.useState("");
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear your code from the code editor on the left and
              reset the analysis.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                submitQuestion({ question, messages, thread_id: threadId });
              }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-1">
              <MessageCircleQuestion className="w-4 h-4" /> Question
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter the question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button
            disabled={question === "" || messages.length === 0}
            onClick={() => setOpen(true)}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default QuestionCard;
