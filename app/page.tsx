import ModelForm from "@/components/ModelForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <h1>Next 13</h1>
      <ModelForm />
    </div>
  );
}
