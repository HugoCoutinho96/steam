import Header from "./(header)/header";
import Promocao from "./promocao/promocao";

export default function Home() {
  return (
    <div className="flex flex-col items-center border">
      <Header/> 
      <Promocao/>
      <h1 className="font-['']">world</h1>
    </div>
  );
}
