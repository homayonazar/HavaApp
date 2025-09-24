import background from "./assets/images/bg.png"
import sunIcon from "./assets/images/sun.png"




function App() {

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div
                className="fixed inset-0 bg-cover bg-center bg-fixed filter blur-2xl z-[-1] transform scale-130"
                style={{ backgroundImage: `url(${background})` }}
            ></div>

            {/* Main Content */}
            <div className="fixed inset-0 z-10 text-white flex flex-col min-h-screen">

                
            </div>
        </div>
    )
}

export default App
