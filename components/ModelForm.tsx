"use client";

import { useChat } from "ai/react";
import Image from "next/image";
import { useState, FormEvent } from "react";

type MessageType = {
  text: string;
  isUser: boolean;
};

const ModelForm: React.FC = () => {
  // const [prompt, setPrompt] = useState<string>("");
  // const [messages, setMessages] = useState<MessageType[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  console.log("messages", messages);

  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   setMessages([...messages, { text: prompt, isUser: true }]);
  //   setPrompt("");
  //   console.log("prompt", JSON.stringify({ prompt }));
  //   try {
  //     const res = await fetch("/api/model", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ prompt }), //
  //       // here it should be passing all the previous messages as well with a syntax of "User: {prompt} \n Assistant: {response}"
  //       // body: JSON.stringify({ prompt: messages.map((m) => m.text).join("\n") }),
  //     });
  //     const data = await res.json();
  //     console.log("data", data);
  //     const cleanResponse = data; // get the generated text from the 'text' property
  //     setMessages([
  //       ...messages,
  //       { text: prompt, isUser: true },
  //       { text: cleanResponse, isUser: false },
  //     ]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setLoading(false);
  // };

  // const handleKeyDown = (event: React.KeyboardEvent) => {
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     event.preventDefault();
  //     handleSubmit(event as unknown as FormEvent);
  //   }
  // };

  // const renderMessage = (message: MessageType, index: number) => (
  //   <div
  //     className={`group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 ${
  //       message.isUser ? "bg-gray-700 dark:text-gray-100" : "dark:bg-gray-800"
  //     } `}
  //     key={index}
  //   >
  //     <div className="flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto">
  //       <div className="flex-shrink-0 flex flex-col relative items-end">
  //         <div className="w-[30px] relative flex">
  //           <Image
  //             src={`${
  //               message.isUser ? "/images/german.jpg" : "/images/gpt.svg"
  //             }`}
  //             alt="User"
  //             loading="lazy"
  //             width="38"
  //             height="38"
  //             decoding="async"
  //             data-nimg="1"
  //             className="rounded-sm"
  //             style={{ color: "transparent" }}
  //           ></Image>
  //         </div>
  //         <div className="text-xs flex items-center justify-center gap-1 invisible absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible"></div>
  //       </div>
  //       <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
  //         <div className="flex flex-grow flex-col gap-3">
  //           <div className="min-h-[20px] flex items-start overflow-x-auto whitespace-pre-wrap break-words flex-col gap-4">
  //             <div className="empty:hidden">{message.text}</div>
  //           </div>
  //         </div>
  //         <div className="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible"></div>
  //         <div className="flex justify-between lg:block"></div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="overflow-auto">
      <div className="flex flex-col text-sm dark:bg-gray-800">
        {/* {messages.map(renderMessage)} */}
        <ul>
          {messages.map((m, index) => (
            <li key={index}>
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t dark:border-white/20 pt-2 pl-2">
        <form
          onSubmit={handleSubmit}
          className="stretch mx-2 flex flex-row gap-3 mb-2 md:mx-4 md:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
        >
          <div
            className="relative flex h-full flex-1 items-stretch md:flex-col"
            role="presentation"
            tabIndex={0}
          >
            <div className="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs">
              <textarea
                value={input}
                onChange={handleInputChange}
                // onChange={(e) => setPrompt(e.target.value)}
                // onKeyDown={handleKeyDown}
                className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-12 md:pl-[30px] outline-none"
                style={{
                  maxHeight: "200px",
                  height: "120px",
                  overflowY: "hidden",
                }}
                placeholder="Send a message"
                // disabled={loading}
                spellCheck={false}
              />
              <button
                className="absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40"
                style={{}}
                // disabled={loading}
              >
                {"Submit"}
              </button>
            </div>
          </div>
        </form>
        <div className="px-3 pb-3 pt-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-4 md:pb-6 md:pt-3">
          <span>
            ChatGPT may produce inaccurate information about people, places, or
            facts.{" "}
            <a
              href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              ChatGPT July 20 Version
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelForm;
