import AppRoutes from "./router/AppRoutes";
import BottomNav from "./shared/components/BottomNav";

export default function App() {
  return (
    <div style={{ paddingBottom: 72 }}>
      <AppRoutes />
      <BottomNav />
    </div>
  );
}
