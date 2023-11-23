//import components
import PromptBox from "@/components/prompt-box/PromptBox";
import Nouns from "@/components/nouns/Nouns";

export default function Home() {
  return (
    <div className="w-full h-full px-4 py-4 flex flex-col space-y-4 bg-neutral">
      <PromptBox />
      <Nouns />
    </div>
  );
}
