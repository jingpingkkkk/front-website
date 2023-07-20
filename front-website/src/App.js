import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import Promotion from './components/promotion';
import TabSection from './components/tab-section';
import './index.css'

function App() {
  
  return (
    <><Header />
      
    <main className="main">
        <div className="container-fluid">
            <div className="row mobile-griad-layout">
              <div className="container-fluid">
                  <div className="row mobile-griad-layout">
                      <div className="col-md-3 col-sm-12 col-12 first-sidebar">
                        <Sidebar/>
                      </div>
                  </div>
              </div>
     
      {/* <div className="col-md-3 col-sm-12 col-12 last-sidebar">
              <div className="pramotion-sec">
                    <Promotion/>
                    <TabSection/>
              </div>
      </div>
      <Footer/> */}
    </div>
    </div>
    </main>
    </>
  );
}

export default App;
