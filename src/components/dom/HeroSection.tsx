import { useStore } from "@/store/useStore";

interface Props {
  title: string;
  description: string;
  dataLength: number;
}

const HeroSection: React.FC<Props> = ({ title, description, dataLength }) => {
  const [dataIndex, setDataIndex]: any = useStore(state => [state.dataIndex, state.setDataIndex])

  const buttonClickHandler = (isPrev?: boolean) => {
    if (isPrev) {
      if (dataIndex === 0) return setDataIndex(dataLength - 1)
      
      return setDataIndex(dataIndex - 1)
    }

    if (dataIndex === dataLength - 1) return setDataIndex(0)
    setDataIndex(dataIndex + 1)
  }

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="flex justify-center items-start flex-col gap-y-10 text-white">
        <div className="flex flex-row gap-x-5 ml-[9.5rem]">
          <h1>{dataIndex + 1}</h1>
          <h1>{title}</h1>
        </div>
        <div className="text-5xl w-[15em] ml-48">
          <h1>{description}</h1>
        </div>
        <div className="flex flex-row gap-x-4 ml-48 text-2xl">
          <button className="cursor-pointer" onClick={() => buttonClickHandler(true)}>Prev</button>
          <h1>/</h1>
          <button onClick={() => buttonClickHandler()}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
