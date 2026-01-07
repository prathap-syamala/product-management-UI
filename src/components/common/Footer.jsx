export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-5">
      <small>
        © {new Date().getFullYear()} Inventory Management System
      </small>
    </footer>
  );
}
