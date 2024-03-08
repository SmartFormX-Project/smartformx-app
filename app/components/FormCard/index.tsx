import { Circle, MessageSquareIcon, MessagesSquareIcon } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  created: string;
  messages: string;
  onClick: ()=>void;
  status: String;
}

export default function FormCardComponent(props: CardProps) {
  return (
    <div onClick={props.onClick} className="border rounded-2xl h-[250px] w-[250px] cursor-pointer hover:border-black">
      <div className="flex-col text-center p-2 flex justify-center items-center h-1/2 bg-black rounded-t-2xl text-white">
        <h3 className="capitalize">{props.title}</h3>
        <span className="text-[9px] mt-2 text-foreground-400 italic"> criado em {props.created}</span>
      </div>
      <div className="p-[12px] h-1/2">
        <div className="font-light text-[12px] flex justify-between">
          <div className="flex space-x-[7px] items-center">
            <Circle size={10} fill="#48BA7F" color="#48BA7F" />

            <div className="capitalize">{props.status}</div>
          </div>
          <div className="flex space-x-[7px] items-center">
            <MessagesSquareIcon size={16} />

            <span> {props.messages} respostas</span>
          </div>
        </div>
        <span className="font-light text-[11px] mt-[10px]">
          {props.description}
        </span>
      </div>
    </div>
  );
}
