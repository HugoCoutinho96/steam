import Destaques from "./(destaques)/destaques";
import Header from "./(header)/header";
import Promocao from "./(promocao)/promocao";

export default async function Home() {
  
  return (
    <div className="flex flex-col items-center">
      <Header/> 
      <Promocao/>
      <Destaques/>
    </div>
  );
}
