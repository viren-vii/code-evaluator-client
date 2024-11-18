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

const QuestionCard = ({
  submitQuestion,
  setCode,
}: {
  submitQuestion: (question: string) => void;
  setCode: React.Dispatch<React.SetStateAction<string>>;
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
                submitQuestion(question);
                setCode("");
              }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card>
        <CardHeader>
          <CardTitle>Question</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter the question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={() => setOpen(true)}>Submit</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default QuestionCard;
