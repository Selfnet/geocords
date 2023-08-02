import { Leaflet } from "./components/Leaflet";
import SideCard from "./components/SideCard";
import { Toaster } from "./components/ui/Toast";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

export function App() {
  return (
    <div>
      <Header />
      <div class="container">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-1">
            <SideCard />
          </div>
          <div class="col-span-2">
            <Leaflet center={[48.744992, 9.103155]} zoom={16} maxZoom={20} drawControPosition="bottomleft" />
          </div>
        </div>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}
