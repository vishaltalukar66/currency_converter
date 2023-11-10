
import { InputCard } from './components/InputCard'

function App() {

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
      >
        <div className="min-w-min ">
          <div className=" border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">

            {/* input card */}

            <InputCard />

          </div>
        </div >
      </div >
    </>
  )
}

export default App
