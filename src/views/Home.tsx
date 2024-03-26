import { useEffect } from "react"
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const Home = () => {
  useEffect(() => {
    document.title = "Domů"
  })

  return (
    <div className="flex flex-col items-center m-auto gap-5 py-16 px-7">
      <div className="max-w-[800px] p-7 flex flex-col gap-14 md:shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold self-center">Vítejte v aplikace Stash management system</h1>
        <div className="p-5">
          <h2 className="text-lg font-semibold">Co to znamená?</h2>
          <p>Aplikace slouží k zaznamenávání expiraci produktů. Můžeš si zde vytvářet kategorie produktů a do nich si zadávat expiraci produktů. Aplikace ti vypočítá kolik dní zbývá do konce expirace a upozorní tě na to.</p>
        </div>

        <div className=" self-center p-5">
          <h2 className="text-lg font-semibold">Postup:</h2>
          <ul>
            <li>1. <Link to="/prihlaseni" >Přihlásit se</Link>/<Link to="/registrace" >Registrovat se</Link></li>
            <li>2. Vytvoříte si tabulku</li>
            <li>3. Přidáte si produkty do tabulky</li>
            <li>4. Zapíšete si do nákupního seznamu potřebné produkty</li>
          </ul>
        </div>

        <div className="flex flex-col gap-5 shadow-md p-9">
          <h2 className="text-lg font-semibold">Jak to funguje?</h2>
          <div>
            <h3 className="font-medium">Tabulka</h3>
            <ul>
              <li className="list-disc">Tlačítkem "vytvořit tabulku" se vytvoří záhlaví tabulky</li>
              <li className="list-disc">Šipkou na pravé straně můžeš tabulku skrýt</li>
              <li className="list-disc">Pokud v tabulce není žádný produkt, můžeš tabulku smazat</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">Formulář</h3>
            <ul>
              <li className="list-disc">Tlačítkem "přidat" se otevře formulář</li>
              <li className="list-disc">Vyplníš název produktu, množství, značku produktu a váhu produktu</li>
              <li className="list-disc">Zadáš datum expirace vašeho produktu a zadáš počet dnů (kolik dnů před expirací chceš upozornit)</li>
              <li className="list-disc">Tlačítkem "přidat" se vytvoří produkt v tabulce</li>
            </ul>
          </div>

          <div>
          <h3 className="font-medium">Akce tabulky</h3>
            <ul>
              <li>
                <div className="flex flex-row gap-2">
                  <div className=" bg-green-600 w-5 h-5"></div>
                  <p>- Produkt je v pořádku</p>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-2  break-all">
                  <div className=" bg-orange-400 w-5 h-5"></div>
                  <p className="w-[240px] md:w-[630px]">- Upozornění, že se datum expirace blíží (od zadaného počtu dnů po datum expirace)</p>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-2">
                  <div className=" bg-red-600 w-5 h-5"></div>
                  <p>- Produkt expiruje dnes</p>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-2">
                  <div className=" bg-black w-5 h-5"></div>
                  <p>- Produkt již expiroval</p>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-2">
                  <EditIcon/>
                  <p>- Upravit produkt</p>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-2">
                  <DeleteIcon/>
                  <p>- Smazat produkt</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">Nákupní seznam</h3>
            <ul>
              <li className="list-disc">Tlačítkem "přidat" přidáš produkty do nákupního seznamu</li>
              <li className="list-disc">Při zaškrtnutí se produkt smaže</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
